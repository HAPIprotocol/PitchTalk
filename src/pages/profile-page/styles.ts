import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    padding: '135px 115px 180px',
    [MAX_WIDTH_1439]: {
      padding: '40px 86px 60px',
    },
    [MAX_WIDTH_767]: {
      padding: '24px 40px 32px',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    maxWidth: '1204px',
    [MAX_WIDTH_1439]: {
      maxWidth: '1082px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '659px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '285px',
    },
  },
  content: {},
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0 50%',
    },
  },
  playerHolder: {
    border: '1px solid',
    borderColor: theme.colors.grey,
    borderRadius: '3px',
    alignSelf: 'center',
  },
  broadcastWrapper: {
    display: 'flex',
    width: '100%',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  broadcast: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    width: '850px',
    marginRight: '65px',
    [MAX_WIDTH_1439]: {
      width: '770px',
    },
    [MAX_WIDTH_1239]: {
      width: '558px',
      marginRight: '0px',
    },
    [MAX_WIDTH_767]: {
      width: '272px',
    },
  },
  announcementWrapper: {
    '& > div': {
      height: '492px',
      marginTop: '70px',
      [MAX_WIDTH_1239]: {
        margin: '36px 0px',
        height: 'unset',
        width: '558px',
      },
      [MAX_WIDTH_767]: {
        margin: '36px 0px',
        height: 'unset',
        width: '272px',
      },
    },
  },
  investPanel: {
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Regular,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '558px',
    height: '135px',
    border: ['1px', 'solid', theme.colors.grey],
    [MAX_WIDTH_767]: {
      width: '274px',
      height: '66px',
    },
  },
  verticalLine: {
    height: '100%',
    borderRight: ['1px', 'solid', theme.colors.grey],
    borderLeft: ['1px', 'solid', theme.colors.grey],
  },
  investBlock: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px',
    width: '278px',
    [MAX_WIDTH_767]: {
      padding: '3px',
      width: '133px',
    },
  },
  investInfo: {},
  investAmount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '26px',
    fontSize: '1.3rem',
    lineHeight: '1.8rem',
    [MAX_WIDTH_767]: {
      marginTop: '11px',
      fontSize: '0.75rem',
      lineHeight: '0.8rem',
      marginBottom: '2px',
    },
  },
  investCurrency: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    marginBottom: '22px',
    '& img': {
      width: '11px',
      height: '11px',
      marginRight: '5px',
      [MAX_WIDTH_767]: {
        width: '8px',
        height: '8px',
        marginRight: '2px',
      },
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.45rem',
      marginBottom: '10px',
    },
  },
  button: {
    '& button': {
      width: '100%',
      [MAX_WIDTH_767]: {
        height: '15px',
        fontSize: '0.35rem',
      },
    },
  },
}));
