import { Project, Vesting } from '@pitchtalk/contract-api-js/dist/core';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

import { IFilteredProject } from 'pages/projects-page/interface';
import { IParticipatedProjects } from 'shared/interfaces';
import {
  EProjectStatus,
  getProjectInvestsAndDonatesInUSN,
  isCompletedProject,
  isHotProject,
  isLiveProject,
  isNewProject,
  isSoonProject,
  isVestingProject,
} from 'shared/utils/projectUtils';

export enum ESortedFilterDirection {
  LOW = 'LOW',
  HIGH = 'HIGH',
}

export enum ESortedByFilters {
  DATE = 'CREATION DATE',
  INVESTMENTS = 'INVESTMENTS',
}

export interface IFiltersState {
  projectsStatus: {
    [key: string]: {
      enabled: boolean;
      fn: (
        project: Project,
        vesting: Vesting | null,
        tokenDecimals: number
      ) => boolean;
    };
  };
  projectsTypes: { isRated: boolean; isPremium: boolean; isJoined: boolean };
  sorting: {
    [key in ESortedByFilters]: { direction: ESortedFilterDirection };
  } & { sortBy: ESortedByFilters };
}

export const getDefaultFiltersState = (isJoined = false) => ({
  projectsStatus: {
    [EProjectStatus.LIVE]: { enabled: false, fn: isLiveProject },
    [EProjectStatus.COMPLETED]: { enabled: false, fn: isCompletedProject },
    [EProjectStatus.SOON]: { enabled: false, fn: isSoonProject },
    [EProjectStatus.HOT]: { enabled: false, fn: isHotProject },
    [EProjectStatus.VESTING]: { enabled: false, fn: isVestingProject },
    [EProjectStatus.NEW]: { enabled: false, fn: isNewProject },
  },
  projectsTypes: { isRated: false, isPremium: false, isJoined },
  sorting: {
    sortBy: ESortedByFilters.DATE,
    [ESortedByFilters.DATE]: { direction: ESortedFilterDirection.HIGH },
    [ESortedByFilters.INVESTMENTS]: { direction: ESortedFilterDirection.HIGH },
  },
});

export const setPremium = (prev: IFiltersState) => ({
  ...prev,
  projectsTypes: {
    ...prev.projectsTypes,
    isPremium: !prev.projectsTypes.isPremium,
  },
});

export const setJoined = (prev: IFiltersState) => ({
  ...prev,
  projectsTypes: {
    ...prev.projectsTypes,
    isJoined: !prev.projectsTypes.isJoined,
  },
});

export const setRated = (prev: IFiltersState) => ({
  ...prev,
  projectsTypes: {
    ...prev.projectsTypes,
    isRated: !prev.projectsTypes.isRated,
  },
});

export const changeSortingDirection = (
  prev: IFiltersState,
  sorting: ESortedByFilters,
  direction: ESortedFilterDirection
) => ({
  ...prev,
  sorting: {
    ...prev.sorting,
    [sorting]: { ...prev.sorting[sorting], direction },
  },
});

export const changeSorting = (
  prev: IFiltersState,
  sortBy: ESortedByFilters
) => ({
  ...prev,
  sorting: { ...prev.sorting, sortBy },
});

// FILTER BY TYPE
const filterRatedProjects = ({ likes }: { likes: string[] }) => !!likes?.length;

const filterJoinedProjects = (
  projectId: string | number,
  totalSpentByProjects: IParticipatedProjects
) => Object.keys(totalSpentByProjects).includes(projectId.toString());

export const filterProjectsByType = (
  projects: IFilteredProject[],
  filters: IFiltersState,
  totalSpent: IParticipatedProjects
) => {
  let projectsToFilter: IFilteredProject[] = [...projects];

  // TODO: Premium projects, not implemented yet
  if (filters.projectsTypes.isRated) {
    projectsToFilter = projectsToFilter.filter((project) =>
      project.projectType === EProjectType.OnChain
        ? filterRatedProjects(project)
        : false
    );
  }
  if (filters.projectsTypes.isJoined) {
    projectsToFilter = projectsToFilter.filter((project) =>
      project.projectType === EProjectType.OnChain
        ? filterJoinedProjects(project.id, totalSpent)
        : false
    );
  }

  return projectsToFilter;
};

// FILTER BY STATUS
export const filterProjectsByStatus = (
  projects: IFilteredProject[],
  filters: IFiltersState
) => {
  const enabledFiltersByStatus = Object.values(filters.projectsStatus).filter(
    ({ enabled }) => enabled
  );
  return enabledFiltersByStatus.length
    ? enabledFiltersByStatus
        .map(({ fn }) =>
          projects.filter((project) =>
            project.projectType === EProjectType.OnChain
              ? fn(
                  project.onChainProjectData!,
                  project.vesting,
                  project.projectTokenData.decimals
                )
              : false
          )
        )
        .flat()
        .reverse()
    : [...projects].reverse();
};

// SORTING
const sortProjectsByDate = (
  project: IFilteredProject,
  nextProject: IFilteredProject,
  direction: ESortedFilterDirection
) =>
  direction === ESortedFilterDirection.HIGH
    ? +(nextProject.created_at ?? 0) - +(project.created_at ?? 0)
    : +(project.created_at ?? 0) - +(nextProject.created_at ?? 0);

const sortProjectsByInvestments = (
  project: IFilteredProject,
  nextProject: IFilteredProject,
  direction: ESortedFilterDirection
) => {
  const projectInvestUsnAmount = getProjectInvestsAndDonatesInUSN(project);
  const nextProjectInvestUsnAmount =
    getProjectInvestsAndDonatesInUSN(nextProject);

  return direction === ESortedFilterDirection.HIGH
    ? nextProjectInvestUsnAmount - projectInvestUsnAmount
    : projectInvestUsnAmount - nextProjectInvestUsnAmount;
};

export const sortProjects = (
  projectsAll: IFilteredProject[],
  filters: IFiltersState
) => {
  const projects = [...projectsAll];

  return projects.sort(
    filters.sorting.sortBy === ESortedByFilters.DATE
      ? (a, b) =>
          sortProjectsByDate(
            a,
            b,
            filters.sorting[ESortedByFilters.DATE].direction
          )
      : (a, b) =>
          sortProjectsByInvestments(
            a,
            b,
            filters.sorting[ESortedByFilters.INVESTMENTS].direction
          )
  );
};
