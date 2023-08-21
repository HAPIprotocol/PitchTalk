import { IGrant, Vesting, Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  IEventProjectSubmission,
  IOffChainProject,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProjects } from 'store/thunks/projects';
import { IProjectParticipatedEvent } from 'store/types/projects';

const SLICE_PREFIX = 'projects';

const projectsSlice = createSlice({
  name: SLICE_PREFIX,
  initialState: {
    onChainProjects: {} as Record<number, Project>,
    offChainProjects: {} as Record<string, IOffChainProject>,
    submissions: {} as Record<string, IEventProjectSubmission[]>,
    projectsEvents: {} as Record<string, IProjectParticipatedEvent[]>,
    isLoading: true,
  },
  reducers: {
    setOnChainProjects: (state, { payload }: PayloadAction<Project[]>) => {
      state.onChainProjects = payload.reduce(
        (acc, project) => ({ ...acc, [project.project_id]: project }),
        { ...state.onChainProjects }
      );
    },
    setOffChainProjects: (
      state,
      { payload }: PayloadAction<IOffChainProject[]>
    ) => {
      state.offChainProjects = payload.reduce(
        (acc, project) => ({ ...acc, [project.id]: project }),
        { ...state.offChainProjects }
      );
    },
    updateOnChainProject: (
      state,
      {
        payload: { project },
      }: PayloadAction<{
        project: Project;
        grants?: IGrant[];
        vesting?: Vesting | null | undefined;
      }>
    ) => {
      state.onChainProjects[project.project_id] = project;
    },
    updateOffChainProject: (
      state,
      { payload }: PayloadAction<IOffChainProject>
    ) => {
      state.offChainProjects[payload.id] = payload;
    },
    updateProjectSubmissions: (
      state,
      {
        payload,
      }: PayloadAction<{
        projectId: string;
        submissions: IEventProjectSubmission[];
      }>
    ) => {
      state.submissions[payload.projectId] = payload.submissions;
    },
    updateProjectEvents: (
      state,
      action: PayloadAction<{
        projectId: number | string;
        events: IProjectParticipatedEvent[];
      }>
    ) => {
      state.projectsEvents[action.payload.projectId] = action.payload.events;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProjects.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setOnChainProjects,
  setOffChainProjects,
  updateOnChainProject,
  updateOffChainProject,
  updateProjectSubmissions,
  updateProjectEvents,
} = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
