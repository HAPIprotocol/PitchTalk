import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    background: theme.colors.lightDark,
    borderRadius: '2px',
    '& svg': {
      width: '20px',
      height: '20px',
      '& path': {
        fill: theme.colors.white,
      },
    },
  },
  title: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '0.875rem',
    lineHeight: '1.063rem',
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
}));
