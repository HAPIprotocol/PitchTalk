import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { isUpdated: boolean; isFailed: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  blurContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxWidth: '75%',
    rowGap: '25px',
    [MAX_WIDTH_767]: {
      rowGap: '12px',
    },
  },
  rejectBlurOverlay: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(16px)',
  },
  rejectInfoText: {
    fontSize: '1.25rem',
    color: theme.colors.white,
    padding: '0 15px',
    textAlign: 'center',
    [MAX_WIDTH_1239]: {
      fontSize: '1rem',
      padding: '0 10px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.85rem',
      padding: '0 5px',
    },
  },
  rejectInfoCloseIcon: {
    position: 'absolute',
    top: '15%',
    right: '15%',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    [MAX_WIDTH_767]: {
      top: '15%',
      right: '15%',
      width: '16px',
      height: '16px',
    },
  },
}));
