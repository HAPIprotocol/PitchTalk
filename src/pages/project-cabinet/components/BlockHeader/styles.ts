import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '62px',
    [MAX_WIDTH_1439]: { marginBottom: '52px' },
    [MAX_WIDTH_1239]: { marginBottom: '45px' },
    [MAX_WIDTH_767]: { marginBottom: '40px' },
  },
  headerIntro: {
    textTransform: 'uppercase',
    fontSize: '1.965rem',
    lineHeight: '2.355rem',
    [MAX_WIDTH_1439]: { fontSize: '1.59rem', lineHeight: '1.9rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.3rem', lineHeight: '1.4rem' },
    [MAX_WIDTH_767]: { fontSize: '1.15rem', lineHeight: '1.3rem' },
  },
  line: {
    borderWidth: '0.25px',
    borderStyle: 'solid',
    borderColor: theme.colors.white,
    marginInline: '35px',
    flex: 1,
    [MAX_WIDTH_1439]: { marginInline: '27px' },
    [MAX_WIDTH_1239]: { marginInline: '22px' },
    [MAX_WIDTH_767]: { marginInline: '15px' },
  },
  viewToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',
    padding: '6px',
    width: '250px',
    height: '51px',
    [MAX_WIDTH_1439]: { padding: '4px', width: '202px', height: '41px' },
    [MAX_WIDTH_1239]: { padding: '4px', width: 'unset', height: '37px' },
    [MAX_WIDTH_767]: { padding: '2px', height: '29px' },
  },
  viewToggleButton: {
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
    [MAX_WIDTH_1439]: {
      fontSize: '0.71rem',
      lineHeight: '0.85rem',
      width: '96px',
      height: '31px',
      '&:first-child': {
        marginRight: '6px',
      },
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.61rem',
      lineHeight: '0.75rem',
      width: '76px',
      height: '27px',
      '&:first-child': {
        marginRight: '6px',
      },
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.51rem',
      lineHeight: '0.65rem',
      width: '56px',
      height: '23px',
      '&:first-child': {
        marginRight: '6px',
      },
    },
  },
}));
