import {
  EventTypes,
  IEventJudgeSubmission,
  IEventProjectSubmission,
  IEventScheduleCheckpoint,
  IServerEvent,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IClosestEventData,
  IEventByTypeItem,
  IEventData,
  IEventHackathon,
  IEventListItem,
  IEventSlide,
  IEventSubmissions,
  IHackathonAttention,
} from 'store/types/events';

export interface IEventsData {
  events: {
    data: Record<number, IEventData>;
    offChainData: Record<string, IServerEvent>;
    eventsList: Record<number, IEventListItem>;
    eventsByType: Record<EventTypes, IEventByTypeItem[]>;
    closestEvent: IClosestEventData | null;
    eventsSlider: IEventSlide[];
    isLoading: boolean;
  };
  schedules: Record<number, IEventScheduleCheckpoint[]>;
  hackathons: Record<number, IEventHackathon>;
  submissions: Record<number, IEventSubmissions>;
  hackathonAttention: IHackathonAttention | null;
}

const initialState: IEventsData = {
  events: {
    data: {} as Record<number, IEventData>,
    offChainData: {} as Record<string, IServerEvent>,
    eventsList: {} as Record<number, IEventListItem>,
    eventsByType: {
      [EventTypes.LECTURE]: [],
      [EventTypes.TOURNAMENT]: [],
      [EventTypes.HACKATHON]: [],
    } as unknown as Record<EventTypes, IEventByTypeItem[]>,
    closestEvent: null,
    eventsSlider: [],
    isLoading: true,
  },
  schedules: {} as Record<number, IEventScheduleCheckpoint[]>,
  hackathons: {} as Record<number, IEventHackathon>,
  submissions: {} as Record<number, IEventSubmissions>,
  hackathonAttention: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.events.isLoading = payload;
    },
    updateEvent: (state, { payload }: PayloadAction<IEventData>) => {
      state.events.data[payload.event_id] = payload;
    },
    updateEvents: (state, action: PayloadAction<IEventData[]>) => {
      state.events.data = action.payload.reduce(
        (acc, event) => ({ ...acc, [event.event_id]: event }),
        { ...state.events.data }
      );
    },
    updateEventsList: (state, action: PayloadAction<IEventListItem[]>) => {
      state.events.eventsList = action.payload.reduce(
        (acc, event) => ({ ...acc, [event.event_id]: event }),
        { ...state.events.eventsList }
      );
    },
    updateServerEvent: (state, { payload }: PayloadAction<IServerEvent>) => {
      state.events.data[payload.on_chain_id].serverEvent = payload;
      state.events.offChainData[payload.id] = payload;
    },
    setEventRefereeSubmissions: (
      state,
      action: PayloadAction<{
        eventId: number;
        submissions: IEventJudgeSubmission[];
      }>
    ) => {
      state.submissions[action.payload.eventId] = {
        ...state.submissions[action.payload.eventId],
        referee: action.payload.submissions,
      };
    },
    setEventProjectsSubmissions: (
      state,
      action: PayloadAction<{
        eventId: number;
        submissions: IEventProjectSubmission[];
      }>
    ) => {
      state.submissions[action.payload.eventId] = {
        ...state.submissions[action.payload.eventId],
        projects: action.payload.submissions,
      };
    },
    updateEventProjectSubmissionById: (
      state,
      action: PayloadAction<{
        eventId: number;
        submission: IEventProjectSubmission;
      }>
    ) => {
      const { eventId, submission } = action.payload;
      const submissions = state.submissions[eventId];
      state.submissions[eventId] = {
        ...submissions,
        projects: submissions.projects.map((s) =>
          s.id === submission.id ? { ...submission, event: s?.event } : s
        ),
      };
    },
    setHackathonAttention: (
      state,
      action: PayloadAction<IHackathonAttention | null>
    ) => {
      state.hackathonAttention = action.payload;
    },
    updateEventsByTypes: (
      state,
      action: PayloadAction<Record<EventTypes, IEventByTypeItem[]>>
    ) => {
      state.events.eventsByType = action.payload;
    },
    updateClosestEvent: (state, action: PayloadAction<IClosestEventData>) => {
      state.events.closestEvent = action.payload;
    },
    updateEventsSlider: (state, action: PayloadAction<IEventSlide[]>) => {
      state.events.eventsSlider = action.payload;
    },
    setEventSchedule: (
      state,
      action: PayloadAction<{
        eventId: number;
        schedule: IEventScheduleCheckpoint[];
      }>
    ) => {
      state.schedules[action.payload.eventId] = action.payload.schedule;
    },
    setEventHackathon: (
      state,
      action: PayloadAction<{ eventId: number; hackathon: IEventHackathon }>
    ) => {
      state.hackathons[action.payload.eventId] = action.payload.hackathon;
    },
  },
});

export const {
  setEventLoading,
  updateEvent,
  updateEvents,
  updateEventsList,
  setHackathonAttention,
  updateServerEvent,
  setEventRefereeSubmissions,
  setEventProjectsSubmissions,
  updateEventProjectSubmissionById,
  updateEventsByTypes,
  updateClosestEvent,
  updateEventsSlider,
  setEventSchedule,
  setEventHackathon,
} = eventsSlice.actions;

export const eventsReducer = eventsSlice.reducer;
