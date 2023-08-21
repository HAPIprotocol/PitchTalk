import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  EProjectType,
  IOffChainProject,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { createSelector } from '@reduxjs/toolkit';
import slug from 'slug';

import { getFilteredProject } from 'pages/projects-page/utils';
import { isOffChainProject } from 'shared/utils/projectUtils';
import { RootState } from 'store/store';

// ON CHAIN PROJECTS
// TODO: Rename to selectOnChainProjects
export const selectProjects = createSelector(
  (state: RootState) => state.projects.onChainProjects,
  Object.values
);
export const selectActiveProjects = createSelector(
  (state: RootState) => state.projects.onChainProjects,
  (projects) => Object.values(projects).filter((project) => project.is_active)
);

export const selectProjectsName = createSelector(
  (state: RootState) => state.projects.onChainProjects,
  (projects) => Object.values(projects).map((project) => project.name)
);

export const selectOnChainProjectById = createSelector(
  selectProjects,
  (_: RootState, projectId: number) => projectId,
  (projects, projectId) =>
    projects.find((project) => project.project_id === projectId)
);

// OFF CHAIN PROJECTS
export const selectOffChainProjects = createSelector(
  (state: RootState) => state.projects.offChainProjects,
  (projects) =>
    Object.values(projects).filter((project) => !project.is_submission)
);

export const selectActiveOffChainProjects = (state: RootState) =>
  selectOffChainProjects(state).filter((project) => project.is_active);

export const selectOffChainProjectById = createSelector(
  selectOffChainProjects,
  (_: RootState, id: string) => id,
  (projects, id) => projects.find((project) => project.id === id)
);

export const selectProjectsList = createSelector(
  selectActiveProjects,
  selectActiveOffChainProjects,
  (onChainProjects, offChainProjects) => [
    ...onChainProjects,
    ...offChainProjects,
  ]
);

export const selectProjectsMap = createSelector(
  selectActiveProjects,
  selectActiveOffChainProjects,
  (onChainProjects, offChainProjects) =>
    [...onChainProjects, ...offChainProjects].reduce<
      Map<string, IOffChainProject | Project>
    >(
      (acc, project) =>
        {
          if (isOffChainProject(project)) {
            acc.set(project.id.toString(), project)
            !!project.slug && acc.set(project.slug, project)
          } else {
            acc.set(project.project_id.toString(), project)
            acc.set(slug(project.name, { lower: false, replacement: '_' }), project)
          }
          return acc;
        },
      new Map()
    )
);

export const selectProjectByIdOrSlug = createSelector(
  selectProjectsMap,
  (_: RootState, id: string) => id,
  (projects, id) => {
    const project = projects.get(id);
    const projectType = project
      ? isOffChainProject(project)
        ? EProjectType.OffChain
        : EProjectType.OnChain
      : undefined;

    return { project, projectType };
  }
);

export const selectProjectsListWithData = createSelector(
  (state: RootState) => state,
  selectProjectsList,
  (state, projects) =>
    projects.map((project) => getFilteredProject(state, project))
);

export const selectIsProjectsLoading = (state: RootState) =>
  state.projects.isLoading;

export const selectProjectSubmissions = createSelector(
  (state: RootState) => state.projects.submissions,
  (_: RootState, id: string) => id,
  (submissions, id) => new Map(Object.entries(submissions)).get(id)
);

export const selectProjectParticipatedEvents = createSelector(
  (state: RootState) => state.projects.projectsEvents,
  (_: RootState, id: string | number) => id,
  (projectsEvents, id) => projectsEvents[id]
);
