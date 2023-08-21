import { IEvent } from '@pitchtalk/contract-api-js/dist/interfaces';

import { isEventVoteEnded } from 'shared/utils/eventsUtils';
import { IProjectParticipatedEvent } from 'store/types/projects';

export const parseProjectParticipatedEvents = (
  events: IEvent[]
): IProjectParticipatedEvent[] =>
  events.map((event) => ({
    eventId: event.event_id,
    eventName: event.name,
    eventBanner: event.banner,
    isEventVoteEnded: isEventVoteEnded(event),
    projects: event.projects,
  }));
