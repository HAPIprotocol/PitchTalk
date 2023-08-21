import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, { img?: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    commentsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    commentsInputWrapper: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    commentsControlsWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '12px',
      color: theme.colors.white,
    },
    commentsInputContainer: {
      width: '100%',
    },
    commentsInput: {
      display: 'flex',
      padding: '7px 10px',
      alignItems: 'center',
      gap: '10px',
      flex: '1 0 0',
      width: '100%',
      borderRadius: '3px',
      border: `1px solid ${theme.colors.secondaryDark}`,
      background: theme.colors.black,
      color: theme.colors.ptGrey,
      outline: 'none',
      height: '32px',
      resize: 'none',
      fontSize: '0.75rem',
      lineHeight: '0.975rem',
      fontFamily: theme.fonts.Everett.Regular,
      '&:focus': {
        height: '84px',
        transition: 'all ease 0.5s',
        border: `1px solid ${theme.colors.inputFocused}`,
        color: theme.colors.white,
      },
      transition: 'all ease 0.5s',
    },
    commentsInputError: {
      fontSize: '0.75rem',
      color: theme.colors.errorRed,
      marginBottom: '0px',
    },
    commentsActive: {
      height: '84px',
    },
    postBtn: {
      '& button': {
        width: '133px',
        height: '32px',
        padding: '10px 32px',
        borderRadius: '3px',
        '&:active': {
          background: theme.colors.secondaryDark,
        },
        '&:disabled': {
          background: theme.colors.grey,
        },
        transition: 'all ease 0.2s',
      },
    },
    cancelBtn: {
      '& button': {
        width: '133px',
        height: '32px',
        padding: '10px 32px',
        borderRadius: '3px',
        background: 'transparent',
        '&:hover, &:active': {
          scale: 1.075,
          background: 'transparent',
        },
        transition: 'all ease 0.2s',
      },
    },
  })
);
