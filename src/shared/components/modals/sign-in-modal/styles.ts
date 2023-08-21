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
}));
