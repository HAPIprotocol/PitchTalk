import {
  EventTypes,
  IEventProjectSubmission,
  IEventJudgeSubmission,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSelector } from '@reduxjs/toolkit';
import isNull from 'lodash/isNull';

import { IEventDescription } from 'pages/event-page/components/EventMainInfo/Description';
import { RootState } from 'store/store';
import { IEventScheduleCheckpointData } from 'store/types/events';

export const selectEvents = (state: RootState) => state.events.events.data;

export const selectEventId = (_: RootState, eventId: number) => eventId;

export const selectEventIsLoading = (state: RootState) =>
  state.events.events.isLoading;

export const selectEventsListData = createSelector(
  (state: RootState) => state.events.events.eventsList,
  (events) =>
    Object.values(events)
      .filter(
        (event) =>
          event.is_active &&
          event.isServerEvent.isExist &&
          event.isServerEvent.isActive
      )
      .sort((a, b) => b.vote_end_date - a.vote_end_date)
);

export const selectAllEventsLengthData = createSelector(
  (state: RootState) => state.events.events.eventsList,
  (events) => Object.values(events)?.length
);

export const selectEventById = createSelector(
  selectEvents,
  selectEventId,
  (events, eventId) => (`${eventId}` ? events?.[eventId] : undefined)
);

export const selectEventProjectsParticipants = createSelector(
  selectEventById,
  (eventById) => eventById?.projects || {}
);

export const selectEventRefereeParticipants = createSelector(
  selectEventById,
  (eventById) => eventById?.judges || {}
);

export const selectEventSchedule = createSelector(
  selectEventId,
  (state: RootState) => state.events.schedules,
  (eventId, schedules): IEventScheduleCheckpointData[] => {
    if (!eventId || !schedules?.[eventId]?.length)
      return [] as IEventScheduleCheckpointData[];

    return schedules[eventId].map((item) => ({
      ...item,
      start_date: new Date(item.start_date).getTime(),
    }));
  }
);

export const selectEventPartners = createSelector(
  selectEventById,
  (eventById): string[] => {
    if (!eventById) return [];
    try {
      return JSON.parse(eventById?.serverEvent?.partners || '[]');
    } catch (error) {
      return [];
    }
  }
);

export const selectEventDescription = createSelector(
  selectEventById,
  (eventById): Record<string, IEventDescription> => {
    if (!eventById) return {};
    try {
      const description: Record<string, IEventDescription> = JSON.parse(
        eventById.serverEvent.description
      );
      return description;
    } catch (error) {
      return {};
    }
  }
);

const selectEventSubmissions = createSelector(
  (state: RootState) => state.events.submissions,
  selectEventId,
  (submissions, eventId) =>
    isNull(eventId) ? undefined : submissions?.[eventId]
);

export const selectEventProjectsSubmissions = createSelector(
  selectEventSubmissions,
  (submissions): Map<string, IEventProjectSubmission> =>
    submissions?.projects?.reduce(
      (acc, submission) =>
        acc.set(submission.project_id.toString(), submission),
      new Map<string, IEventProjectSubmission>()
    ) || new Map()
);

export const selectEventRefereeSubmissions = createSelector(
  selectEventSubmissions,
  (submissions): Map<string, IEventJudgeSubmission> =>
    submissions?.referee?.reduce(
      (acc, submission) => acc.set(submission.account_id, submission),
      new Map<string, IEventJudgeSubmission>()
    ) || new Map()
);

export const selectClosestEvent = (state: RootState) =>
  state.events.events.closestEvent;

export const selectEventsSlider = createSelector(
  (state: RootState) => state.events.events.eventsSlider,
  (events) => ({
    nextEvents: events.filter((event) => Date.now() <= event.start_date),
    events,
  })
);

export const selectEventsByType = createSelector(
  (state: RootState) => state.events.events.eventsByType,
  (_: RootState, eventType: EventTypes) => eventType,
  (events, eventType) => events?.[eventType] || []
);

export const selectHackathonAttention = (state: RootState) =>
  state.events.hackathonAttention;

export const selectEventHackathonPrizes = createSelector(
  (state: RootState) => state.events.hackathons,
  selectEventId,
  (hackathons, eventId) =>
    eventId ? hackathons?.[eventId]?.prize_details : undefined
);

export const selectEventHackathonTasks = createSelector(
  (state: RootState) => state.events.hackathons,
  selectEventId,
  (hackathons, eventId) => (eventId ? hackathons?.[eventId]?.tasks : undefined)
);
