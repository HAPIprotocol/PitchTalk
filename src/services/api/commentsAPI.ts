import { t } from 'i18next';

import { PARAMS } from 'shared/constants';
import { IEventComment } from 'store/types/comments';

import { API_ROUTES } from './config';
import {
  fetchAPI,
  parseData,
  parseErrorSubmission,
  parseSuccessSubmission,
} from './index';

export const fetchEventComments = (eventId: string, page = 1, limit = 10) =>
  fetchAPI
    .get<IEventComment[]>(
      `${API_ROUTES.eventComments.replace(
        PARAMS.EVENT_ID,
        eventId
      )}?page=${page}&limit=${limit}`
    )
    .then(parseData);

export const fetchEventCommentsCount = (eventId: string) =>
  fetchAPI
    .get<number>(
      `${API_ROUTES.eventCommentsCount.replace(PARAMS.EVENT_ID, eventId)}`
    )
    .then(parseData);

export const fetchAddEventComment = (event_id: string, comment: string) =>
  fetchAPI
    .post<IEventComment | string>(
      API_ROUTES.comments,
      { event_id, comment },
      { headers: { WITH_NEAR_AUTH: true } }
    )
    .then(parseData);

export const fetchDeleteEventComment = (commentId: string) =>
  fetchAPI
    .delete<unknown>(API_ROUTES.comments + '/' + commentId, {
      headers: { WITH_NEAR_AUTH: true },
    })
    .then(parseSuccessSubmission(t('toast.toastSuccess')))
    .catch(parseErrorSubmission(t('toast.toastFailed')));
