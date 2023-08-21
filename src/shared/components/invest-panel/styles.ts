import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  actionButtons: {
    display: 'flex',
    justifyContent: 'stretch',
    borderTop: ['1px', 'solid', theme.colors.lightGrey],
    [MAX_WIDTH_767]: {
      padding: 0,
    },
    width: '100%',
    zIndex: 3,
    color: theme.colors.grey,
    fontFamily: theme.fonts.Everett.Regular,
  },
  investInfoWrapper: {
    display: 'flex',
    margin: '9px 10px',
    width: '386px',
    height: '130px',
    [MAX_WIDTH_1439]: {
      width: '351px',
      height: '118px',
      margin: '8px 8px',
    },
    [MAX_WIDTH_1239]: {
      width: '260px',
      margin: '5px 6px',
      flexDirection: 'column',
    },
    [MAX_WIDTH_767]: {
      width: '109px',
      height: '82px',
      margin: '4px 2px',
    },
  },
  currencyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: ['1px', 'solid', theme.colors.lightGrey],
    paddingRight: '17px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRight: 0,
      borderBottom: ['1px', 'solid', theme.colors.lightGrey],
      marginBottom: '8px',
      paddingBottom: '4px',
      paddingRight: '0px',
    },
  },
  currencyLabel: {
    fontSize: '0.75rem',
    lineHeight: '140%',
    marginBottom: '34px',
    [MAX_WIDTH_1439]: {
      marginBottom: '25px',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '0px',
    },
    [MAX_WIDTH_767]: {
      marginBottom: '0px',
      fontSize: '0.5rem',
    },
  },
  currencyInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.75rem',
    lineHeight: '140%',
    color: theme.colors.white,
    '& img': {
      width: '26px',
      height: '26px',
      marginRight: '6px',
    },
    [MAX_WIDTH_1439]: {
      fontSize: '1.5rem',
      '& img': {
        width: '23px',
        height: '23px',
        marginRight: '5px',
      },
    },
    [MAX_WIDTH_1239]: {
      fontSize: '1.375rem',
      '& img': {
        width: '17px',
        height: '17px',
        marginRight: '4px',
      },
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
      '& img': {
        width: '12px',
        height: '12px',
        marginRight: '2px',
      },
    },
  },
  totalInvestedWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    [MAX_WIDTH_1239]: {
      alignItems: 'flex-start',
    },
  },
  investInfo: {},
  investCurrency: {
    color: theme.colors.white,
    fontSize: '0.875rem',
    [MAX_WIDTH_767]: {
      fontSize: '0.5rem',
    },
  },
  convertedAmount: {
    color: theme.colors.lightGrey,
    fontSize: '0.75rem',
    lineHeight: '140%',
    textShadow: `0px 4px 4px ${theme.colors.convertedAmountShadow}`,
    [MAX_WIDTH_767]: {
      fontSize: '0.425rem',
    },
  },
  actionButton: {
    padding: '9px',
    zIndex: 3,
    '& label': {
      color: theme.colors.lightGrey,
    },
    '&:first-child': {
      borderRight: ['1px', 'solid', theme.colors.grey],
    },
    [MAX_WIDTH_1439]: {
      padding: '8px',
    },
    [MAX_WIDTH_1239]: {
      padding: '6px',
    },
    [MAX_WIDTH_767]: {
      padding: '3px',
    },
  },
  investAmount: {
    fontSize: '1.75rem',
    fontFamily: theme.fonts.Everett.Regular,
    lineHeight: '140%',
    color: theme.colors.white,
    minWidth: 48,
    [MAX_WIDTH_1439]: {
      fontSize: '1.5rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '1.375rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.125rem',
    },
  },
  button: {
    '& button': {
      width: '100%',
      background: theme.colors.secondaryDark,
      height: 56,
      fontSize: '1.125rem',
      color: theme.colors.white,
      [MAX_WIDTH_1439]: {
        height: 42,
      },
      [MAX_WIDTH_767]: {
        height: '21px',
        fontSize: '0.625rem',
      },

      filter: 'drop-shadow(0, 4, 4, #000000)',

      '&:hover': {
        backgroundColor: theme.colors.secondaryDarkHover,
      },

      '&:disabled': {
        color: theme.colors.black,
        backgroundColor: theme.colors.grey,
      },
    },
  },
}));
