import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import { IEventComment } from 'store/types/comments';

export const COMMENTS_PREFIX = '@@comments';

export const commentsAdapter = createEntityAdapter<IEventComment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) =>
    new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf(),
});

const commentsSlice = createSlice({
  name: COMMENTS_PREFIX,
  initialState: commentsAdapter.getInitialState<{
    isLoading: boolean;
    eventId: string | null;
    count: number;
  }>({
    isLoading: false,
    eventId: null,
    count: 0,
  }),
  reducers: {
    setCommentsEventId: (state, action: PayloadAction<string | null>) => {
      state.eventId = action.payload;
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCommentsCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    addComment: (state, action: PayloadAction<IEventComment>) => {
      commentsAdapter.addOne(state, action.payload);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      commentsAdapter.removeOne(state, action.payload);
    },
    setComments: (state, action) => {
      commentsAdapter.setMany(state, action.payload);
    },
    clearComments: (state) => {
      commentsAdapter.setAll(state, []);
    },
  },
});

export const {
  setCommentsCount,
  setCommentsLoading,
  setCommentsEventId,
  addComment,
  deleteComment,
  setComments,
  clearComments,
} = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
