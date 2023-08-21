import { createAsyncThunk } from '@reduxjs/toolkit';

import * as projectsAPI from 'services/api/projectsAPI';
import { EMPTY_STRING } from 'shared/constants';
import { setIsUserDataLoading } from 'store/slices/user';

import { getUserProjects } from './index';
import * as Args from './types';

const OFFCHAIN_SUBMISSION = 'offchain/submission/';

const NEW = 'new';
const UPDATE = 'update';
const ATTACHMENTS_UPDATE = 'attachments/update';
const ATTACHMENTS_REMOVE = 'attachments/remove';
const PITCH_ADD = 'pitch/add';
const PITCH_UPDATE = 'pitch/update';
const PITCH_STATUS_UPDATE = 'pitchStatus/update';
const TEAM_UPDATE = 'team/update';

export const newProjectSubmission = createAsyncThunk(
  OFFCHAIN_SUBMISSION + NEW,
  (project: Args.SubmissionNew, { dispatch, rejectWithValue }) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchNewProjectSubmission(project)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const updateProjectSubmission = createAsyncThunk(
  OFFCHAIN_SUBMISSION + UPDATE,
  (
    { projectId, project }: Args.SubmissionUpdate,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchUpdateProjectSubmission(projectId, project)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const updateProjectAttachments = createAsyncThunk(
  OFFCHAIN_SUBMISSION + ATTACHMENTS_UPDATE,
  (
    { projectId, attachments, comment }: Args.SubmissionAttachmentsUpdate,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchUpdateProjectAttachments(projectId, attachments, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const removeProjectAttachments = createAsyncThunk(
  OFFCHAIN_SUBMISSION + ATTACHMENTS_REMOVE,
  (
    { projectId, attachmentIds, comment }: Args.SubmissionAttachmentsRemove,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchRemoveProjectAttachments(projectId, attachmentIds, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const addNewPitch = createAsyncThunk(
  OFFCHAIN_SUBMISSION + PITCH_ADD,
  (
    { projectId, pitch, comment }: Args.SubmissionPitchAdd,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchAddNewPitch(projectId, pitch, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const updatePitch = createAsyncThunk(
  OFFCHAIN_SUBMISSION + PITCH_UPDATE,
  (
    { pitchId, pitch, comment }: Args.SubmissionPitchUpdate,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchUpdatePitch(pitchId, pitch, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const updatePitchStatus = createAsyncThunk(
  OFFCHAIN_SUBMISSION + PITCH_STATUS_UPDATE,
  (
    { pitchId, isActive, comment }: Args.SubmissionPitchActivate,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchUpdatePitchStatus(pitchId, isActive, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);

export const updateTeam = createAsyncThunk(
  OFFCHAIN_SUBMISSION + TEAM_UPDATE,
  (
    { projectId, team, comment }: Args.SubmissionTeamUpdate,
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setIsUserDataLoading(true));

    return projectsAPI
      .fetchUpdateTeam(projectId, team, comment)
      .then(() => dispatch(getUserProjects()))
      .catch(() => rejectWithValue(EMPTY_STRING))
      .finally(() => dispatch(setIsUserDataLoading(false)));
  }
);
