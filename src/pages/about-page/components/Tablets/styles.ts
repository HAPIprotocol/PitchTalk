import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  screensContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: '21px',
    [MAX_WIDTH_1439]: { gap: '16px' },
    [MAX_WIDTH_1239]: { gap: '12px' },
    [MAX_WIDTH_767]: { height: '540px' },
  },
  // SCREEN LEFT
  screenLeft: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: '56px',
    padding: '81px 34px 32px 49px',
    [MAX_WIDTH_1439]: { padding: '62px 26px 24px 38px', columnGap: '43px' },
    [MAX_WIDTH_1239]: { padding: '46px 20px 18px 27px', columnGap: '32px' },
    [MAX_WIDTH_767]: {
      transform: 'rotate(-270deg)',
      padding: '26px 10px 6px 18px',
      flexDirection: 'column',
      rowGap: '21px',
      maxWidth: '300px',
      maxHeight: '300px',
    },
  },
  screenLeftContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    [MAX_WIDTH_1439]: { gap: '17px' },
    [MAX_WIDTH_1239]: { gap: '12px' },
  },
  screenLeftTextContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.colors.white,

    [MAX_WIDTH_1439]: { maxWidth: '269px' },
    [MAX_WIDTH_767]: { maxWidth: '200px' },
  },
  contentTitle: {
    marginBlock: '0px 14px',
    fontSize: '2.724rem',
    [MAX_WIDTH_1439]: {
      marginBlock: '0px 10px',
      fontSize: '2.103rem',
    },
    [MAX_WIDTH_1239]: {
      marginBlock: '0px 8px',
      fontSize: '1.54rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.455rem',
      fontWeight: 500,
    },
  },
  contentSubTitle: {
    marginBlock: '0px 49px',
    fontSize: '1.135rem',
    [MAX_WIDTH_1439]: {
      marginBlock: '0px 37px',
      fontSize: '0.876rem',
    },
    [MAX_WIDTH_1239]: {
      marginBlock: '0px 28px',
      fontSize: '0.642rem',
    },
    [MAX_WIDTH_767]: {
      marginBlock: '0px 21px',
      fontSize: '0.648rem',
      fontWeight: 500,
    },
  },
  contentText: {
    margin: 0,
    fontSize: '0.875rem',
    [MAX_WIDTH_1439]: {
      fontSize: '0.676rem',
      lineHeight: '1.061rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.495rem',
      lineHeight: '0.778rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.5rem',
      lineHeight: '0.785rem',
      fontWeight: 500,
    },
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '184px',
    [MAX_WIDTH_1439]: { width: '142px' },
    [MAX_WIDTH_1239]: { width: '104px' },
    [MAX_WIDTH_767]: { width: 'unset' },
  },
  socialLink: {
    margin: '0 10px',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    '&:last-child': { marginRight: 0 },
    '&:first-child': { marginLeft: 0 },
    '&:hover': {
      '& path': { fill: theme.colors.secondaryDark },
    },
    [MAX_WIDTH_1239]: { width: '15px', height: '15px', margin: '0 5px' },
    [MAX_WIDTH_767]: { margin: '0 7px', width: '18px', height: '18px' },
  },
  playButton: {
    '& svg': {
      width: '115px',
      height: '115px',
      [MAX_WIDTH_1439]: { width: '88px', height: '88px' },
      [MAX_WIDTH_1239]: { width: '65px', height: '65px' },
      [MAX_WIDTH_767]: { width: '83px', height: '83px' },
    },
    [MAX_WIDTH_767]: { width: '83px', height: '83px' },
  },
  tabletWrapper: {
    [MAX_WIDTH_767]: {
      position: 'absolute',
      bottom: '-40px',
      left: '-25px',
      '&.left': { top: '74px', left: 'auto', position: 'absolute' },
    },
  },
  bgContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '-1',
    [MAX_WIDTH_767]: { top: '39px', left: '-37.5px' },
  },
  bgImg: {
    position: 'absolute',
    zIndex: '1',
    [MAX_WIDTH_1439]: { width: '466px', height: '352px' },
    [MAX_WIDTH_1239]: { width: '336px', height: '255px' },
    [MAX_WIDTH_767]: {
      width: '303px',
      height: '223px',
      transform: 'rotate(-90deg)',
    },
  },
  bgIcon: {
    position: 'absolute',
    zIndex: '0',
    [MAX_WIDTH_1439]: { width: '466px', height: '352px' },
    [MAX_WIDTH_1239]: { width: '336px', height: '255px' },
    [MAX_WIDTH_767]: {
      width: '303px',
      height: '223px',
      transform: 'rotate(-90deg)',
    },
  },
}));
