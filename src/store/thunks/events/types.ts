import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

export interface IGetEventSchedule {
  eventId: number;
  offChainEventId: string;
}

export type IGetEventHackathon = IGetEventSchedule;

export interface IGetEventProjectSubmission {
  eventId: number;
  submissionId: string;
}

export interface IUpdateEventProjectSubmission {
  eventId: number;
  submissionId: string;
  projectType: EProjectType;
  video_url: string;
  repo_url: string;
  projectId?: string;
}
