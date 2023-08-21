import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  button: {
    width: 143,
    height: 36,
    backgroundColor: theme.colors.secondaryDark,
    border: 'none',
    borderRadius: 3,
    padding: '0 22px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    lineHeight: '16px',
    cursor: 'pointer',
    letterSpacing: '0.28px',
    color: theme.colors.white,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',


    '&:disabled': {
      pointerEvents: 'none',
      color: theme.colors.black,
      backgroundColor: theme.colors.grey,
    },

    '&:hover': {
      backgroundColor: theme.colors.primaryHover,
      scale: 1.02,
    },
    
  },
  buttonLabelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 !important',
    maxWidth: '-webkit-fill-available',
    fallbacks: [{ maxWidth: '-moz-available' }, { maxWidth: 'fill-available' }],
  },
  buttonLabel: {
    fontFamily: theme.fonts.Everett.Regular,
    width: 'unset !important'
  }

}));
