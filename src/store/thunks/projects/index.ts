/* eslint-disable no-console */
import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  PitchTalk,
  IProjectFinancialInfo,
} from '@pitchtalk/contract-api-js/dist/pitchtalk';
import { compose, createAsyncThunk } from '@reduxjs/toolkit';

import * as projectsAPI from 'services/api/projectsAPI';
import { FINANCIAL_PAGINATION_REQUEST, EPromiseStatus } from 'shared/constants';
import {
  getPaginationArray,
  retrievePitchesFromProjects,
} from 'shared/utils/pitchUtils';
import { setDonations } from 'store/slices/donations';
import { setPitches } from 'store/slices/pitches';
import {
  setOffChainProjects,
  setOnChainProjects,
  updateOffChainProject,
  updateProjectSubmissions,
} from 'store/slices/projects';
import { AppDispatch } from 'store/store';

const SLICE_PREFIX = 'projects';

export const getProjectsDonations =
  (pitchTalkService: PitchTalk) => (dispatch: AppDispatch) =>
    pitchTalkService
      .projectCount()
      .then((count) => count || 0)
      .then((count) => getPaginationArray(count, FINANCIAL_PAGINATION_REQUEST))
      .then((paginationArray) =>
        Promise.allSettled(
          paginationArray.map(({ fromIndex, limit }) =>
            pitchTalkService.getProjectsDonations(fromIndex, limit)
          )
        )
          .then((projectsResponse) =>
            projectsResponse.reduce(
              (arr, projects) =>
                projects.status === EPromiseStatus.FULFILLED && projects.value
                  ? [...arr, ...projects.value]
                  : arr,
              [] as IProjectFinancialInfo[]
            )
          )
          .then((newProjects) =>
            newProjects.reduce(
              (
                acc,
                { project_id, total_donations, total_investments, ft_token_id }
              ) =>
                ft_token_id
                  ? {
                      ...acc,
                      [project_id]: {
                        total_donations,
                        total_investments,
                        ft_token_id,
                      },
                    }
                  : { ...acc },
              {}
            )
          )
          .then(
            (result) =>
              Object.keys(result).length && dispatch(setDonations(result))
          )
      );

const getOnChainProjects = createAsyncThunk(
  SLICE_PREFIX + '/getOnChainProjects',
  (pitchTalkService: PitchTalk, { dispatch }) =>
    pitchTalkService
      .projectCount()
      .then((count) => count || 0)
      .then(getPaginationArray)
      .then((paginationArray) =>
        Promise.allSettled(
          paginationArray.map(({ fromIndex, limit }) =>
            pitchTalkService.getProjects(fromIndex, limit)
          )
        )
          .then((projectsResponse) =>
            projectsResponse.reduce(
              (arr, projects) =>
                projects.status === EPromiseStatus.FULFILLED && projects.value
                  ? [...arr, ...projects.value]
                  : arr,
              [] as Project[]
            )
          )
          .then((projects) => {
            const activeProjects = projects.filter(
              (project) => project.is_active
            );
            const newPitches = retrievePitchesFromProjects(activeProjects);
            const newPitchesList = newPitches.sort(
              (a, b) => a.starts_on - b.starts_on
            );

            dispatch(setPitches(newPitchesList));
            dispatch(setOnChainProjects(projects));
          })
      )
);

const getOffChainProjects = createAsyncThunk(
  SLICE_PREFIX + '/getOffChainProjects',
  (_, { dispatch }) =>
    projectsAPI
      .fetchProjectsCount()
      .then((amount) =>
        projectsAPI
          .fetchProjects(amount)
          .then(compose(dispatch, setOffChainProjects))
      )
);

export const getOffChainProjectById = createAsyncThunk(
  SLICE_PREFIX + '/getOffChainProjectById',
  (id: string, { dispatch }) =>
    projectsAPI
      .fetchProjectById(id)
      .then(compose(dispatch, updateOffChainProject))
);

export const getProjectEventSubmissions = createAsyncThunk(
  SLICE_PREFIX + '/getProjectEventSubmissions',
  (projectId: string, { dispatch }) =>
    projectsAPI
      .fetchProjectSubmissions(projectId)
      .then((submissions) =>
        dispatch(updateProjectSubmissions({ projectId, submissions }))
      )
);

export const getProjects = createAsyncThunk(
  SLICE_PREFIX + '/getProjects',
  (pitchTalkService: PitchTalk, { dispatch }) =>
    dispatch(getOnChainProjects(pitchTalkService)).then(() =>
      dispatch(getOffChainProjects())
    )
);
