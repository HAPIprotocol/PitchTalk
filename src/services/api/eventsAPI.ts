import {
  EProjectType,
  EventTypes,
  IEventScheduleCheckpoint,
  IServerEvent,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';

import { PARAMS } from 'shared/constants';
import {
  IClosestEventData,
  IEventByTypeItem,
  IEventHackathon,
  IEventSlide,
  INearestSubmission,
} from 'store/types/events';

import { API_ROUTES } from './config';
import {
  fetchAPI,
  parseData,
  parseErrorSubmission,
  parseSuccessSubmission,
} from './index';

export const sendEventSubmissionAsReferee = (
  event_id: number,
  account_id: string
) =>
  fetchAPI
    .post(
      API_ROUTES.eventReferee,
      { event_id, account_id },
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseData);

export const sendEventSubmissionAsProject = (
  event_id: number,
  project_id: string,
  project_type: EProjectType
) =>
  fetchAPI
    .post(
      API_ROUTES.eventParticipation,
      { event_id, project_id, project_type },
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseData);

export const checkIsEventsExists = (eventIDs: number[]) =>
  fetchAPI
    .get<Record<number, { isExist: false; isActive: false }>>(
      `${API_ROUTES.eventsHasEvents}`,
      { params: { ids: eventIDs.join(',') } }
    )
    .then(parseData);

export const fetchEventsCount = () =>
  fetchAPI.get<number>(`${API_ROUTES.eventCount}`).then(parseData);

export const fetchEventByOnChainId = (eventId: number) =>
  fetchAPI
    .get<IServerEvent>(`${API_ROUTES.eventOnChain}/${eventId}`)
    .then(parseData);

export const fetchEventProjectsSubmissions = (eventId: number) =>
  fetchAPI
    .get(
      API_ROUTES.participationSubmissions.replace(
        PARAMS.EVENT_ID,
        eventId.toString()
      )
    )
    .then(parseData);

export const fetchEventRefereeSubmissions = (eventId: number) =>
  fetchAPI
    .get(
      API_ROUTES.refereeSubmissions.replace(PARAMS.EVENT_ID, eventId.toString())
    )
    .then(parseData);

export const fetchUpdateOnChainProjectSubmission = (
  submissionId: string,
  args: { video_url: string; repo_url: string }
) =>
  fetchAPI
    .patch(
      API_ROUTES.updateOnChainSubmission.replace(
        PARAMS.PARTICIPATION_ID,
        submissionId
      ),
      args,
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchUpdateOffChainProjectSubmission = (
  submissionId: string,
  args: { video_url: string; repo_url: string }
) =>
  fetchAPI
    .patch(
      API_ROUTES.updateOffChainSubmission.replace(
        PARAMS.PARTICIPATION_ID,
        submissionId
      ),
      args
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchClosestEvent = () =>
  fetchAPI.get<IClosestEventData>(API_ROUTES.eventLive).then(parseData);

export const fetchSliderEvents = (page = 1, limit = 10) =>
  fetchAPI
    .get<IEventSlide[]>(
      `${API_ROUTES.eventsSlider}?page=${page}&limit=${limit}`
    )
    .then(parseData);

export const fetchLastEvents = () =>
  fetchAPI
    .get<Record<EventTypes, IEventByTypeItem[]>>(API_ROUTES.eventsLast)
    .then(parseData);

export const fetchEventSchedule = (eventId: string) =>
  fetchAPI
    .get<IEventScheduleCheckpoint[]>(
      API_ROUTES.eventSchedule.replace(PARAMS.EVENT_ID, eventId)
    )
    .then(parseData);

export const fetchEventHackathon = (eventId: string) =>
  fetchAPI
    .get<IEventHackathon>(
      API_ROUTES.eventHackathon.replace(PARAMS.EVENT_ID, eventId)
    )
    .then(parseData);

export const fetchProjectNearesAttention = (projectId: string) =>
  fetchAPI
    .get<INearestSubmission>(
      API_ROUTES.nearestSubmission.replace(PARAMS.PROJECT_ID, projectId)
    )
    .then(parseData);
