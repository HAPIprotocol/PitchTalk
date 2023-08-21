import { createUseStyles } from 'react-jss';

import videoGradient from 'assets/images/video-gradient.png';
import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IVideoPlayerStyles {
  banner?: string;
}

export const useStyles = createUseStyles<string, IVideoPlayerStyles, IAppTheme>(
  (theme) => ({
    sectionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playerContainer: {
      position: 'relative',
      zIndex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:after': {
        content: '""',
        position: 'absolute',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${videoGradient})`,
        width: '125%',
        height: '125%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
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
        backgroundImage: ({ banner }) => `url(${banner})`,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      },

      '& $overlayDark': {
        background: 'rgba(0, 0, 0, 0.6)',
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
      justifyContent: 'center',
      marginLeft: '0px',
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
        '& svg': { width: 102, height: 102 },
      },
      [MAX_WIDTH_1239]: {
        marginLeft: '0px',
        '& svg': { width: '108px', height: '108px' },
      },
      [MAX_WIDTH_767]: {
        marginLeft: '0px',
        '& svg': { width: '45px', height: '45px' },
      },
    },
    countDownWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      zIndex: 2,
      color: theme.colors.white,
      gap: '24px',
      [MAX_WIDTH_1439]: { gap: '20px' },
      [MAX_WIDTH_1239]: { gap: '16px' },
      [MAX_WIDTH_767]: { gap: '12px' },
    },
    soonText: {
      fontSize: '2rem',
      textTransform: 'uppercase',
      margin: 0,
      [MAX_WIDTH_1439]: { fontSize: '1.75rem' },
      [MAX_WIDTH_1239]: { fontSize: '1.25rem' },
      [MAX_WIDTH_767]: { fontSize: '0.85rem' },
    },
    countDown: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  })
);
