import { createUseStyles } from 'react-jss';

import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    position: 'relative',
    color: theme.colors.white,
    width: '100%',
    maxWidth: 1000,
    marginBottom: '100px',
    [MAX_WIDTH_1439]: {
      maxWidth: 800,
    },
    [MAX_WIDTH_1239]: {
      maxWidth: 700,
      marginBlock: '30px 75px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: 500,
      paddingInline: '50px',
      marginBlock: '30px 50px',
    },
  },
  pageHeader: {
    ...textWithGradient,
    fontSize: '3rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    [MAX_WIDTH_1439]: { fontSize: '2.75rem' },
    [MAX_WIDTH_1239]: { fontSize: '2.5rem' },
    [MAX_WIDTH_767]: { fontSize: '2.25rem' },
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '10px',
    },
  },
  ratingTable: { width: '100%' },
  ratingTableHead: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    fontSize: '1.7rem',
    paddingBlock: '25px',
    [MAX_WIDTH_1439]: { fontSize: '1.6rem', paddingBlock: '22.5px' },
    [MAX_WIDTH_1239]: { fontSize: '1.45rem', paddingBlock: '20px' },
    [MAX_WIDTH_767]: { fontSize: '1.4rem', paddingBlock: '17.5px' },
  },
  ratingTableHeadItems: {
    textAlign: 'center',
    width: '70%',
    ...textWithGradient,
  },
  ratingTableHeadAmounts: {
    textAlign: 'center',
    width: '30%',
    ...textWithGradient,
  },
  ratingTableBody: {},
  viewToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.lightDark,
    borderRadius: '3px',
    padding: '6px',
    width: '350px',
    height: '46px',
    [MAX_WIDTH_1439]: {
      padding: '4px',
      width: '300px',
      height: '40px',
    },
    [MAX_WIDTH_1239]: {
      padding: '4px',
      width: '250px',
      height: '36px',
    },
    [MAX_WIDTH_767]: {
      padding: '4px',
      width: '100%',
      maxWidth: '300px',
      height: '32px',
    },
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
    width: '100%',
    height: '100%',
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
      fontSize: '0.675rem',
      lineHeight: '0.85rem',
    },
  },
  viewToggleTokens: {
    composes: '$viewToggle',
    width: '200px',
    [MAX_WIDTH_1239]: { width: '175px' },
  },
  emptyTable: {
    ...textWithGradient,
    fontSize: '2.5rem',
    textAlign: 'center',
    [MAX_WIDTH_1439]: { fontSize: '2.5rem' },
    [MAX_WIDTH_1239]: { fontSize: '2.25rem' },
    [MAX_WIDTH_767]: { fontSize: '2rem' },
  },
  redirectBtnContainer: {
    position: 'absolute',
    right: 0,
    [MAX_WIDTH_767]: {
      right: 50,
    },
  },
  redirectButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1.15rem',
    textTransform: 'uppercase',
    color: theme.colors.primary,
    cursor: 'pointer',
    '&:hover, &:active': { textDecoration: 'underline' },
    '& svg': {
      width: '20px',
      height: '20px',
      '& path': { fill: theme.colors.primary },
    },
    [MAX_WIDTH_1239]: { fontSize: '1rem' },
    [MAX_WIDTH_767]: { fontSize: '0.9rem' },
  },
}));
