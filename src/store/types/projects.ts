import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

export interface IProjectParticipatedEvent {
  eventId: number;
  eventName: string;
  eventBanner: string | undefined;
  isEventVoteEnded: boolean;
  projects: Record<
    number | string,
    { project_type: EProjectType; total_votes: number }
  >;
}
