import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, { img?: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    commentsWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '64px',
    },
    commentsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: 640,
      [MAX_WIDTH_767]: {
        width: 320,
      },
    },
    commentsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxHeight: '540px',
      overflow: 'hidden auto',
      paddingRight: '10px',
      [MAX_WIDTH_1239]: {
        overflow: 'hidden scroll',
      },
    },
    showMoreBtnContainer: {
      marginInline: 'auto',
    },
    showMoreBtn: {
      width: 'fit-content',
      color: theme.colors.white,
      background: 'transparent',
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      paddingInline: '20px',
      textDecoration: 'underline',
      '&:hover': {
        scale: 1.05,
        paddingInline: '20px',
      },
      transition: 'all ease 0.2s',
    },
  })
);
