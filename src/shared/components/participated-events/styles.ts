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
    width: '100%',
    alignItems: 'flex-start',
    overflowX: 'auto',
    overflowY: 'hidden',
    marginBottom: '112px',
    paddingBottom: '28px',
    [MAX_WIDTH_1439]: {
      paddingBottom: '40px',
      marginBottom: '98px',
    },
    [MAX_WIDTH_1239]: {
      paddingBottom: '27px',
      marginBottom: '60px',
    },
    [MAX_WIDTH_767]: {
      padding: '16px 0',
      marginBottom: '45px',
      '&::-webkit-scrollbar': {
        width: '1px',
        height: '1px',
      },
    },
  },
  noEventsContainer: {
    width: '80%',
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '1.2rem',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    marginBottom: '80px',
    borderTop: ['1px', 'solid', theme.colors.lightGrey],
    borderBottom: ['1px', 'solid', theme.colors.lightGrey],
    paddingTop: '20px',
    paddingBottom: '20px',
    '& a': {
      color: theme.colors.secondaryDark,
    },
    [MAX_WIDTH_1439]: {
      marginBottom: '70px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '1rem',
      marginBottom: '40px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.8rem',
      marginBottom: '50px',
    },
  },
  togglePanelWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '48px',
    [MAX_WIDTH_1439]: {
      marginBottom: '38px',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '25px',
    },
    [MAX_WIDTH_767]: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '22px',
    },
    '& a': {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
      color: theme.colors.secondaryDark,
      [MAX_WIDTH_1439]: {
        fontSize: '0.75rem',
        lineHeight: '0.875rem',
      },
    },
  },
  investmentToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    color: theme.colors.white,
    borderRadius: '3px',
    padding: '6px',
    width: '235px',
    height: '51px',
    [MAX_WIDTH_1439]: {
      width: '205px',
      height: '44px',
    },
    [MAX_WIDTH_1239]: {
      width: '137px',
      height: '30px',
    },
    [MAX_WIDTH_767]: {
      width: '160px',
      height: '34px',
      marginBottom: '26px',
    },
  },
  investmentToggleButton: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    lineHeight: '1.05rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.lightDark,
    border: ['1px', 'solid', theme.colors.lightDark],
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    width: '119px',
    height: '39px',
    marginLeft: '6px',
    '&:first-child': {
      marginLeft: '0',
    },
    '&:disabled': {
      color: theme.colors.white,
      backgroundColor: theme.colors.lightGrey,
      pointerEvents: 'none',
    },
    '&:not(disabled):hover': {
      borderColor: theme.colors.lightGrey,
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
      width: '104px',
      height: '34px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.5rem',
      lineHeight: '0.625rem',
      width: '69px',
      height: '22px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
      lineHeight: '0.725rem',
      width: '81px',
      height: '26px',
    },
  },
}));
