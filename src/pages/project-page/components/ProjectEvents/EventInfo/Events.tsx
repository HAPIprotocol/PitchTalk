import { IEventProjectSubmission } from '@pitchtalk/contract-api-js/dist/interfaces';
import { useEffect } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { parseProjectParticipatedEvents } from 'shared/parsers/projects';
import { selectProjectParticipatedEvents } from 'store/selectors/projects';
import { updateProjectEvents } from 'store/slices/projects';

import { EventInfo } from './EventInfo';

interface IEvents {
  projectId: number | string;
  participatedSubmissions: IEventProjectSubmission[];
}

export const Events: React.FC<IEvents> = ({
  projectId,
  participatedSubmissions,
}) => {
  const dispatch = useAppDispatch();
  const { pitchTalkService } = usePitchTalkServiceContext();
  const eventIds = participatedSubmissions.map((sub) => sub.event.on_chain_id);
  const projectEvents = useAppSelector((state) =>
    selectProjectParticipatedEvents(state, projectId)
  );

  useEffect(() => {
    pitchTalkService
      ?.getEvents({ ids: eventIds })
      .then((events) => parseProjectParticipatedEvents(events))
      .then((events) => dispatch(updateProjectEvents({ projectId, events })));
  }, [eventIds.length]);

  return (
    <>
      {!!projectEvents?.length &&
        projectEvents.map((event) => (
          <EventInfo event={event} projectId={projectId} key={event.eventId} />
        ))}
    </>
  );
};
