import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  countDown: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '24px',
    [MAX_WIDTH_1439]: { gap: '20px' },
    [MAX_WIDTH_1239]: { gap: '16px' },
    [MAX_WIDTH_767]: { gap: '12px' },
  },
  countDownItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  countDownTime: {
    margin: 0,
    fontSize: '2.25rem',
    [MAX_WIDTH_1439]: { fontSize: '2rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.75rem' },
    [MAX_WIDTH_767]: { fontSize: '0.95rem' },
  },
  countDownTimeKey: {
    margin: 0,
    color: theme.colors.grey,
    fontSize: '0.875rem',
    [MAX_WIDTH_1439]: { fontSize: '0.8rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.7rem' },
    [MAX_WIDTH_767]: { fontSize: '0.6rem' },
  },
}));
