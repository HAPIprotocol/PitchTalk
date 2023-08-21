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
    [MAX_WIDTH_767]: {
      width: '100%',
      maxWidth: '320px',
      marginInline: 'auto',
    },
  },
  eventsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    [MAX_WIDTH_767]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
