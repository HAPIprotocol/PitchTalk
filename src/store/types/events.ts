import { ESocialLinksKeys } from '@pitchtalk/contract-api-js/dist/core';
import {
  IEventProjectSubmission,
  IEventJudgeSubmission,
  IServerEvent,
  IEvent,
  EventAccessFeeTypePayed,
  IEventScheduleCheckpoint,
  IHackakathonPrize,
  IHackakathonTask,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces/project';

import { EClosestItemStatus } from 'shared/interfaces';

export type IEventData = IEvent & {
  serverEvent: IServerEvent;
};

export interface IEventSubmissions {
  projects: IEventProjectSubmission[];
  referee: IEventJudgeSubmission[];
}

export interface IHackathonAttention {
  eventId: number;
  name: string;
  dueDate: number;
  submissionId: string;
  projectType: EProjectType;
  videoUrl: string | null | undefined;
  repoUrl: string | null | undefined;
  projectId?: string | undefined;
}

export interface IEventListItem {
  event_id: number;
  is_active: boolean;
  name: string;
  description: string | undefined;
  start_date: number;
  end_date: number;
  vote_end_date: number;
  fee: EventAccessFeeTypePayed | null;
  banner: string | undefined;
  logo: string | undefined;
  web_url: string | undefined;
  social_links: Record<ESocialLinksKeys, string>;
  isServerEvent: { isExist: boolean; isActive: boolean };
}

export interface IEventByTypeItem {
  id: string;
  on_chain_id: number;
  name: string;
  banner: string | null;
  logo: string | null;
  participants_count: number;
  referees_count: number;
  prize_pool: string;
  start_date: Date;
}

export interface IClosestEventData {
  id: string;
  on_chain_id: number;
  name: string;
  logo: string | null;
  banner: string | null;
  short_description: string;
  video_url: string;
  start_date: Date;
  end_date: Date;
  social_links: Record<ESocialLinksKeys, string>;
  web_url: string;
  status: EClosestItemStatus;
}

export interface IEventSlide {
  id: string;
  on_chain_id: number;
  name: string;
  banner: string | null;
  logo: string | null;
  short_description: string;
  start_date: number;
}

export type IEventScheduleCheckpointData = Omit<
  IEventScheduleCheckpoint,
  'start_date'
> & { start_date: number };

export interface IEventHackathon {
  prize_details: IHackakathonPrize[];
  tasks: IHackakathonTask[];
}

export interface INearestSubmission {
  event: {
    id: string;
    name: string;
    vote_end_date: string;
    on_chain_id: number;
  };
  id: string;
  project_id: string | number;
  project_type: EProjectType;
  repo_url: string | null;
  video_url: string | null;
}
