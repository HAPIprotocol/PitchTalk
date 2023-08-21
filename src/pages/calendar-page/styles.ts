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
    position: 'relative',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    padding: '80px 150px',
    [MAX_WIDTH_1439]: {
      padding: '80px 118px',
    },
    [MAX_WIDTH_1239]: {
      padding: '60px 40px',
    },
    [MAX_WIDTH_767]: {
      padding: '50px 20px 30px',
    },
    [MAX_WIDTH_767]: {
      padding: '40px',
      maxHeight: 'calc(100vh - 208px)',
      overflow: 'auto',
    },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: '1136px',
    zIndex: 1,
    [MAX_WIDTH_767]: {
      width: '100%',
    },
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.white,
    marginBottom: 36,
    maxHeight: 40,
    [MAX_WIDTH_767]: {
      flexWrap: 'wrap',
      rowGap: '12px',
    },
  },
  scrollArrows: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    '& svg': {
      cursor: 'pointer',
      marginLeft: '24px',
    },
    [MAX_WIDTH_767]: {
      '& svg': {
        width: '14px',
        height: '14px',
        marginLeft: '8px',
      },
    },
  },
  monthSelect: {
    display: 'flex',
    alignItems: 'center',
    [MAX_WIDTH_767]: {
      marginLeft: 0,
      marginRight: '10px',
      flexGrow: 2,
    },
  },
  monthSelectValue: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
  },
  monthSelectToggle: {
    backgroundColor: theme.colors.grey,
    border: 'none',
    padding: 'unset',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '12px',
    borderRadius: '50%',
  },
  monthSelectIconRotate: {
    transform: 'rotate(180deg)',
  },
  calendarViewToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',
    padding: '6px',
    width: '250px',
    height: '51px',
    marginRight: '54px',
    [MAX_WIDTH_1239]: {
      padding: '4px',
      width: '159px',
      height: '32px',
      marginRight: '34px',
    },
    [MAX_WIDTH_767]: {
      display: 'none',
    },
  },
  calendarViewToggleButton: {
    color: theme.colors.white,
    backgroundColor: theme.colors.lightDark,
    outline: 'none',
    borderRadius: '3px',
    fontFamily: theme.fonts.Everett.Regular,
    border: ['1px', 'solid', theme.colors.lightDark],
    cursor: 'pointer',
    fontSize: '0.875rem',
    lineHeight: '1.05rem',
    letterSpacing: '0.0175em',
    width: '119px',
    height: '39px',
    '&:disabled': {
      color: theme.colors.white,
      backgroundColor: theme.colors.lightGrey,
      pointerEvents: 'none',
    },
    '&:not(disabled):hover': {
      borderColor: theme.colors.lightGrey,
    },
    '&:first-child': {
      marginRight: '6px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.45rem',
      lineHeight: '0.55rem',
      width: '76px',
      height: '25px',
    },
  },
  allEventsLink: {
    justifySelf: 'flex-end',
    margin: '0 0 0 auto',
    fontSize: '0.875rem',
    lineHeight: '1.05rem',
    color: theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Regular,
    [MAX_WIDTH_1239]: {
      fontSize: '0.75rem',
      lineHeight: '0.9rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
      lineHeight: '0.8rem',
      marginLeft: 12
    },
  },
  hideDaysContainer: {
    display: 'flex',
    alignItems: 'center',
    [MAX_WIDTH_767]: {
      flexGrow: 1,
    },
  },
  hideDaysText: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '0.875rem',
    color: theme.colors.grey,
    margin: '0 8px',
    [MAX_WIDTH_1239]: {
      fontSize: '0.75rem',
      lineHeight: '0.9rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
      lineHeight: '0.8rem',
    },
  },
}));
