import { t } from 'i18next';
import { memo } from 'react';

import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectIsUserChatAdmin, selectUserOffChainId } from 'store/slices/user';

import { Comment } from './Comment';
import { CommentsControls } from './CommentsControls';
import { useStyles } from './styles';
import { useCommentsControls } from './useCommentsControls';

interface IEventCommentsProps {
  serverEventId: string;
  isLiveEvent: boolean;
}

export const EventComments: React.FC<IEventCommentsProps> = memo(
  ({ isLiveEvent, serverEventId }) => {
    const classes = useStyles();
    const userId = useAppSelector(selectUserOffChainId);

    const isAdmin = useAppSelector(selectIsUserChatAdmin);

    const {
      listRef,
      getMoreComments,
      onCommentChange,
      onCommentCancel,
      onCommentPost,
      onCommentDelete,
      isFormDisabled,
      touched,
      error,
      value,
      isMoreBtn,
      comments,
    } = useCommentsControls(isLiveEvent, serverEventId, userId);

    return (
      <div className={classes.commentsWrapper}>
        <div className={classes.commentsContainer}>
          <CommentsControls
            commentMsg={value}
            onChange={onCommentChange}
            onCancel={onCommentCancel}
            onPost={onCommentPost}
            error={!!touched && error}
            isPostDisabled={isFormDisabled}
            isUserLoggedIn={!!userId}
          />
          <div className={classes.commentsList} ref={listRef}>
            {comments.map(
              (comment) =>
                comment && (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    userName={comment.user.display_name}
                    userImg={comment.user.picture}
                    userProvider={comment.user.provider}
                    date={comment.created_at}
                    comment={comment.comment}
                    isDelete={comment.user.id === userId || isAdmin}
                    onDelete={onCommentDelete}
                  />
                )
            )}
            {isMoreBtn && (
              <div className={classes.showMoreBtnContainer}>
                <button
                  onClick={getMoreComments}
                  className={classes.showMoreBtn}
                >{`${t('events.showMore')}`}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
