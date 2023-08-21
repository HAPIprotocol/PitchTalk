import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector } from '@reduxjs/toolkit';

import { ZERO_BIG } from 'shared/constants';
import { IUserInvestments } from 'shared/interfaces';
import { selectUserInvestments } from 'store/slices/user';

import { selectProjects } from './projects';

export const selectParticipation = createSelector(
  [selectProjects, selectUserInvestments],
  (projects: Project[], { totalSpentByProjects }: IUserInvestments) => {
    const totalSpentKeys = Object.keys(totalSpentByProjects);
    return projects
      .filter(({ project_id }) =>
        totalSpentKeys.includes(project_id.toString())
      )
      .map((project) => ({
        ...project,
        donatedByUser:
          totalSpentByProjects?.[project.project_id]?.donated || ZERO_BIG,
        investedByUser:
          totalSpentByProjects?.[project.project_id]?.invested || ZERO_BIG,
      }));
  }
);
