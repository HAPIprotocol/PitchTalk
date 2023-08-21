import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  balancesBox: {
    marginTop: '57px',
    [MAX_WIDTH_1439]: { marginTop: '47px' },
    [MAX_WIDTH_1239]: { marginTop: '40px' },
    [MAX_WIDTH_767]: {
      maxWidth: '427px',
      width: '300px',
      marginTop: '33px',
      marginInline: 'auto',
    },
  },
  balancesBoxSection: {
    marginBottom: '45px',
    [MAX_WIDTH_1439]: {
      marginBottom: '36px',
    },
  },
  grantsWrapper: {
    maxHeight: '130px',
    overflowY: 'auto',
    paddingLeft: '10px',
    direction: 'rtl',
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    direction: 'ltr',
    marginBottom: '16px',
    '&:last-child': { marginBottom: 'unset' },
  },
  switchControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '167px',
    lineHeight: '1.2rem',
    marginBottom: '22px',
    '& > span': { color: theme.colors.secondaryDark },
    [MAX_WIDTH_1439]: {
      width: '136px',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      marginBottom: '16px',
    },
  },
  withdrawBtn: {
    '& button': {
      width: '151px',
      height: '45px',
      fontSize: '0.81rem',
      lineHeight: '0.975rem',
      fontWeight: 400,
    },
    [MAX_WIDTH_1439]: {
      '& button': {
        width: '122px',
        height: '37px',
        fontSize: '0.66rem',
        lineHeight: '0.8rem',
      },
    },
    [MAX_WIDTH_1239]: {
      '& button': {
        width: '100px',
        height: '33px',
        fontSize: '0.6rem',
        lineHeight: '0.75rem',
      },
    },
    [MAX_WIDTH_767]: {
      '& button': {
        width: '85px',
        height: '30px',
        fontSize: '0.5rem',
        lineHeight: '0.7rem',
      },
    },
  },
  withdrawInfo: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.colors.white,
  },
  tokenAmount: {
    fontSize: '1.5rem',
    lineHeight: '1.8rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: { fontSize: '1.215rem', lineHeight: '1.46rem' },
  },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.18rem',
    lineHeight: '1.65rem',
    '& img': { width: '21px', height: '21px', marginLeft: '5px' },
    [MAX_WIDTH_1439]: {
      fontSize: '0.955rem',
      lineHeight: '1.34rem',
      '& img': { width: '18px', height: '18px' },
    },
  },
}));
