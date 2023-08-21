import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  claimAndVestingWrapper: {
    width: '100%',
    border: ['1px', 'solid', theme.colors.borderGray],
    borderTop: 'none',
    transition: 'all, .3s, ease-out-in',
    paddingTop: '36px',
    [MAX_WIDTH_767]: { border: 'none' },
  },
  toggleButtons: {
    color: theme.colors.white,
    backgroundColor: theme.colors.lightDark,
    outline: 'none',
    borderRadius: '3px',
    padding: '5px 7px',
    width: '79px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.6rem',
    lineHeight: '10px',
    border: ['1px', 'solid', theme.colors.lightDark],
    letterSpacing: '0.0175em',
    marginLeft: '6px',
    cursor: 'pointer',
    '&:first-child': { marginLeft: '0' },
    '&:disabled': {
      color: theme.colors.white,
      backgroundColor: theme.colors.lightGrey,
      pointerEvents: 'none',
    },
    '&:not(disabled):hover': { borderColor: theme.colors.lightGrey },
    [MAX_WIDTH_1439]: {
      fontSize: '0.5rem',
      lineHeight: '10px',
      padding: '5px 7px',
    },
    [MAX_WIDTH_767]: { fontSize: '0.425rem', lineHeight: '8px' },
  },
  toggleButtonsContainer: {
    position: 'relative',
    display: 'flex',
    padding: '3px',
    zIndex: 2,
    height: '31px',
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: '3px',
    margin: '0px 0px 36px 91px',
    backgroundColor: theme.colors.lightDark,
    width: 'fit-content',
    [MAX_WIDTH_1439]: {
      width: '143px',
      height: '29px',
      margin: '36px 0px 36px 83px',
    },
    [MAX_WIDTH_1239]: {
      width: '149px',
      height: '30px',
      margin: '56px auto 49px',
    },
    [MAX_WIDTH_767]: {
      width: '135px',
      height: '24px',
      margin: '40px auto 20px',
    },
  },
}));
