import {
  IOffChainProject,
  IOffChainUserData,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';

import { API_ROUTES } from './config';
import {
  fetchAPI,
  parseData,
  parseErrorSubmission,
  parseSuccessSubmission,
} from './index';

export const fetchUserData = () =>
  fetchAPI
    .get<IOffChainUserData>(API_ROUTES.userData, {
      headers: { WITH_NEAR_AUTH: true },
    })
    .then(parseData);

export const fetchUserProjects = () =>
  fetchAPI.get<IOffChainProject[]>(API_ROUTES.userProjects).then((resp) => ({
    subProject: resp.data.find((p) => p.is_submission) || null,
    project: resp.data.find((p) => !p.is_submission) || null,
  }));

export const fetchChangeDisplayName = (displayName: string) =>
  fetchAPI
    .patch<IOffChainUserData>(
      API_ROUTES.userDisplayName,
      { displayName },
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));
