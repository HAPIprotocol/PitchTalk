import { Document } from '@pitchtalk/contract-api-js/dist/core';
import {
  IEventProjectSubmission,
  IOffChainProject,
  ITeamMemberOffChain,
  PitchArgsOffChain,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { IProjectArgs } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { t } from 'i18next';

import { PARAMS } from 'shared/constants';

import { API_ROUTES } from './config';
import {
  fetchAPI,
  parseData,
  parseErrorSubmission,
  parseSuccessSubmission,
} from './index';

export const fetchProjectById = (id: string) =>
  fetchAPI
    .get<IOffChainProject>(`${API_ROUTES.projects}/${id}`)
    .then(parseData);

export const fetchProjectIdBySlug = (slug: string): Promise<string | null> =>
  fetchAPI
    .get<string>(`${API_ROUTES.projectsSlug}/${slug}`)
    .then(parseData)

export const fetchProjects = (limit: number) =>
  fetchAPI
    .get<IOffChainProject[]>(`${API_ROUTES.projects}?limit=${limit}`)
    .then(parseData);

export const fetchProjectsCount = () =>
  fetchAPI.get<number>(API_ROUTES.projectsCount).then(parseData);

export const fetchProjectSubmissions = (projectId: string) =>
  fetchAPI
    .get<IEventProjectSubmission[]>(
      `${API_ROUTES.projectSubmissions.replace(PARAMS.PROJECT_ID, projectId)}`
    )
    .then(parseData);

export const fetchProjectSubmissionById = (submissionId: string) =>
  fetchAPI
    .get<IEventProjectSubmission>(
      `${API_ROUTES.submissionById.replace(
        PARAMS.PARTICIPATION_ID,
        submissionId
      )}`
    )
    .then(parseData);

export const fetchNewProjectSubmission = (
  project: IProjectArgs & {
    contact_links: { telegram: string; email: string };
  }
) =>
  fetchAPI
    .post(API_ROUTES.projectSubmissionNew, { ...project })
    .then(parseData);

export const fetchUpdateProjectSubmission = (
  projectId: string,
  project: IProjectArgs
) =>
  fetchAPI
    .post(
      API_ROUTES.projectSubmissionUpdate.replace(PARAMS.PROJECT_ID, projectId),
      {
        ...project,
      }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchUpdateProjectAttachments = (
  projectId: string,
  attachments: Document[],
  comment?: string
) =>
  fetchAPI
    .patch(
      API_ROUTES.projectSubmissionDocumentsUpdate.replace(
        PARAMS.PROJECT_ID,
        projectId
      ),
      { data: attachments, comment }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchRemoveProjectAttachments = (
  projectId: string,
  attachmentIds: string[],
  comment?: string
) =>
  fetchAPI
    .delete(
      API_ROUTES.projectSubmissionDocumentsUpdate.replace(
        PARAMS.PROJECT_ID,
        projectId
      ),
      { data: { data: attachmentIds, comment } }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchAddNewPitch = (
  projectId: string,
  pitch: PitchArgsOffChain,
  comment?: string
) =>
  fetchAPI
    .post(
      API_ROUTES.projectSubmissionPitchAdd.replace(
        PARAMS.PROJECT_ID,
        projectId
      ),
      {
        data: { ...pitch },
        comment,
      }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchUpdatePitch = (
  pitchId: string,
  pitch: PitchArgsOffChain,
  comment?: string
) =>
  fetchAPI
    .patch(
      API_ROUTES.projectSubmissionPitchUpdate.replace(PARAMS.PITCH_ID, pitchId),
      {
        data: { ...pitch },
        comment,
      }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchUpdatePitchStatus = (
  pitchId: string,
  isActive: boolean,
  comment?: string
) =>
  fetchAPI
    .patch(
      API_ROUTES.projectSubmissionPitchStatusUpdate.replace(
        PARAMS.PITCH_ID,
        pitchId
      ),
      { data: { isActive }, comment }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));

export const fetchUpdateTeam = (
  projectId: string,
  team: ITeamMemberOffChain[],
  comment?: string
) =>
  fetchAPI
    .patch(
      API_ROUTES.projectSubmissionTeamUpdate.replace(
        PARAMS.PROJECT_ID,
        projectId
      ),
      { data: team, comment }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));
