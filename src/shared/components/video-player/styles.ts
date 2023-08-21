import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IVideoPlayerStyles {
  banner?: string;
  width: number;
  height: number;
  playBtnCenter: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStyles = createUseStyles<any, IVideoPlayerStyles, IAppTheme>(
  (theme: IAppTheme) => ({
    playerContainer: {
      position: 'relative',
      zIndex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(0deg, #000, #653EE2)',
      '&:after, &:before': {
        content: '""',
        position: 'absolute',
        background:
          'linear-gradient(-45deg, #653EE2, #1314E8, #85E7F7, #1314E8, #653EE2)',
        backgroundSize: '400%',
        width: '100%',
        height: '100%',
        animation: '$gradient 60s linear infinite',
        zIndex: '-1',
      },
      '&:after': {
        filter: 'blur(50px)',
        opacity: 0.8,
      },
      [MAX_WIDTH_767]: {
        maxWidth: '280px',
        maxHeight: '158px',
      },
    },
    playerOverlay: {
      position: 'absolute',
      zIndex: 2,
      display: 'flex',
      backgroundColor: 'black',
      justifyContent: 'stretch',
      alignItems: 'center',

      '&:before': {
        content: '""',
        position: 'absolute',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: ({ banner }: { banner?: string }) =>
          `url(${banner || projectFrame})`,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,

        '&:focus, &:hover': {
          backdropFilter: 'blur(20px) grayscale(30%)',

          '& $projectDescription': {
            visibility: 'visible',
          },
        },
      },

      '&:focus, &:hover': {
        '&:before': {
          filter: 'blur(6px) grayscale(30%)',
        },

        '& $overlayDark': {
          background: 'rgba(0, 0, 0, 0.6)',
        },
        '& $projectDescription': {
          visibility: 'visible',
        },
      },

      [MAX_WIDTH_767]: {
        width: 11,
        height: 11,
        maxWidth: '280px',
        maxHeight: '158px',
      },
    },
    overlayDark: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transition: 'background 0.2s ease-in-out',
    },
    playButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: ({ playBtnCenter }) =>
        playBtnCenter ? 'center' : 'flex-start',
      marginLeft: ({ playBtnCenter }) => (playBtnCenter ? '0px' : '110px'),
      zIndex: 2,
      '& svg': {
        cursor: 'pointer',
        borderRadius: '50%',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      },
      [MAX_WIDTH_1439]: {
        marginLeft: 60,
        '& svg': {
          width: 102,
          height: 102,
        },
      },
      [MAX_WIDTH_1239]: {
        marginLeft: ({ playBtnCenter }) => (playBtnCenter ? '0px' : '60px'),
        '& svg': {
          width: ({ playBtnCenter }) => (playBtnCenter ? 108 : 74),
          height: ({ playBtnCenter }) => (playBtnCenter ? 108 : 74),
        },
      },
      [MAX_WIDTH_767]: {
        marginLeft: ({ playBtnCenter }) => (playBtnCenter ? '0px' : '28px'),
        '& svg': {
          width: ({ playBtnCenter }) => (playBtnCenter ? 45 : 35),
          height: ({ playBtnCenter }) => (playBtnCenter ? 45 : 35),
        },
      },
    },
    projectDescription: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      padding: '0 36px',
      zIndex: 2,
      cursor: 'pointer',
      [MAX_WIDTH_767]: {
        padding: '28px 24px 28px 0',
      },
      visibility: 'hidden',
    },
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    socialLink: {
      marginRight: 32,
      '&:hover': {
        '& path': {
          fill: theme.colors.secondaryDark,
        },
        cursor: 'pointer',
      },
      '&.web-icon': { width: 23, height: 23 },
      [MAX_WIDTH_1439]: {
        width: 21,
        height: 21,
        marginRight: 24,
        '&.web-icon': { width: 17, height: 17 },
      },
      [MAX_WIDTH_1239]: {
        '&.web-icon': { width: 16, height: 16 },
      },
      [MAX_WIDTH_767]: {
        width: 11,
        height: 11,
        marginRight: 12,
        '&.web-icon': { width: 9, height: 9 },
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
    projectName: {
      marginTop: 10,
      fontSize: '3rem',
      lineHeight: '64px',
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      maxWidth: '400px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      cursor: 'default',
      [MAX_WIDTH_1439]: {
        maxWidth: '300px',
        fontSize: '2.25rem',
        lineHeight: '46px',
      },
      [MAX_WIDTH_767]: {
        maxWidth: '120px',
        fontSize: '0.875rem',
        lineHeight: '18px',
      },
    },
    speakerName: {
      fontSize: '1.5rem',
      lineHeight: '32px',
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      marginBottom: 20,
      maxWidth: '400px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      cursor: 'default',
      [MAX_WIDTH_1439]: {
        fontSize: '1.125rem',
        lineHeight: '24px',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.625rem',
        lineHeight: '12px',
        marginBottom: 10,
      },
    },
    projectLegend: {
      fontSize: '0.875rem',
      letterSpacing: '0.28px',
      lineHeight: '18px',
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      maxWidth: 300,
      wordWrap: 'break-word',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 9,
      [MAX_WIDTH_1439]: {
        fontSize: '0.75rem',
        lineHeight: '14px',
      },
      [MAX_WIDTH_767]: {
        display: 'none',
      },
    },
    player: {},
    infoButton: {
      display: ['none', '!important'],
      [MAX_WIDTH_767]: {
        display: ['flex', '!important'],
        justifyContent: ['flex-start', '!important'],
        '& $button': {
          background: '#C4C4C4',
          width: 43,
          height: 20,
          fontSize: '0.625rem',
          color: 'unset',
          padding: 'unset',
        },
      },
    },
  })
);
