import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: { color: theme.colors.white },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '68px',
  },
  pitchesBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    [MAX_WIDTH_1239]: {
      width: '50%',
      flexWrap: 'wrap',
      marginInline: 'auto',
    },
    [MAX_WIDTH_767]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
}));
