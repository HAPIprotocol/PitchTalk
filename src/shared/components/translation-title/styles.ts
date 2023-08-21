import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';
export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    display: 'flex',
    alignItems: 'flex-start',
    fontFamily: theme.fonts.Everett.Regular,
    zIndex: 3,
    [MAX_WIDTH_1239]: {
      zIndex: 1,
    },
  },
  subHeading: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontFamily: theme.fonts.Everett.Regular,
    marginBottom: '24px',
    [MAX_WIDTH_1439]: {
      marginBottom: '26px',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '16px',
    },
    [MAX_WIDTH_767]: {
      marginBottom: '10px',
    },
  },
  title: {
    fontSize: '2.25rem',
    lineHeight: '43px',
    color: theme.colors.white,
    textTransform: 'capitalize',
    fontStyle: 'normal',
    fontWeight: 400,
    cursor: 'default',
    [MAX_WIDTH_1239]: {
      fontSize: '1.5rem',
      lineHeight: '28px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
      lineHeight: '14px',
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1px',
  },
  time: {
    fontSize: '1.25rem',
    lineHeight: '24px',
    color: theme.colors.white,
    marginLeft: '28px',
    paddingInline: '20px',
    borderLeft: ['1px', 'solid', theme.colors.white],
    borderRight: ['1px', 'solid', theme.colors.white],
    zIndex: 3,
    cursor: 'default',
    [MAX_WIDTH_1239]: {
      fontSize: '1.125rem',
      lineHeight: '22px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.5rem',
      lineHeight: '10px',
      marginLeft: '14px',
      paddingInline: '6px',
      borderWidth: '0.3px',
    },
  },
  subtitleWrapper: {
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    '& label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '24px',
      width: '88px',
      height: '33px',
      padding: '8px 20px',
      borderRadius: '3px',
      fontSize: '0.875rem',
      lineHeight: '17px',
      [MAX_WIDTH_1239]: {
        width: '58px',
        height: '22px',
        padding: '5px 12px',
        fontSize: '0.6rem',
        lineHeight: '11px',
        marginRight: '16px',
      },
      [MAX_WIDTH_767]: {
        width: '28px',
        height: '11px',
        padding: '3px 7px',
        fontSize: '0.275rem',
        lineHeight: '5px',
        margin: '0px 6px 0px 0px',
        borderRadius: '1px',
      },
    },
  },
  subtitle: {
    fontSize: '1.5rem',
    color: theme.colors.white,
    lineHeight: '28.8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '450px',
    textDecoration: 'none',
    cursor: 'default',
    [MAX_WIDTH_1439]: {
      maxWidth: '270px',
      fontSize: '1.25rem',
      lineHeight: '22px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.7rem',
      lineHeight: '16px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '90px',
      fontSize: '0.5rem',
      lineHeight: '10px',
    },
  },
  goToProjectWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 3,
    '& button': {
      width: '163px',
      height: '49px',
      fontSize: '0.875rem',
      lineHeight: '17px',
      [MAX_WIDTH_1239]: {
        width: '107px',
        height: '32px',
        padding: '11px 21px',
        fontSize: '0.55rem',
        lineHeight: '11px',
      },
      [MAX_WIDTH_767]: {
        width: '59px',
        height: '16px',
        padding: '4px 2px',
        fontSize: '0.43rem',
        lineHeight: '0.525rem',
      },
    },
  },
}));
