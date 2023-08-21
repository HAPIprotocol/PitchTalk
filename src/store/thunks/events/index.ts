/* eslint-disable no-console */
import { push } from '@lagunovsky/redux-react-router';
import { PitchTalk } from '@pitchtalk/contract-api-js';
import {
  EProjectType,
  EventTypes,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { compose } from '@reduxjs/toolkit';
import { t } from 'i18next';

import { APP_ROUTES } from 'routes';
import * as eventsAPI from 'services/api/eventsAPI';
import * as projectsAPI from 'services/api/projectsAPI';
import { ToastType } from 'services/toast/constants';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import { EMPTY_STRING } from 'shared/constants';
import {
  parseEventsList,
  parseProjectNearestSubmission,
} from 'shared/parsers/events';
import {
  updateEvent,
  setEventProjectsSubmissions,
  setEventRefereeSubmissions,
  updateEventsList,
  updateEventsSlider,
  updateClosestEvent,
  updateEventsByTypes,
  updateEventProjectSubmissionById,
  setEventSchedule,
  setEventHackathon,
  setHackathonAttention,
  setEventLoading,
} from 'store/slices/events';
import { AppDispatch } from 'store/store';

import * as Args from './types';

const handleEventLoadingError = () => (dispatch: AppDispatch) => {
  ToastLink(EMPTY_STRING, t('toast.eventLoadingError'), ToastType.Error);
  dispatch(setEventLoading(false));
  dispatch(push(APP_ROUTES.EVENTS));
};

const getEventById = (eventId: number, pitchTalkService: PitchTalk) =>
  pitchTalkService
    .getEvent(eventId)
    .then((event) =>
      eventsAPI
        .fetchEventByOnChainId(eventId)
        .then((serverEvent) =>
          serverEvent ? { ...event, serverEvent } : Promise.reject()
        )
    )
    .catch((e) => Promise.reject(e));

export const sendEventSubmissionAsProject =
  (eventId: number, projectId: string, projectType: EProjectType) =>
  (dispatch: AppDispatch) =>
    eventsAPI
      .sendEventSubmissionAsProject(eventId, projectId, projectType)
      .then(() => dispatch(getEventProjectsSubmissions(eventId)));

export const sendEventSubmissionAsReferee =
  (eventId: number, accountId: string) => (dispatch: AppDispatch) =>
    eventsAPI
      .sendEventSubmissionAsReferee(eventId, accountId)
      .then(() => dispatch(getEventRefereeSubmissions(eventId)));

export const getEventRefereeSubmissions =
  (eventId: number) => (dispatch: AppDispatch) =>
    eventsAPI
      .fetchEventRefereeSubmissions(eventId)
      .then((submissions) => ({ eventId, submissions }))
      .then(compose(dispatch, setEventRefereeSubmissions));

export const getEventProjectsSubmissions =
  (eventId: number) => (dispatch: AppDispatch) =>
    eventsAPI
      .fetchEventProjectsSubmissions(eventId)
      .then((submissions) => ({ eventId, submissions }))
      .then(compose(dispatch, setEventProjectsSubmissions));

export const updateEventProjectSubmission =
  (args: Args.IUpdateEventProjectSubmission) => (dispatch: AppDispatch) => {
    const { video_url, repo_url } = args;
    const submissionArgs = { video_url, repo_url };

    const updateFunc =
      args.projectType === EProjectType.OnChain
        ? eventsAPI.fetchUpdateOnChainProjectSubmission
        : eventsAPI.fetchUpdateOffChainProjectSubmission;

    return updateFunc(args.submissionId, submissionArgs).then(() => {
      dispatch(getEventProjectsSubmissions(args.eventId));
      if (args.projectId) {
        dispatch(getProjectNearestEventAttention(args.projectId));
      }
    });
  };

const getEventSubmissions = (eventId: number) => (dispatch: AppDispatch) =>
  dispatch(getEventRefereeSubmissions(eventId)).then(() =>
    dispatch(getEventProjectsSubmissions(eventId))
  );

export const getEventDataById =
  (eventId: number, pitchTalkService: PitchTalk) =>
  async (dispatch: AppDispatch) => {
    dispatch(setEventLoading(true));
    const event = await getEventById(eventId, pitchTalkService).catch(() =>
      dispatch(handleEventLoadingError())
    );
    if (!event) return;

    dispatch(updateEvent(event));

    const offChainEventId = event.serverEvent.id;
    const isHackathon = event.event_type === EventTypes.HACKATHON;

    return dispatch(getEventSubmissions(eventId))
      .then(() => dispatch(getEventSchedule({ eventId, offChainEventId })))
      .then(() =>
        isHackathon
          ? dispatch(getEventHackathon({ eventId, offChainEventId }))
          : Promise.resolve({})
      )
      .finally(() => dispatch(setEventLoading(false)));
  };

export const getEventsList =
  (from_index: number, limit: number, pitchTalkService: PitchTalk) =>
  (dispatch: AppDispatch) =>
    pitchTalkService
      .getEvents({ from_index, limit })
      .then((events) =>
        eventsAPI
          .checkIsEventsExists(events.map(({ event_id }) => event_id))
          .then((eventsExists) =>
            parseEventsList(
              events.map((event) => ({
                ...event,
                isServerEvent: eventsExists[event.event_id],
              }))
            )
          )
      )
      .then(compose(dispatch, updateEventsList))
      .catch((e) => Promise.reject(e));

export const getClosestEvent = () => (dispatch: AppDispatch) =>
  eventsAPI
    .fetchClosestEvent()
    .then(compose(dispatch, updateClosestEvent))
    .catch(console.error);

export const getSliderEvents = () => (dispatch: AppDispatch) =>
  eventsAPI.fetchSliderEvents().then(compose(dispatch, updateEventsSlider));

export const getLastEventsByTypes = () => (dispatch: AppDispatch) =>
  eventsAPI.fetchLastEvents().then(compose(dispatch, updateEventsByTypes));

export const getHomePageEventsData = () => async (dispatch: AppDispatch) =>
  dispatch(getSliderEvents())
    .then(() => dispatch(getLastEventsByTypes()))
    .then(() => dispatch(getClosestEvent()))
    .catch(console.error);

export const getEventProjectSubmissionById =
  ({ eventId, submissionId }: Args.IGetEventProjectSubmission) =>
  (dispatch: AppDispatch) =>
    projectsAPI
      .fetchProjectSubmissionById(submissionId)
      .then((submission) =>
        dispatch(updateEventProjectSubmissionById({ eventId, submission }))
      );

export const getEventSchedule =
  ({ eventId, offChainEventId }: Args.IGetEventSchedule) =>
  (dispatch: AppDispatch) =>
    eventsAPI
      .fetchEventSchedule(offChainEventId)
      .then((schedule) => dispatch(setEventSchedule({ eventId, schedule })));

export const getEventHackathon =
  ({ eventId, offChainEventId }: Args.IGetEventHackathon) =>
  (dispatch: AppDispatch) =>
    eventsAPI
      .fetchEventHackathon(offChainEventId)
      .then((hackathon) => dispatch(setEventHackathon({ eventId, hackathon })));

export const getProjectNearestEventAttention =
  (projectId: string) => async (dispatch: AppDispatch) => {
    const attention = await eventsAPI
      .fetchProjectNearesAttention(projectId)
      .then(parseProjectNearestSubmission);

    if (attention) dispatch(setHackathonAttention(attention));
  };
