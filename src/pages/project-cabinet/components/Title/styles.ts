import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    color: theme.colors.secondaryDark,
    textTransform: 'uppercase',
    '& h5': {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      margin: 0,
    },
    '& svg': {
      marginLeft: '14px',
      outline: 'none',
    },
    [MAX_WIDTH_1439]: {
      '& h5': {
        fontSize: '1.015rem',
        lineHeight: '1.215rem',
      },
      '& svg': { width: '14.5px', height: '14.5px', marginLeft: '11px' },
    },
  },
}));
