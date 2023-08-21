import { t } from 'i18next';
import { memo } from 'react';

import { EProviders } from 'store/types/user';

import { useStyles } from './styles';
import { CommentDate } from '../CommentDate';
import { UserImg } from '../UserImg';

interface ICommentProps {
  id: string;
  userName: string;
  userImg: string;
  userProvider: EProviders;
  date: Date;
  comment: string;
  onDelete: (id: string) => void;
  isDelete: boolean;
}

export const Comment: React.FC<ICommentProps> = memo(
  ({
    id,
    userImg,
    userName,
    userProvider,
    date,
    comment,
    onDelete,
    isDelete,
  }) => {
    const classes = useStyles();

    return (
      <div className={classes.commentContainer}>
        <UserImg
          userName={userName}
          userImg={userImg}
          userProvider={userProvider}
        />
        <div className={classes.commentContent}>
          <p className={classes.commentInfo}>
            <span className={classes.commentSender}>{userName}</span>
            <CommentDate date={new Date(date).valueOf()} />
            {isDelete && (
              <button
                className={classes.commentDeleteBtn}
                onClick={() => onDelete(id)}
              >
                {`${t('actions.delete')}`}
              </button>
            )}
          </p>
          <p className={classes.commentText}>{comment}</p>
        </div>
      </div>
    );
  }
);
