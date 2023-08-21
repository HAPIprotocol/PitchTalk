import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  investments: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  verticalLine: {
    width: '0px',
    borderRight: ['1px', 'solid', theme.colors.borderGray],
  },
  donationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 2,
    margin: '48px 91px 52px 91px',
    height: '220px',
    '& span': {
      width: '163px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      [MAX_WIDTH_1439]: {
        width: '152px',
      },
      [MAX_WIDTH_1239]: {
        width: '155px',
      },
      [MAX_WIDTH_767]: {
        width: '126px',
      },
    },
    [MAX_WIDTH_1439]: {
      width: '152px',
      height: '204px',
      margin: '44px 84px 48px 84px',
    },
    [MAX_WIDTH_1239]: {
      width: '155px',
      height: '210px',
      margin: '71px 88px 79px 88px',
    },
    [MAX_WIDTH_767]: {
      width: '126px',
      height: '170px',
      margin: '21px 12px 24px 0px',
    },
  },
  investmentContainer: {
    composes: '$donationContainer',
    [MAX_WIDTH_767]: {
      margin: '21px 0px 24px 12px',
    },
  },

  investment: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  arrowIcon: {
    alignSelf: 'center',
    height: 15,
    width: 15,
    marginLeft: '8px',
  },
  investmentTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    marginBottom: '11px',
    color: theme.colors.lightGrey,
    justifyContent: 'space-between',
    display: 'inline-flex',
    [MAX_WIDTH_1439]: {
      fontSize: '0.875rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
    },
  },
  investmentAmount: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    marginBottom: '5px',
    [MAX_WIDTH_1439]: {
      fontSize: '1.125rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.875rem',
    },
  },
  amount: {
    color: theme.colors.white,
    marginBottom: '6px',
    [MAX_WIDTH_1239]: {
      marginBottom: '3px',
    },
  },
  tokenInfo: {
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.colors.lightGrey,
    fontSize: '1rem',
    '& img': {
      width: '16px',
      height: '16px',
      marginRight: '8px',
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.95rem',
      '& img': { width: '15px', height: '15px', marginRight: '7px' },
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.875rem',
      '& img': { width: '14px', height: '14px', marginRight: '6px' },
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
      '& img': { width: '12px', height: '12px', marginRight: '5px' },
    },
  },
  investmentAmountUSN: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    color: theme.colors.lightGrey,
    marginBottom: '24px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.625rem',
    },
  },
  buttonStyles: {
    width: '100%',

    '& button': {
      width: '100%',
      height: '49px',
      [MAX_WIDTH_1439]: {
        fontSize: '0.85rem',
        height: '48px',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.85rem',
        height: '47px',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.725rem',
        height: '38px',
      },
    },
  },
  investmentToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    color: theme.colors.white,
    borderRadius: '3px',
    padding: '3px',
    zIndex: 2,
    marginBottom: '28px',
    alignSelf: 'flex-start',
    width: '154px',
    height: '31px',
    '& button': {
      width: '74px',
      backgroundColor: theme.colors.lightDark,
      borderColor: theme.colors.lightDark,
      color: theme.colors.white,
      '&:disabled': {
        backgroundColor: theme.colors.lightGrey,
        color: theme.colors.white,
      },
    },
    [MAX_WIDTH_1439]: {
      width: '143px',
      height: '29px',
      marginBottom: '26px',
    },
    [MAX_WIDTH_1239]: {
      width: '147px',
      height: '30px',
    },
    [MAX_WIDTH_767]: {
      width: '119px',
      height: '24px',
      marginBottom: '21px',
    },
  },

  investmentToggleButton: {
    color: theme.colors.grey,
    backgroundColor: theme.colors.disabledGrey,
    outline: 'none',
    borderRadius: '3px',
    padding: '5px 11px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.6rem',
    lineHeight: '10px',
    border: ['1px', 'solid', theme.colors.disabledGrey],
    letterSpacing: '0.0175em',
    marginLeft: '6px',
    cursor: 'pointer',
    '&:first-child': {
      marginLeft: '0',
    },
    '&:disabled': {
      color: theme.colors.disabledGrey,
      backgroundColor: theme.colors.grey,
      pointerEvents: 'none',
    },
    '&:not(disabled):hover': {
      borderColor: theme.colors.grey,
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.5rem',
      lineHeight: '10px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.425rem',
      lineHeight: '8px',
    },
  },
}));
