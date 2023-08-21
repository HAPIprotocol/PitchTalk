import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  showLive: {
    marginLeft: '15px',
    minHeight: '37px',
    maxHeight: '37px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',

    [MAX_WIDTH_1439]: {
      maxHeight: '32px',
      minHeight: '32px',
      marginLeft: '12px',
    },
    [MAX_WIDTH_1239]: {
      maxHeight: '23px',
      minHeight: '23px',
      marginLeft: '8px',
    },
    [MAX_WIDTH_767]: {
      marginLeft: '4px',
    },
  },
  liveIcon: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 14px',
    '& svg': {
      width: '33px',
      height: '24px',
    },
    [MAX_WIDTH_1439]: {
      '& svg': {
        width: '30px',
        height: '22px',
      },
    },
    [MAX_WIDTH_1239]: {
      '& svg': {
        width: '17px',
        height: '13px',
      },
    },
    [MAX_WIDTH_767]: {
      padding: '0 7px',
      '& svg': {
        width: '20px',
        height: '14px',
      },
    },
  },
  label: {
    backgroundColor: theme.colors.secondaryDark,
    padding: '0px 21px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    borderRadius: '3px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.875rem',
      padding: '0px 18px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.625rem',
      padding: '0px 12px',
    },
    [MAX_WIDTH_767]: {
      display: 'none',
    },
  },
  watchNow: {
    paddingRight: 21,
    textTransform: 'uppercase',
    [MAX_WIDTH_1439]: {
      paddingRight: 18,
    },
    [MAX_WIDTH_1239]: {
      paddingRight: 12,
    },
    [MAX_WIDTH_767]: {
      display: 'none',
    },
  },
}));
