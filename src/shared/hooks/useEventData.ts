import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { selectEventById, selectEventIsLoading } from 'store/selectors/events';
import { getEventDataById } from 'store/thunks/events';

import { useAppDispatch, useAppSelector } from './redux-hooks';

export const useEventData = () => {
  const { eventId } = useParams();
  const id = Number(eventId);
  const { pitchTalkService } = usePitchTalkServiceContext();
  const dispatch = useAppDispatch();
  const event = useAppSelector((_) => selectEventById(_, id));
  const isLoading = useAppSelector(selectEventIsLoading);

  useEffect(() => {
    if (pitchTalkService) dispatch(getEventDataById(id, pitchTalkService));
  }, [dispatch, id, pitchTalkService]);

  return { event, isLoading, eventId: id };
};
