import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(
  (theme: IAppTheme) => ({
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '36px',

      marginBottom: '24px',
    },
    socialLink: {
      cursor: 'pointer',
      '& path': { fill: theme.colors.white },
    },
  })
);
