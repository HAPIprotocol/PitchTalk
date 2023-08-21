import { createUseStyles } from 'react-jss';

import {
  EDimensions,
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
    maxWidth: '1600px',
    flex: 1,
    alignItems: 'center',
    padding: '60px 155px',
    [MAX_WIDTH_1439]: {
      padding: '40px 118px 60px',
    },
    [MAX_WIDTH_1239]: {
      padding: '40px 86px 60px',
    },
    [MAX_WIDTH_767]: {
      padding: '24px 40px 32px',
    },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  pageHeading: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '40px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  eventsToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',
    padding: '6px',
    zIndex: 2,
    width: 'fit-content',
    [MAX_WIDTH_1439]: {
      padding: '5px',
    },
    [MAX_WIDTH_1239]: {
      padding: '4px',
    },
    [MAX_WIDTH_767]: {
      padding: '3px',
    },
  },

  eventsToggleButton: {
    color: theme.colors.white,
    backgroundColor: theme.colors.lightDark,
    outline: 'none',
    borderRadius: '3px',
    width: '119px',
    height: '39px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875em',
    border: ['1px', 'solid', theme.colors.lightDark],
    letterSpacing: '0.0175em',
    marginLeft: '6px',
    padding: '0px',
    cursor: 'pointer',
    '&:first-child': {
      marginLeft: '0',
    },
    '&:disabled': {
      backgroundColor: theme.colors.lightGrey,
      pointerEvents: 'none',
    },
    '&:not(disabled):hover': {
      borderColor: theme.colors.lightGrey,
    },
    [MAX_WIDTH_1439]: {
      width: '105px',
      height: '35px',
      fontSize: '0.75em',
    },
    [MAX_WIDTH_1239]: {
      width: '82px',
      height: '27px',
      fontSize: '0.625em',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.375rem',
      width: '52px',
      height: '17px',
    },
  },
  inputAndLiveContainer: {
    display: 'flex',
    [MAX_WIDTH_767]: {
      width: '100%',
      marginTop: '30px',
    },
  },

  pitchesList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    height: '95vh',
    ['@media (max-height: 700px)']: {
      height: '50vh',
    },
    '&.noEvents': {
      justifyContent: 'flex-start',
      height: 'auto',
    },
  },
  noEvents: {
    alignSelf: 'center',
    paddingTop: 40,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    animationName: '$load',
    animationDelay: '1s',
    animationDuration: '2s',
    animationFillMode: 'forwards',
    opacity: '0',
    [MAX_WIDTH_1439]: {
      fontSize: '1em',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.75em',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
    },
  },
  '@-webkit-keyframes load': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  '@keyframes load': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
}));
