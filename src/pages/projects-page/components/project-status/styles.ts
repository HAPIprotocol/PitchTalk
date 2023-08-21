import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1439, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  projectStatusContainer: { display: 'flex', alignItems: 'center' },
  projectStatus: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.775rem',
    lineHeight: '0.93rem',
    padding: '7px 17px',
    borderRadius: '2.65px',
    color: theme.colors.white,
    position: 'relative',
    cursor: 'pointer',
    [MAX_WIDTH_1439]: {
      fontSize: '0.69rem',
      lineHeight: '0.825rem',
      padding: '6px 15.7px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.45rem',
      lineHeight: '0.53rem',
      padding: '3px 9px',
    },
  },
  liveIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    left: '5px',
    paddingLeft: '5px',
    paddingRight: '10px',
    width: '45px',
    height: '29px',
    background: theme.colors.lightDark,
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    '& svg': {
      width: '24.42px',
      height: '17.98px',
    },
    [MAX_WIDTH_1439]: {
      width: '39.95px',
      height: '25.74px',
      '& svg': {
        width: '21.68px',
        height: '15.96px',
      },
    },
    [MAX_WIDTH_767]: {
      width: '28.5px',
      height: '18.36px',
      '& svg': {
        width: '15.46px',
        height: '11.39px',
      },
    },
  },
  SOON: { background: theme.colors.projectStatus.soon },
  LIVE: {
    background: theme.colors.projectStatus.live,
    padding: '5px 9px',
  },
  HOT: { background: theme.colors.projectStatus.hot },
  VESTING: { background: theme.colors.projectStatus.vesting },
  COMPLETED: {
    color: theme.colors.lightDark,
    background: theme.colors.projectStatus.completed,
  },
  NEW: {
    color: theme.colors.lightDark,
    background: theme.colors.projectStatus.new,
  },
}));
