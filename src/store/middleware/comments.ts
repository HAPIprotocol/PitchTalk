import { Dispatch, Middleware } from 'redux';

import {
  COMMENTS_EVENT_NAMES,
  CommentsService,
} from 'services/sockets/CommentsService';
import { parseCommentDelayError } from 'shared/parsers/comments';
import { COMMENTS_SERVICE_ACTIONS } from 'store/actions/comments';
import {
  COMMENTS_PREFIX,
  addComment,
  deleteComment,
  setCommentsLoading,
} from 'store/slices/comments';
import { selectUserOffChainId } from 'store/slices/user';
import { RootState } from 'store/store';

export const commentsMiddleware =
  (socket: CommentsService): Middleware<Dispatch, RootState> =>
  (storeApi) =>
  (next) =>
  (action) => {
    const { type } = action;

    switch (type) {
      case COMMENTS_SERVICE_ACTIONS.CONNECT: {
        const { eventId, authKey } = action.payload;
        socket.connect(eventId, authKey);

        socket.onMessage(COMMENTS_EVENT_NAMES.onComment, (data) => {
          storeApi.dispatch(addComment(data));
          storeApi.dispatch(setCommentsLoading(false));
        });
        socket.onMessage(COMMENTS_EVENT_NAMES.onDeleteComment, (data) => {
          storeApi.dispatch(deleteComment(data));
          storeApi.dispatch(setCommentsLoading(false));
        });
        socket.onMessage(COMMENTS_EVENT_NAMES.exception, (data) => {
          console.log(COMMENTS_PREFIX + '/Server-error', data);
          storeApi.dispatch(setCommentsLoading(false));
        });
        socket.onMessage(COMMENTS_EVENT_NAMES.onCommentDelay, (data) => {
          const { userId, date } = data;
          const currentUserId = selectUserOffChainId(storeApi.getState());
          if (userId === currentUserId) {
            parseCommentDelayError(date);
            storeApi.dispatch(setCommentsLoading(false));
          }
        });
        break;
      }

      case COMMENTS_SERVICE_ACTIONS.DELETE_COMMENT:
        socket.deleteComment(action.payload);
        break;
      case COMMENTS_SERVICE_ACTIONS.SEND_COMMENT:
        socket.sendComment(action.payload);
        break;
      case COMMENTS_SERVICE_ACTIONS.DISCONNECT:
        socket.disconnect();
        break;
      default:
        break;
    }

    return next(action);
  };
