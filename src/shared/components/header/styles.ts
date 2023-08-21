import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isGrantUser: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    header: {
      height: 106,
      padding: '0 40px',
      display: 'flex',
      width: '100%',
      alignSelf: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      [MAX_WIDTH_1239]: {
        height: '61px',
      },
      [MAX_WIDTH_767]: {
        padding: '0 20px',
        backgroundColor: 'rgba(101, 62, 226, 0.1)',
        justifyContent: 'space-between',
        height: 53,
      },
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: '210px',
      height: '52px',
      [MAX_WIDTH_1239]: {
        width: '140px',
        height: '35px',
      },
      [MAX_WIDTH_767]: {
        width: '96px',
        height: '24px',
        marginRight: '19px',
      },
    },
    pitchTalkLogo: {
      width: '66px',
      height: '64px',
      [MAX_WIDTH_1239]: {
        width: '35px',
        height: '34px',
      },
      [MAX_WIDTH_767]: {
        width: '25px',
        height: '24px',
      },
    },
    titleLogo: {
      marginLeft: '16px',
      width: '140px',
      height: '11px',
      [MAX_WIDTH_1239]: {
        width: '94px',
        height: '7px',
        marginLeft: '10px',
      },
      [MAX_WIDTH_767]: {
        maxWidth: '65px',
        maxHeight: '5px',
        marginLeft: '7px',
      },
    },
    navigation: {
      display: 'flex',
      marginLeft: '53px',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '55px',
      [MAX_WIDTH_1439]: {
        margin: '0 38px',
        gap: 'unset',
        justifyContent: 'space-between'
      },
      [MAX_WIDTH_1239]: {
        padding: '0 30px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        height: '100%',
        background: theme.colors.lightDark,
        '& span': {
          display: 'none',
        },
      },
      [MAX_WIDTH_767]: {
        display: 'none',
      },
    },
    navigationItem: {
      textDecoration: 'unset',
      display: 'flex',
      alignItems: 'center',
      '& span': {
        marginTop: '2px',
        alignSelf: 'center',
        fontFamily: theme.fonts.Everett.Regular,
        color: theme.colors.grey,
        fontSize: '0.875rem',
        letterSpacing: 0.36,
        lineHeight: '0.875rem',
        marginLeft: 12,
      },
      [MAX_WIDTH_1239]: {
        margin: '0',
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
      display: 'none',
      '& svg path': {
        fill: theme.colors.secondaryDark,
      },
      [MAX_WIDTH_1439]: {
        display: 'flex',
      },
    },
    searchField: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '53px',
      '& input': {
        width: '210px',
        height: '33px',
        padding: '8px 20px 8px 36px',
        lineHeight: '17px',
      },
      [MAX_WIDTH_1439]: {
        display: 'none',
      },
      [MAX_WIDTH_767]: {
        display: 'block',
        marginRight: '0',
        '& > div': {
          width: '126px',
        },
        '& input': {
          height: '13px',
          padding: '3px 8px 3px 13px',
          fontSize: '0.4rem',
          lineHeight: '7px',
          borderRadius: 0,
        },
        '& svg': {
          width: '5.5px',
          height: '5.5px',
        },
      },
    },
    burgerButton: {
      display: 'none',
      width: '31px',
      height: '22px',
      [MAX_WIDTH_767]: {
        display: 'block',
        visibility: 'visible',
        width: '19px',
        height: '13px',
        marginLeft: '10px',
      },
    },
    account: {
      display: 'flex',
      alignItems: 'center',
      '& button': {
        width: '150px',
        height: '40px',
        background: ({ isGrantUser }) =>
          isGrantUser
            ? theme.colors.grantBaseColor
            : theme.colors.secondaryDark,
        color: ({ isGrantUser }) =>
          isGrantUser ? theme.colors.lightDark : theme.colors.white,
        '&:hover, &:active': {
          background: ({ isGrantUser }) =>
            isGrantUser
              ? theme.colors.grantBaseColor
              : theme.colors.secondaryDark,
          color: ({ isGrantUser }) =>
            isGrantUser ? theme.colors.lightDark : theme.colors.white,
        },
        [MAX_WIDTH_1239]: {
          width: '118px',
          height: '29px',
          fontSize: '0.625rem',
          lineHeight: '13px',
        },
      },
      [MAX_WIDTH_767]: { display: 'none' },
    },
    button: {
      cursor: 'pointer',
      width: 33,
      height: 33,
      border: 'none',
      borderRadius: '50%',
      outline: 'none',
      marginRight: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [MAX_WIDTH_1239]: {
        width: 29,
        height: 29,
        marginRight: '10px',
      },
    },
    buttonActive: {
      composes: '$button',
      background: ({ isGrantUser }: IStylesProps) =>
        isGrantUser ? theme.colors.grantBaseColor : theme.colors.secondaryDark,
      '& svg': {
        '& path': {
          fill: theme.colors.white,
        },
        '& circle': {
          fill: ({ isGrantUser }: IStylesProps) =>
            isGrantUser
              ? theme.colors.grantBaseColor
              : theme.colors.secondaryDark,
        },
      },
    },
    preventTooLong: {
      '& span, & abbr': {
        display: 'block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
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
  })
);
