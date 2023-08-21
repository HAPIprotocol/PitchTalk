import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchAddEventComment,
  fetchDeleteEventComment,
  fetchEventComments,
  fetchEventCommentsCount,
} from 'services/api/commentsAPI';
import { EMPTY_STRING } from 'shared/constants';
import { parseCommentDelayError } from 'shared/parsers/comments';
import { ThunkAPIType } from 'shared/utils/reduxUtils';
import { ESTORAGE_KEYS, getItem } from 'shared/utils/storage';
import { liveCommentsActions } from 'store/actions/comments';
import { selectCommentsEventId } from 'store/selectors/comments';
import {
  COMMENTS_PREFIX,
  setCommentsLoading,
  setComments,
  setCommentsCount,
  addComment,
  deleteComment as deleteCommentAction,
} from 'store/slices/comments';
import { selectOffChainUserData } from 'store/slices/user';
import { IEventComment } from 'store/types/comments';

export const connectComments = createAsyncThunk<unknown, never, ThunkAPIType>(
  COMMENTS_PREFIX + '/connectComments',
  (_, { dispatch, getState }) => {
    const state = getState();
    const offChainUser = selectOffChainUserData(state);
    const eventId = selectCommentsEventId(state);
    if (!eventId) return;

    const authKey = getItem(
      offChainUser
        ? ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN
        : ESTORAGE_KEYS.NEAR_ACCESS_TOKEN
    ) as string | null;

    dispatch(
      liveCommentsActions.connect({
        eventId,
        authKey: authKey || EMPTY_STRING,
      })
    );
  }
);

export const disconnectComments = createAsyncThunk<
  unknown,
  never,
  ThunkAPIType
>(COMMENTS_PREFIX + '/disconnectComments', (_, { dispatch }) =>
  dispatch(liveCommentsActions.disconnect())
);

export const sendComment = createAsyncThunk<
  unknown,
  { comment: string; isLiveEvent: boolean },
  ThunkAPIType
>(
  COMMENTS_PREFIX + '/sendComment',
  ({ comment, isLiveEvent }, { dispatch, getState }) => {
    const state = getState();
    const event_id = selectCommentsEventId(state);
    if (!event_id) return;

    dispatch(setCommentsLoading(true));
    if (isLiveEvent) {
      dispatch(liveCommentsActions.sendComment({ event_id, comment }));
    } else {
      fetchAddEventComment(event_id, comment)
        .then((comment: IEventComment | string) => {
          if (typeof comment === 'string') {
            parseCommentDelayError(comment);
          } else {
            dispatch(addComment(comment));
          }
          return Promise.resolve();
        })
        .finally(() => dispatch(setCommentsLoading(false)));
    }
  }
);

export const deleteComment = createAsyncThunk<
  unknown,
  { id: string; isLiveEvent: boolean },
  ThunkAPIType
>(
  COMMENTS_PREFIX + '/deleteComment',
  ({ id, isLiveEvent }, { dispatch, getState }) => {
    const state = getState();
    const eventId = selectCommentsEventId(state);
    if (!eventId) return;
    dispatch(setCommentsLoading(true));

    if (isLiveEvent) {
      dispatch(liveCommentsActions.deleteComment(id));
    } else {
      dispatch(setCommentsLoading(true));
      fetchDeleteEventComment(id)
        .then(() => dispatch(deleteCommentAction(id)))
        .finally(() => dispatch(setCommentsLoading(false)));
    }
  }
);

export const getComments = createAsyncThunk<
  unknown,
  { page?: number; limit?: number },
  ThunkAPIType
>(
  COMMENTS_PREFIX + '/fetchComments',
  ({ page, limit }, { dispatch, getState }) => {
    const state = getState();
    const eventId = selectCommentsEventId(state);
    if (!eventId) {
      console.log(COMMENTS_PREFIX + '/Cannot fetch comments');
      return;
    }
    fetchEventComments(eventId, page, limit).then((comments) =>
      dispatch(setComments(comments))
    );
  }
);

export const getCommentsCount = createAsyncThunk<unknown, never, ThunkAPIType>(
  COMMENTS_PREFIX + '/fetchCommentsCount',
  (_, { dispatch, getState }) => {
    const state = getState();
    const eventId = selectCommentsEventId(state);
    if (!eventId) {
      console.log(COMMENTS_PREFIX + '/Cannot fetch comments count');
      return;
    }
    fetchEventCommentsCount(eventId).then((count) =>
      dispatch(setCommentsCount(count))
    );
  }
);
