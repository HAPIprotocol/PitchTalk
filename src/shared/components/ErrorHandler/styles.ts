import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  error: {
    color: theme.colors.errorRed,
    fontSize: '12px',
    fontWeight: 400,
    fontFamily: theme.fonts.Everett.Regular,
    marginTop: '10px',
    display: 'block',
  },
}));
