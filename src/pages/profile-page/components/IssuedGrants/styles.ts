import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767, MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  grantsTableWrapper: {
    width: '100%',
    maxHeight: '516px',
    border: ['1px', 'solid', theme.colors.lightGrey],
    // borderTop: 'none',
    marginBottom: '72px',
    padding: '30px 90px',
    [MAX_WIDTH_1239]: {
      width: '100%',
      padding: '30px',
      marginBottom: '40px',
    },
    [MAX_WIDTH_767]: {
      padding: '0',
      maxWidth: '280px',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: ['1px', 'solid', theme.colors.lightGrey],
      borderBottom: ['1px', 'solid', theme.colors.lightGrey],
    },
  },
  grantsTableHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > span': {
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '1.25rem',
      lineHeight: '1.25rem',
    },
    '& button': {
      width: '163px',
      height: '49px',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
    },
    [MAX_WIDTH_1439]: {
      '& > span': { fontSize: '1.09rem', lineHeight: '1.09rem' },
      '& button': {
        width: '112px',
        height: '34px',
        fontSize: '0.6rem',
        lineHeight: '0.72rem',
      },
    },
    [MAX_WIDTH_1239]: {
      '& button': {
        width: '166px',
        height: '47px',
        fontSize: '0.89rem',
        lineHeight: '1.07rem',
      },
    },
    [MAX_WIDTH_767]: {
      margin: '22px 0px',
      '& > span': { fontSize: '0.85rem', lineHeight: '0.85rem' },
      '& button': {
        width: '100px',
        height: '30px',
        fontSize: '0.55rem',
        lineHeight: '0.65rem',
      },
    },
  },
  grantsTableBody: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateRows: '1fr',
    overflowY: 'auto',
    margin: 0,
    padding: 0,
    maxHeight: '400px',
    [MAX_WIDTH_767]: {
      gridTemplateColumns: '1fr 1fr',
      gap: '20px 40px',
      overflowX: 'hidden',
      maxHeight: '340px',
      marginBottom: '22px',
    },
  },
  grantItem: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Regular,
    padding: '24px 32px 24px 20px',
    fontSize: '0.75rem',
    lineHeight: '0.975rem',
    '&:not(:last-child)': {
      borderBottom: ['1px', 'solid', theme.colors.lightGrey],
    },
    [MAX_WIDTH_1439]: {
      padding: '21px 17px',
      fontSize: '0.65rem',
      lineHeight: '0.85rem',
    },
    [MAX_WIDTH_1239]: {
      padding: '34px',
      fontSize: '1.06rem',
      lineHeight: '1.375rem',
    },
    [MAX_WIDTH_767]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      minWidth: '120px',
      maxWidth: '120px',
      height: '100px',
      padding: '0px',
      justifyContent: 'center',
      fontSize: '0.74rem',
      lineHeight: '0.965rem',
      '&:not(:last-child)': { borderBottom: '0px' },
      '& span': { textAlign: 'left' },
    },
  },
  grantCompany: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Regular,
    textDecoration: 'none',
    paddingRight: '5px',
    '& img': { maxWidth: '25px', maxHeight: '25px', marginRight: '7px' },
    '& span': {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
    },
    [MAX_WIDTH_1439]: {
      '& img': { maxWidth: '23px', maxHeight: '23px' },
    },
    [MAX_WIDTH_1239]: {
      '& img': { maxWidth: '35px', maxHeight: '35px', marginRight: '12px' },
    },
    [MAX_WIDTH_767]: {
      '& img': { maxWidth: '20px', maxHeight: '20px', marginRight: '7px' },
      paddingBottom: '10px',
      height: '40px',
    },
  },
  grantDate: {
    textAlign: 'center',
    borderLeft: ['1px', 'solid', theme.colors.lightGrey],
    borderRight: ['1px', 'solid', theme.colors.lightGrey],
    color: theme.colors.lightGrey,
    [MAX_WIDTH_767]: {
      borderInline: '0px',
      padding: '7px 0px',
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '12px',
        height: '1px',
        top: '0px',
        background: theme.colors.lightGrey,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '12px',
        height: '1px',
        bottom: '0px',
        left: '0px',
        background: theme.colors.lightGrey,
      },
    },
  },
  grantAmount: {
    textAlign: 'right',
    fontSize: '0.75rem',
    lineHeight: '0.975rem',
    [MAX_WIDTH_767]: {
      paddingTop: '5px',
      fontSize: '0.985rem',
      lineHeight: '1.28rem',
    },
  },
  noGrants: {
    color: theme.colors.white,
    paddingTop: '20px',
    fontSize: '0.85rem', lineHeight: '0.85rem',
    [MAX_WIDTH_767]: {
      paddingTop: 'unset',
      paddingBottom: '20px',
      fontSize: '0.625rem', lineHeight: '0.625rem',
    },
  }
}));