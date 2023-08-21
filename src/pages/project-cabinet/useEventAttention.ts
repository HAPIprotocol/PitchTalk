import { useEffect } from 'react';

import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { setHackathonAttention } from 'store/slices/events';
import { getProjectNearestEventAttention } from 'store/thunks/events';

export const useEventAttention = (projectId: string | number | undefined) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!projectId) return;
    dispatch(getProjectNearestEventAttention(projectId.toString()));
    return () => {
      dispatch(setHackathonAttention(null));
    };
  }, []);
};
