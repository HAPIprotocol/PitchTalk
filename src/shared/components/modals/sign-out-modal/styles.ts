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
  account: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.625rem',
    color: theme.colors.white,
    marginBottom: '32px',
    textAlign: 'center',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  button: {
    '& button': {
      textTransform: 'uppercase',
      width: '100%',
      fontSize: '1.125rem',
      height: '42px',
    },
  },
}));
