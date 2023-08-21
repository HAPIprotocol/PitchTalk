import { ITag } from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface ITagsData {
  tags: ITag[];
}

const initialState: ITagsData = {
  tags: [] as ITag[],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, { payload }: PayloadAction<ITag[]>) => {
      state.tags = payload;
    },
  },
});

export const { setTags } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.tags;

export const selectTagsMap = createSelector(selectTags, (tags) =>
  tags.reduce<Map<string, ITag>>((acc, tag) => acc.set(tag.id, tag), new Map())
);

export const tagsReducer = tagsSlice.reducer;
