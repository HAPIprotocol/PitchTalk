import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  commentContainer: {
    display: 'flex',
    width: '100%',
    gap: '10px',
    '& p': {
      margin: 0,
    },
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    [MAX_WIDTH_767]: {
      maxWidth: '270px',
    },
  },
  commentInfo: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  commentSender: {
    color: theme.colors.white,
    maxWidth: '200px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 2,
    [MAX_WIDTH_767]: {
      fontSize: '0.85rem',
      maxWidth: '140px',
    },
  },
  commentDate: {
    color: theme.colors.ptGrey,
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
    },
  },
  commentText: {
    color: theme.colors.ptGrey,
    [MAX_WIDTH_767]: {
      fontSize: '0.85rem',
    },
  },
  commentDeleteBtn: {
    height: 'fit-content',
    color: theme.colors.white,
    background: theme.colors.ptError,
    border: 0,
    borderRadius: '3px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
    transition: 'all ease 0.2s',
  },
}));
