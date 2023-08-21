import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { banner?: string },
  IAppTheme
>((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    padding: '32px 42px 42px',
    width: '100%',
    aspectRatio: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: (props) =>
        props?.banner ? `url(${props?.banner})` : `url(${projectFrame})`,
      filter: 'grayscale(15%) brightness(0.6)',
    },

    [MAX_WIDTH_1439]: { padding: '30px 42px 38px 38px' },
    [MAX_WIDTH_1239]: { padding: '20px 24px 25px 20px' },
    [MAX_WIDTH_767]: { padding: '14px 14px 14px 16px' },
  },
  eventTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    '& > label': { cursor: 'pointer' },
  },
  eventTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  eventLogo: {
    width: '70px',
    height: '70px',
    [MAX_WIDTH_1239]: { width: '50px', height: '50px', padding: '3px' },
    [MAX_WIDTH_767]: { width: '40px', height: '40px' },
  },
  eventNameAndLogo: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    marginBottom: '1.125rem',
    [MAX_WIDTH_1439]: { marginBottom: '1rem' },
    [MAX_WIDTH_1239]: { marginBottom: '0.65rem' },
    [MAX_WIDTH_767]: { marginBottom: '0.25rem', gap: '15px' },
  },
  eventName: {
    fontSize: '2.75rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textDecoration: 'none',
    [MAX_WIDTH_1439]: { fontSize: '2.5rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.55rem' },
    [MAX_WIDTH_767]: { fontSize: '0.65rem' },
  },
  eventDescription: {
    width: '100%',
    fontSize: '1.25rem',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    [MAX_WIDTH_1439]: { fontSize: '1.125rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.75rem' },
    [MAX_WIDTH_767]: { fontSize: '0.4rem', marginBlock: '10px' },
  },
  eventFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    position: 'relative',
  },
  eventDate: {
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: '46px',
      height: '46px',
      marginRight: 32,
    },
    [MAX_WIDTH_1439]: {
      fontSize: '1.125rem',
      '& svg': {
        width: '41px',
        height: '41px',
        marginRight: 30,
      },
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.625rem',
      '& svg': {
        width: '22px',
        height: '22px',
        marginRight: 16,
      },
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.375rem',
      '& svg': {
        width: '8px',
        height: '8px',
        marginRight: 9,
      },
    },
  },
  eventToken: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1.6rem',
    margin: 0,
    [MAX_WIDTH_1439]: { fontSize: '1.55rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.8rem' },
    [MAX_WIDTH_767]: { fontSize: '0.5rem' },
    '& img': {
      width: '28px',
      height: '28px',
      [MAX_WIDTH_1439]: { width: '25px', height: '25px' },
      [MAX_WIDTH_1239]: { width: '18px', height: '18px' },
      [MAX_WIDTH_767]: { width: '14px', height: '14px' },
    },
  },
  eventSocials: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  socialLink: {
    position: 'relative',
    width: '26px',
    height: '26px',
    marginRight: 30,
    cursor: 'pointer',
    '&:hover': {
      '& path': {
        fill: theme.colors.secondaryDark,
      },
    },
    '&.web-icon': { width: 23, height: 23 },
    [MAX_WIDTH_1439]: {
      marginRight: 24,
      width: '23px',
      height: '23px',
      '&.web-icon': { width: 21, height: 21 },
    },
    [MAX_WIDTH_1239]: {
      marginRight: 18,
      width: '17px',
      height: '17px',
      '&.web-icon': { width: 15, height: 15 },
    },
    [MAX_WIDTH_767]: {
      marginRight: 10,
      width: '10px',
      height: '10px',
      '&.web-icon': { width: 9, height: 9 },
    },
  },
}));
