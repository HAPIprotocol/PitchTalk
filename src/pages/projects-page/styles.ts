import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    margin: '60px 149px',
    maxWidth: '1150px',
    [MAX_WIDTH_1439]: {
      maxWidth: '1030px',
      minWidth: '1030px',
      margin: '40px 118px 60px',
    },
    [MAX_WIDTH_1239]: {
      margin: '72px 95px 55px',
      maxWidth: '600px',
      minWidth: '600px',
    },
    [MAX_WIDTH_767]: {
      width: '100%',
      margin: '42px 35px 32px',
      maxWidth: '400px',
      minWidth: '400px',
    },
    '@media (max-width: 460px)': {
      maxWidth: '300px',
      minWidth: 'unset',
    },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  pageHeading: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '40px',
    gap: '20px',
    [MAX_WIDTH_1439]: {
      gap: '15px',
    },
    [MAX_WIDTH_1239]: {
      marginTop: '25px',
    },
    [MAX_WIDTH_767]: {
      justifyContent: 'space-between',
      gap: '10px',
      marginBottom: '25px',
      marginTop: 'unset',
      flexWrap: 'wrap',
    },
  },
  projectsList: {
    width: '100%',
    maxHeight: '75vh',
    height: '100vh',
    [MAX_WIDTH_767]: {
      maxHeight: '65vh',
    },
    '@media (max-width: 460px)': {
      display: 'flex',
      width: '210px',
      justifyContent: 'center',
      marginInline: 'auto',
    },
  },
  noEvents: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 40,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    animationName: '$load',
    animationDelay: '0.5s',
    animationDuration: '1.5s',
    animationFillMode: 'forwards',
    opacity: '0',
    margin: '0 auto',
    [MAX_WIDTH_1439]: {
      fontSize: '1em',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.75em',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.625rem',
    },
  },
  '@-webkit-keyframes load': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  '@keyframes load': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
}));
