import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILike, ILikeProject } from 'store/types/likes';

interface ILikesData {
  events: Record<number, ILike[]>;
  projects: Record<string, ILikeProject[]>;
  pitches: Record<string, ILike[]>;
}

const initialState: ILikesData = {
  events: {} as Record<number, ILike[]>,
  projects: {} as Record<string, ILikeProject[]>,
  pitches: {} as Record<string, ILike[]>,
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    updateEventLikes: (
      state,
      { payload }: PayloadAction<{ eventId: number; likes: ILike[] }>
    ) => {
      state.events[payload.eventId] = payload.likes;
    },
    updateProjectLikes: (
      state,
      { payload }: PayloadAction<{ projectId: string; likes: ILikeProject[] }>
    ) => {
      state.projects[payload.projectId] = payload.likes;
    },
    updatePitchLikes: (
      state,
      { payload }: PayloadAction<{ pitchId: string; likes: ILike[] }>
    ) => {
      state.pitches[payload.pitchId] = payload.likes;
    },
  },
});

export const { updateEventLikes, updateProjectLikes, updatePitchLikes } =
  likesSlice.actions;

export const likesReducer = likesSlice.reducer;
