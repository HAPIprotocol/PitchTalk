import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';

import { PARAMS } from 'shared/constants';
import { ILike, ILikeProject } from 'store/types/likes';

import { API_ROUTES } from './config';
import {
  fetchAPI,
  parseData,
  parseErrorSubmission,
  parseSuccessSubmission,
} from './index';

export const fetchOnChainProjectLikes = (projectId: string) =>
  fetchAPI
    .get<ILikeProject[]>(
      `${API_ROUTES.likesOnChainProject.replace(PARAMS.PROJECT_ID, projectId)}`
    )
    .then(parseData);

export const fetchOffChainProjectLikes = (projectId: string) =>
  fetchAPI
    .get<ILikeProject[]>(
      `${API_ROUTES.likesOffChainProject.replace(PARAMS.PROJECT_ID, projectId)}`
    )
    .then(parseData);

export const fetchUserLikes = (userId: string) =>
  fetchAPI
    .get<ILike[]>(`${API_ROUTES.likesUser.replace(PARAMS.USER_ID, userId)}`)
    .then(parseData);

export const fetchLikeProject = (
  projectId: string,
  type: EProjectType,
  isLiked: boolean
) =>
  fetchAPI
    .patch(
      `${API_ROUTES.likeProject.replace(PARAMS.PROJECT_ID, projectId)}`,
      { type },
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseSuccessSubmission(isLiked ? t('toast.unlike') : t('toast.like')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));
