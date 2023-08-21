import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `1px solid ${theme.colors.secondaryDark}`,
    width: '120px',
    height: '120px',
    padding: '5px',
  },
  logo: {
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    borderRadius: '50%',
    objectFit: 'contain',
    backgroundColor: theme.colors.lightDark,
  },
}));
