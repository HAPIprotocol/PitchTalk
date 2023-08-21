import { createUseStyles } from 'react-jss';

import demoAnnouncement from 'assets/images/demo-announcement.png';
import demoAnnouncementsRotated from 'assets/images/demo-announcements-rotated.png';
import demoAnnouncements from 'assets/images/demo-announcements.png';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { isHomePage: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  announcements: {
    marginTop: 93,
    width: 268,
    height: ({ isHomePage }) => (isHomePage ? 503 : 718),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [MAX_WIDTH_1439]: {
      height: ({ isHomePage }) => (isHomePage ? 460 : 718),
    },
    [MAX_WIDTH_1239]: {
      width: '570px',
      margin: '36px 42px 0',
      height: 'unset !important',
    },
    [MAX_WIDTH_767]: {
      width: '240px',
      margin: '24px 42px',
    },
  },
  announcementsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  emptyAnnouncements: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    background: `url(${demoAnnouncements}) no-repeat`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
    [MAX_WIDTH_1239]: {
      background: `url(${demoAnnouncementsRotated}) no-repeat`,
      minHeight: '200px',
    },
    [MAX_WIDTH_767]: {
      backgroundSize: '100% 100%',
      background: `url(${demoAnnouncement}) no-repeat`,
    },
  },
  announcementsText: {
    fontSize: '1.5rem',
    letterSpacing: '0.48px',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& span:last-child': {
      fontSize: '1.125rem',
      letterSpacing: '0.036px',
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      [MAX_WIDTH_767]: {
        fontSize: '0.875rem',
      },
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.125rem',
    },
  },
  announcementsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    paddingRight: '28px',
  },
  title: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.grey,
  },
  link: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    color: theme.colors.grey,
    textDecoration: 'underline',
  },
  announcementsItems: {
    display: 'flex',
    flexDirection: 'column',

    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '672px',
    paddingRight: '20px',
    [MAX_WIDTH_1239]: {
      maxHeight: '419.5px',
    },
  },
  announcementItem: {
    width: '242px',
    border: ['1px', 'solid', theme.colors.grey],
    borderRadius: '3px',
    marginBottom: '20px',
  },
  announcementDescription: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  announcementProjectName: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.grey,
    fontSize: '0.875rem',
    marginBottom: '8px',
  },
  announcementTime: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    fontSize: '0.75rem',
    backgroundColor: theme.colors.secondaryDark,
    padding: '4px 10px',
    borderRadius: '3px',
  },
  projectImage: {
    height: 136,
    width: 240,
    objectFit: 'cover',
    marginBottom: '-4px',
  },
  scrollArrow: {
    display: 'none',
  },
  [MAX_WIDTH_1239]: {
    announcementsItems: {
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      maxWidth: '100%',
      paddingBottom: '28px',
      paddingRight: 'unset',
      scrollSnapType: 'x mandatory',
    },
    announcementItem: {
      marginBottom: 'unset',
      marginRight: '14px',
      width: '180px',
      scrollSnapAlign: 'center',
      '&:last-child': {
        marginRight: 0,
      },
    },
    announcementDescription: {
      padding: '10px 12px',
    },
    announcementProjectName: {
      fontSize: '0.625rem',
      marginBottom: '8px',
      minHeight: '24px',
    },
    announcementTime: {
      fontSize: '0.625rem',
      padding: '2px 6px',
    },
    projectImage: {
      height: '100px',
      width: '178px',
      objectFit: 'cover',
    },
    announcementsHeader: {
      paddingRight: 'unset',
    },
    title: {
      fontSize: '1.125rem',
    },
    link: {
      fontSize: '0.875rem',
    },
  },
  [MAX_WIDTH_767]: {
    scrollArrow: {
      display: 'block',
      marginBottom: '18px',
    },
    announcementsItems: {
      paddingBottom: '28px',
      marginInline: '9px',
      scrollSnapType: 'x mandatory',
    },
    announcementItem: {
      scrollSnapAlign: 'center',
    },
    title: {
      fontSize: '0.75rem',
    },
    link: {
      fontSize: '0.625rem',
    },
  },
}));
