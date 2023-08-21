import { memo } from 'react';

import i18n from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  selectUserImg,
  selectUserProvider,
  selectUserDisplayName,
} from 'store/slices/user';

import { useStyles } from './styles';
import { UserImg } from '../UserImg';

interface ICommentsControlsProps {
  commentMsg: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPost: (e: React.MouseEvent<HTMLButtonElement>) => void;
  error?: string | boolean;
  isPostDisabled: boolean;
  isUserLoggedIn: boolean;
}

export const CommentsControls: React.FC<ICommentsControlsProps> = memo(
  ({
    commentMsg,
    onChange,
    onCancel,
    onPost,
    error,
    isPostDisabled,
    isUserLoggedIn,
  }) => {
    const userImg = useAppSelector(selectUserImg);
    const userProvider = useAppSelector(selectUserProvider);
    const userName = useAppSelector(selectUserDisplayName);

    const classes = useStyles();

    return (
      <div className={classes.commentsWrapper}>
        <div className={classes.commentsInputWrapper}>
          <UserImg
            userImg={userImg}
            userName={userName}
            userProvider={userProvider}
          />
          <div className={classes.commentsInputContainer}>
            <textarea
              placeholder={
                isUserLoggedIn
                  ? `${i18n.t('events.addComment')}`
                  : `${i18n.t('events.toLeaveCommentLogin')}`
              }
              className={
                classes.commentsInput +
                (commentMsg.length
                  ? ' ' + classes.commentsActive
                  : EMPTY_STRING)
              }
              value={commentMsg}
              onChange={onChange}
            />
            {error && <p className={classes.commentsInputError}>{error}</p>}
          </div>
        </div>
        <div className={classes.commentsControlsWrapper}>
          <Button
            extraClass={classes.cancelBtn}
            label="actions.cancel"
            handleClick={onCancel}
          />
          <Button
            disabled={isPostDisabled}
            extraClass={classes.postBtn}
            label="actions.post"
            handleClick={onPost}
          />
        </div>
      </div>
    );
  }
);
