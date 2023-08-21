import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  claimWrapper: {
    marginLeft: '91px',
    marginBottom: '40px',
    [MAX_WIDTH_1439]: {
      marginInline: '86px',
      marginBottom: '36px',
    },
    [MAX_WIDTH_1239]: {
      marginInline: '85px',
      marginBottom: '77px',
    },
    [MAX_WIDTH_767]: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  claimInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.fonts.Everett.Regular,
    fontStyle: 'normal',
    lineHeight: '130%',
    fontWeight: 400,
    marginBottom: '9px',
    '& label': {
      fontSize: '0.875rem',
      color: theme.colors.lightGrey,
      marginBottom: '2px',
      [MAX_WIDTH_767]: { fontSize: '0.75rem' },
    },
    '& span': {
      fontSize: '1rem',
      color: '#FFFFFF',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      [MAX_WIDTH_767]: { fontSize: '0.875rem' },
    },
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '90px',
      height: 'fit-content',
      width: 'fit-content',
      '&:not(:last-child)': {
        marginRight: '21px',
        paddingRight: '19px',
        borderRight: ['1px', 'solid', theme.colors.borderGray],
      },
    },
    [MAX_WIDTH_1239]: {
      justifyContent: 'space-between',
      '& label': { fontSize: '0.875rem', lineHeight: '1.145rem' },
      '& span': { fontSize: '0.98rem', lineHeight: '1.28rem' },
      '& > div:not(:last-child)': { borderRight: 'none !important' },
    },
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      marginBottom: '24px',
      '& label': { fontSize: '0.75rem', lineHeight: '0.975rem' },
      '& span': { fontSize: '0.625rem', lineHeight: '0.822rem' },
      '& > div': {
        alignItems: 'center',
        marginRight: '0px !important',
        paddingBottom: '14px',
        paddingRight: '0px !important',
        borderBottom: '1px solid white',
        '&:not(:first-child)': { marginTop: '11px' },
      },
    },
  },
  claimButton: {},
  controlsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    '& $claimButton button': {
      height: '42px',
      width: 'fit-content',
      [MAX_WIDTH_1439]: { width: '205px', height: '41px' },
      [MAX_WIDTH_1239]: {
        fontSize: '1.125rem',
        lineHeight: '1.375rem',
        width: '492px',
        height: '64px',
      },
      [MAX_WIDTH_767]: { fontSize: '0.74rem', width: '205px', height: '41px' },
    },
    '& div': { margin: '0px 0px 14px' },
    [MAX_WIDTH_1239]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    [MAX_WIDTH_767]: {
      display: 'block',
    },
  },
  nextUnlock: {
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      fontSize: '14px',
      color: theme.colors.lightGrey,
      marginBottom: '1px',
      fontFamily: theme.fonts.Everett.Regular,
      fontStyle: 'normal',
      lineHeight: '130%',
      fontWeight: '400px',
    },
    '& span': {
      fontSize: '16px',
      color: theme.colors.white,
    },
    [MAX_WIDTH_1439]: {
      '& label': { fontSize: '0.625rem', lineHeight: '0.815rem' },
      '& span': { fontSize: '0.815rem', lineHeight: '1.05rem' },
    },
    [MAX_WIDTH_1239]: {
      alignItems: 'center',
      '& label': { fontSize: '0.875rem', lineHeight: '1.125rem' },
      '& span': { fontSize: '1.125rem', lineHeight: '1.5rem' },
    },
    [MAX_WIDTH_767]: {
      '& label': {
        fontSize: '0.76rem',
        lineHeight: '1rem',
        textAlign: 'center',
      },
      '& span': { fontSize: '1rem', lineHeight: '1.3rem' },
    },
  },
}));
