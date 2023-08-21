import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isGrantUser: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    burgerMenu: {
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '23px 33px',
      width: '100%',
      height: '100vh',
      background: theme.colors.burgerMenuBg,
      backdropFilter: 'blur(10px)',
      zIndex: 101,
      ['@media (min-width: 1440px)']: {
        display: 'none',
      },
    },
    navigationItem: {
      textDecoration: 'unset',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '36px',
      '& span:last-child': {
        fontFamily: theme.fonts.Everett.Regular,
        color: theme.colors.white,
        fontSize: '1.3rem',
        lineHeight: '23px',
        marginLeft: '20px',
      },
      '& path': {
        fill: theme.colors.secondaryDark,
      },
    },
    navigationItemActive: {
      composes: '$navigationItem',
      textDecoration: 'underline',
      textDecorationColor: theme.colors.secondaryDark,
      textUnderlineOffset: '2px',
      '& span:last-child': {
        color: theme.colors.white,
      },
    },
    iconContainer: {
      width: '35px',
    },
    connectButton: {
      '& $button': {
        width: '160px',
        height: '35px',
        fontSize: '0.75rem',
        lineHeight: '15px',
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
      },
      '& span, & abbr': {
        display: 'block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
      marginBottom: '65px',
    },
    closeButton: {
      position: 'absolute',
      top: '23px',
      right: '20px',
      width: '15px',
      height: '15px',
    },
    userInfoWrapper: {
      display: 'flex',
      alignItems: 'center',
      width: '163px',
      height: '51px',
      marginBottom: '18px',
      textDecoration: 'none',
      '&.active svg circle': {
        fill: ({ isGrantUser }: IStylesProps) =>
          isGrantUser
            ? theme.colors.grantBaseColor
            : theme.colors.secondaryDark,
      },
      '& svg': {
        width: '51px',
        height: '51px',
        marginRight: '13px',
      },
      '& span': {
        color: ({ isGrantUser }: IStylesProps) =>
          isGrantUser ? theme.colors.white : theme.colors.secondaryDark,
        fontFamily: theme.fonts.Everett.Regular,
        fontSize: '0.8rem',
        lineHeight: '130%',
        maxWidth: '99px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    protectedImg: {
      position: 'fixed',
      left: '33px',
      bottom: '41px',
      '& img': { width: '114px', height: '37px' },
    },
    projectIcon: {
      '& path': {
        fill: theme.colors.black,
      },
    },
  })
);
