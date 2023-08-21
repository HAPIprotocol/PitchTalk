import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, { banner: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    pitchContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '24px',
    },
    playerContainer: {
      position: 'relative',
      zIndex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      },
      '& $overlayDark': {
        background: 'rgba(0, 0, 0, 0.6)',
      },
    },
    playButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      '& svg': {
        cursor: 'pointer',
        borderRadius: '50%',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        width: '108px',
        height: '108px',
        '&:hover': {
          transform: 'scale(1.03)',
        },
        '& circle': {
          fill: theme.colors.lightDark,
        },
      },
      [MAX_WIDTH_767]: {
        '& svg': {
          width: '50px',
          height: '50px',
        },
      },
    },
    pitchInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    pitchName: {
      margin: 0,
      fontSize: '2rem',
      fontFamily: theme.fonts.Everett.Light,
      color: theme.colors.white,
      [MAX_WIDTH_767]: {
        fontSize: '1.25rem',
      },
    },
    pitchMeta: {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      fontSize: '1.25rem',
      fontFamily: theme.fonts.Everett.Light,
      color: theme.colors.lightGrey,
    },
  })
);
