import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  Record<string, string>,
  IAppTheme
>(() => ({
  partnersContainer: {
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: 'repeat(3, auto)',
    width: '970px',

    gap: '48px 119px',
    [MAX_WIDTH_1239]: {
      width: 'unset',
      gap: '25px 75px',
    },
    [MAX_WIDTH_767]: {
      gridTemplateColumns: 'repeat(2, auto)',
      gap: '25px 60px',
    },
  },
  partnerImage: {
    width: 240,
    height: 72,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [MAX_WIDTH_1439]: { width: 220, height: 62 },
    [MAX_WIDTH_1239]: { width: 120, height: 60 },
  },
}));
