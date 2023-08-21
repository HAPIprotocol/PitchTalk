import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: '22px',
    '&.noEvents': { justifyContent: 'flex-start', height: 'auto' },
    [MAX_WIDTH_1239]: { gap: '16px' },
    [MAX_WIDTH_767]: { gap: '12px' },
  },
  noEvents: {
    alignSelf: 'center',
    paddingBottom: 40,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    animationName: '$load',
    animationDelay: '1s',
    animationDuration: '2s',
    animationFillMode: 'forwards',
    opacity: '0',
    [MAX_WIDTH_1439]: { fontSize: '1em' },
    [MAX_WIDTH_1239]: { fontSize: '0.75em' },
    [MAX_WIDTH_767]: { fontSize: '0.625rem' },
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
  eventsViewToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',
    padding: '6px',
    width: '280px',
    height: '51px',
    marginRight: '54px',
    [MAX_WIDTH_1239]: {
      padding: '4px',
      width: '180px',
      height: '32px',
      marginRight: '34px',
    },
  },
  eventsToggleButton: {
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
    width: '122px',
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
      width: '84px',
      height: '25px',
    },
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '300px',
    minWidth: '240px',
    [MAX_WIDTH_1239]: {
      width: '100%',
      minWidth: '240px',
    },
    [MAX_WIDTH_767]: {
      justifyContent: 'unset',
      '& > div': { width: '100%' },
      minWidth: 'unset'
    },
  },
  panel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));
