import { createUseStyles } from 'react-jss';

import bannerCover from 'assets/images/big-banner.png';
import {
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
  MAX_WIDTH_767,
  MAX_WIDTH_350,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  overlay: {
    position: 'relative',
    width: '100%',
    height: 170,
    overflow: 'hidden',
    [MAX_WIDTH_1239]: {
      height: 205,
    },
    [MAX_WIDTH_767]: {
      height: 255,
    },
    [MAX_WIDTH_350]: {
      height: 270,
    },
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${bannerCover})`,
    color: theme.colors.white,
    opacity: 0,
    animation: '$fadeInUp',
    animationDelay: '3s',
    animationDuration: '2s',
    animationFillMode: 'forwards',
    transition: '0.5s transform',
    [MAX_WIDTH_1239]: {
      height: 'unset',
    },
  },
  container: {
    display: 'flex',
    height: '100%',
    padding: '20px 40px',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    maxWidth: '1440px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingBottom: '12px',
    justifyContent: 'space-between',
    flex: 1,
    maxWidth: '890px',
    [MAX_WIDTH_1439]: {
      maxWidth: '786px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '650px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '300px',
    },
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '2.4rem',
    maxWidth: 'fit-content',
    fontFamily: theme.fonts.Everett.Medium,
    [MAX_WIDTH_1439]: {
      fontSize: '2.125rem',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: 20,
      fontSize: '1.75rem',
      textAlign: 'center',
      maxWidth: 'unset',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.15rem',
    },
  },
  advantages: {
    display: 'flex',
    justifyContent: 'flex-start',
    [MAX_WIDTH_767]: {
      flexWrap: 'wrap',
      rowGap: '20px',
    },
  },
  advantagesItem: {
    borderLeft: ['2px', 'solid', theme.colors.white],
    padding: '4px 40px',
    width: 'fit-content',
    fontSize: '0.875rem',
    fontFamily: theme.fonts.Everett.Regular,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    '&:nth-child(3)': {
      borderRight: ['2px', 'solid', theme.colors.white],
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.75rem',
    },
    [MAX_WIDTH_1239]: {
      padding: '4px 24px',
      fontSize: '0.625rem',
      textAlign: 'center',
    },
    [MAX_WIDTH_767]: {
      minWidth: '50%',
      width: '50%',
      flex: 1,
      border: 'unset',
      '&:nth-child(2n-1)': {
        borderRight: ['2px', 'solid', theme.colors.white],
      },
      WebkitLineClamp: 4,
    },
  },
  howToItem: {
    justifySelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: '140px',
    minWidth: '95px',
    cursor: 'pointer',
    [MAX_WIDTH_1439]: {
      marginLeft: '100px',
    },
    [MAX_WIDTH_1239]: {
      marginLeft: '60px',
    },
    [MAX_WIDTH_767]: {
      marginLeft: 'unset',
      minWidth: '50%',
      width: '50%',
      flex: 1,
      justifyContent: 'center',
    },
  },
  howToIcon: {
    cursor: 'pointer',
    width: '26px',
    height: '26px',
    marginRight: 12,
    [MAX_WIDTH_1239]: {
      width: '18px',
      height: '18px',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 135,
    alignSelf: 'stretch',
    [MAX_WIDTH_1439]: {
      marginLeft: 70,
    },
    [MAX_WIDTH_1239]: {
      marginTop: 20,
      marginLeft: 'unset',
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
  },
  createProjectButton: {
    width: '100%',
    '& button': {
      width: '300px',
      height: '60px',
      fontSize: '1rem',
      textTransform: 'uppercase',
      [MAX_WIDTH_1239]: {
        width: '260px',
        fontSize: '0.875rem',
        height: '48px',
      },
      [MAX_WIDTH_767]: {
        width: '115px',
        fontSize: '0.5rem',
        height: '32px',
        padding: '0 10px',
      },
    },
    [MAX_WIDTH_1439]: {},
    [MAX_WIDTH_1239]: {
      width: 'unset',
    },
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18,
    [MAX_WIDTH_1239]: {
      marginBottom: 'unset',
    },
  },
  pitchTalkLogo: {
    width: '29px',
    height: '29px',
    [MAX_WIDTH_1239]: {
      width: '50px',
      height: '50px',
    },
    [MAX_WIDTH_767]: {
      width: '29px',
      height: '29px',
    },
  },
  titleLogo: {
    marginLeft: '8px',
    width: '75px',
    height: '6px',
    [MAX_WIDTH_1239]: {
      marginLeft: '12px',
      width: '150px',
      height: '12px',
    },
    [MAX_WIDTH_767]: {
      marginLeft: '8px',
      width: '75px',
      height: '6px',
    },
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translate3d(0, 100%, 0)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
  },
}));
