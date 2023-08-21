import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  titleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    [MAX_WIDTH_1439]: { gap: '22px' },
    [MAX_WIDTH_1239]: { gap: '20px' },
    [MAX_WIDTH_767]: { gap: '16px' },
  },
  title: {
    fontSize: '1.963rem',
    lineHeight: '2.355rem',
    letterSpacing: '0.02em',
    userSelect: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: theme.colors.white,
    margin: 0,
    [MAX_WIDTH_1239]: { fontSize: '1.3rem', lineHeight: '1.55rem' },
  },
  titleSplitter: {
    height: '0.5px',
    background: theme.colors.white,
    flex: 1,
  },
}));
