import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    color: theme.colors.white,
    marginBottom: '32px',
    textAlign: 'center',
  },
  button: {
    '& button': {
      width: '100%',
      fontSize: '1.125rem',
      height: '42px',
    },
  },
  closeButton: {
    composes: '$button',
    '& button': {
      borderColor: theme.colors.declinedColor,
      background: theme.colors.declinedColor,
      '&:hover': {
        background: theme.colors.white,
        color: theme.colors.declinedColor
      },
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px'
  }
}));
