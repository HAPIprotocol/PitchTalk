import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '64px',
    marginBottom: '64px',
    [MAX_WIDTH_767]: {
      width: '100%',
      maxWidth: '320px',
      marginInline: 'auto',
    },
  },
  pitchesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '64px',
  },
}));
