import { commentsAdapter } from 'store/slices/comments';
import { RootState } from 'store/store';

const commentsSelectors = commentsAdapter.getSelectors(
  (state: RootState) => state.comments
);

export const selectIsCommentsLoading = (state: RootState) =>
  state.comments.isLoading;

export const selectCommentsEventId = (state: RootState) =>
  state.comments.eventId;

export const selectCommentsCount = (state: RootState) => state.comments.count;

export const selectComments = (state: RootState) =>
  commentsSelectors.selectAll(state);
