import { createAction } from '@reduxjs/toolkit';

import { COMMENTS_PREFIX } from 'store/slices/comments';

export const COMMENTS_SERVICE_ACTIONS = {
  CONNECT: COMMENTS_PREFIX + '/CONNECT',
  DISCONNECT: COMMENTS_PREFIX + '/DISCONNECT',
  SEND_COMMENT: COMMENTS_PREFIX + '/SEND_COMMENT',
  DELETE_COMMENT: COMMENTS_PREFIX + '/DELETE_COMMENT',
};

type ConnectCommentsPayload = { eventId: string; authKey: string };
const connect = createAction<ConnectCommentsPayload>(
  COMMENTS_SERVICE_ACTIONS.CONNECT
);

const disconnect = createAction(COMMENTS_SERVICE_ACTIONS.DISCONNECT);

type SendCommentPayload = {
  event_id: string;
  comment?: string;
};
const sendComment = createAction<SendCommentPayload>(
  COMMENTS_SERVICE_ACTIONS.SEND_COMMENT
);

const deleteComment = createAction<string>(
  COMMENTS_SERVICE_ACTIONS.DELETE_COMMENT
);

export const liveCommentsActions = {
  connect,
  disconnect,
  sendComment,
  deleteComment,
};
