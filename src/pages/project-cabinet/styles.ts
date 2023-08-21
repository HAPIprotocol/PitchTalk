import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    width: '100%',
    height: '100%',
    padding: '100px 155px 90px',
    minHeight: '100vh',
    maxWidth: '1740px',
    [MAX_WIDTH_1439]: { padding: '100px 135px 90px' },
    [MAX_WIDTH_1239]: { padding: '90px 65px 90px' },
    [MAX_WIDTH_767]: { padding: '70px 45px 90px' },
  },
  blurText: {
    fontSize: '22px',
    color: theme.colors.white,
    padding: '0 30px',
    textAlign: 'center',
  },
  blurOverlay: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
