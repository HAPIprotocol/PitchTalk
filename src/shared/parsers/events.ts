import { IEvent } from '@pitchtalk/contract-api-js/dist/interfaces';

import {
  IEventListItem,
  IHackathonAttention,
  INearestSubmission,
} from 'store/types/events';

export const parseEventsList = (
  events: (IEvent & {
    isServerEvent: { isExist: boolean; isActive: boolean };
  })[]
): IEventListItem[] =>
  events
    ?.map((event) =>
      event
        ? {
            event_id: event.event_id,
            is_active: event.is_active,
            name: event.name,
            description: event.description,
            start_date: event.start_date,
            vote_end_date: event.vote_end_date,
            end_date: event.end_date,
            fee: event.fee,
            banner: event.banner,
            logo: event.logo,
            web_url: event.web_url,
            social_links: event.social_links,
            isServerEvent: event.isServerEvent,
          }
        : undefined
    )
    .filter(Boolean) as IEventListItem[];

export const parseProjectNearestSubmission = (
  submission: INearestSubmission
): IHackathonAttention | null =>
  submission
    ? {
        eventId: submission.event.on_chain_id,
        name: submission.event.name,
        dueDate: new Date(submission.event.vote_end_date).valueOf(),
        submissionId: submission.id,
        projectType: submission.project_type,
        videoUrl: submission.video_url,
        repoUrl: submission.repo_url,
        projectId: submission.project_id.toString(),
      }
    : null;
