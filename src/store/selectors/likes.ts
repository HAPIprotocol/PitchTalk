import { createSelector } from '@reduxjs/toolkit';

import { selectUserOffChainId } from 'store/slices/user';
import { RootState } from 'store/store';

export const selectEventLikes = createSelector(
  (state: RootState) => state.likes.events,
  (_: RootState, eventId: number) => eventId,
  (events, eventId) => events[eventId]
);

export const selectProjectLikes = createSelector(
  (state: RootState) => state.likes.projects,
  (_: RootState, projectId: string) => projectId,
  selectUserOffChainId,
  (projects, projectId, userOffChainId) => {
    const likes = new Set(
      (projects?.[projectId] || []).map((like) => like.user)
    );

    return {
      isLiked: userOffChainId ? likes.has(userOffChainId) : false,
      likesAmount: likes.size,
    };
  }
);

export const selectPitchLikes = createSelector(
  (state: RootState) => state.likes.pitches,
  (_: RootState, pitchId: string) => pitchId,
  (pitches, pitchId) => pitches[pitchId]
);
