import { t } from 'i18next';

import { ToastType } from 'services/toast/constants';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import {
  COMMENT_DELAY,
  ONE_SECOND_IN_MS,
  EMPTY_STRING,
} from 'shared/constants';

export const parseCommentDelayError = (date: string) => {
  const leftDelay = Math.round(
    (COMMENT_DELAY - (Date.now() - new Date(date).valueOf())) / ONE_SECOND_IN_MS
  );

  ToastLink(
    EMPTY_STRING,
    t('events.commentsDelay', { seconds: leftDelay }),
    ToastType.Info
  );
};
