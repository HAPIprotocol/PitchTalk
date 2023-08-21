import { Manager, Socket } from 'socket.io-client';

import { WS_ROUTES, WS_URL } from 'services/api/config';

export enum DEFAULT_EVENT_NAMES {
  connect = 'connect',
  close = 'close',
  connect_error = 'connect_error',
  error = 'error',
  ping = 'ping',
  reconnect = 'reconnect',
  reconnect_attempt = 'reconnect_attempt',
  reconnect_error = 'reconnect_error',
  reconnect_failed = 'reconnect_failed',
}

export enum COMMENTS_EVENT_NAMES {
  comment = 'comment',
  onComment = 'onComment',
  deleteComment = 'deleteComment',
  onDeleteComment = 'onDeleteComment',
  onCommentDelay = 'onCommentDelay',
  exception = 'exception',
}

export class CommentsService {
  manager: Manager | null;
  socket: Socket | null;

  constructor() {
    this.manager = null;
    this.socket = null;
  }

  async connect(eventId: string, authorization: string) {
    this.manager = new Manager(WS_URL, { query: { eventId } });

    this.manager.open();

    this.socket = this.manager.socket(WS_ROUTES.comments, {
      auth: { authorization: `Bearer ${authorization}` },
    });

    this.socket.on(DEFAULT_EVENT_NAMES.connect, () => {
      console.log('/Connected');
    });
    this.socket.on(DEFAULT_EVENT_NAMES.close, () => {
      console.log('/Disconected');
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.manager?._close();
    this.socket = null;
    this.manager = null;
  }

  onMessage(eventName: COMMENTS_EVENT_NAMES, listener: (data: any) => void) {
    this.socket?.on(eventName, listener);
  }

  sendComment(comment: string) {
    this.socket?.emit(COMMENTS_EVENT_NAMES.comment, comment);
  }

  deleteComment(commentId: string) {
    this.socket?.emit(COMMENTS_EVENT_NAMES.deleteComment, commentId);
  }
}
