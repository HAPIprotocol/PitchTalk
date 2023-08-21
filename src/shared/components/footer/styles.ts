import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  footer: {
    backgroundColor: theme.colors.darkGrey,
    display: 'flex',
    height: 113,
    width: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    [MAX_WIDTH_767]: {
      height: 'unset',
      marginBottom: '54px',
    },
    zIndex: 2,
  },
  itemsContainer: {
    backgroundColor: theme.colors.darkGrey,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    [MAX_WIDTH_767]: {
      justifyContent: 'space-between',
      margin: '0 auto',
      maxWidth: '400px',
      padding: '3px 0 14px',
      height: 'unset',
      width: '100%',
    },
  },
  footerItem: {
    borderLeft: ['1px', 'solid', theme.colors.borderGray],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: 58,
    padding: '0 60px',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.textGrey,
    '&:first-child': {
      borderLeft: 'none',
    },
    [MAX_WIDTH_1439]: {
      padding: '0 40px',
    },
    [MAX_WIDTH_1239]: {
      padding: '0 24px',
    },
    [MAX_WIDTH_767]: {
      borderLeft: 'none',
      padding: '0px 10px',
      marginTop: 6,
      '&:nth-child(2), &:last-child': {
        display: 'none',
      },
    },
  },
  footerItemWithLinks: {
    composes: '$footerItem',
    padding: '0 40px',
    [MAX_WIDTH_1439]: {
      padding: '0 30px',
    },
    [MAX_WIDTH_1239]: {
      padding: '0 14px',
    },
  },
  copyrights: {
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.textGrey,
      fontSize: '0.875rem',
      lineHeight: '18px',
      '&:last-child': {
        fontSize: '0.75rem',
        lineHeight: '16px',
        color: theme.colors.lightTextGrey,
        [MAX_WIDTH_1239]: {
          fontSize: '0.42rem',
          lineHeight: '0.545rem',
        },
        [MAX_WIDTH_767]: {
          fontSize: '0.45rem',
          lineHeight: '13px',
        },
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.59rem',
        lineHeight: '0.765rem',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.525rem',
        lineHeight: '13px',
      },
    },
  },
  footerNavigation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '0.75rem',
    lineHeight: '16px',
    '& a': {
      textDecoration: 'unset',
      color: theme.colors.textGrey,
    },
    '& a:hover': {
      textDecoration: 'underline',
      textDecorationColor: theme.colors.secondaryDark,
      textUnderlineOffset: '2px',
      color: theme.colors.secondaryDark,
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.505rem',
      lineHeight: '0.705rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
      lineHeight: '13px',
    },
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  socialLink: {
    margin: '0 10px',
    width: '16px',
    height: '16px',
    '&:last-child': {
      marginRight: 0,
    },
    '&:first-child': {
      marginLeft: 0,
    },
    '&:hover': {
      '& path': {
        fill: theme.colors.secondaryDark,
      },
      cursor: 'pointer',
    },
    [MAX_WIDTH_1239]: {
      width: '15px',
      height: '15px',
      margin: '0 5px',
    },
    [MAX_WIDTH_767]: {
      margin: '0 7px',
      width: '12px',
      height: '12px',
    },
  },
  logos: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg:first-child': {
      marginRight: 16,
    },
    [MAX_WIDTH_1239]: {
      '& svg:first-child': {
        width: '35px',
        height: '35px',
      },
      '& svg:last-child': {
        width: '76px',
        height: '44px',
      },
    },
    [MAX_WIDTH_767]: {
      '& svg:last-child': {
        marginTop: '-3px',
        width: 53,
        height: 36,
      },
      '& svg:first-child': {
        marginRight: '4px',
        width: '28px',
        height: '28px',
      },
    },
  },
  taglineHidden: {
    display: 'none',
    [MAX_WIDTH_767]: {
      display: 'block',
      order: 5,
      padding: '4px 10px 0 0',
    },
  },
  mobileNavigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    height: '64px',
    position: 'fixed',
    bottom: 0,
    zIndex: 3,
    background: theme.colors.lightDark,
    '& > a:first-child': {
      marginInline: '22px 14px',
    },
    '& > div:last-child': {
      marginInline: '14px 22px',
    },
  },
  navigationItem: {
    textDecoration: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '39px',
    marginInline: '14px',
    '& span': {
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.grey,
      fontSize: '0.5rem',
      lineHeight: '10px',
      marginTop: '7px',
      textAlign: 'center',
    },
  },
  navigationItemActive: {
    composes: '$navigationItem',
    textDecoration: 'underline',
    textDecorationColor: theme.colors.grey,
    textUnderlineOffset: '2px',
  },
  navigationItemSearch: {
    composes: '$navigationItem',
    '& svg': {
      marginTop: 0,
      '& path': {
        fill: theme.colors.secondaryDark,
      },
    },
  },
  protectedImg: {
    width: '169px',
    height: '55px',
    [MAX_WIDTH_1239]: {
      width: '114px',
      height: '37px',
    },
    [MAX_WIDTH_767]: {
      display: 'none',
    },
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8125rem',
    lineHeight: '0.95rem',
    color: theme.colors.white,
    textDecoration: 'none',
    marginBottom: '10px',
    '& svg': {
      width: '13px',
      marginRight: '9px',
    },
  },
}));
