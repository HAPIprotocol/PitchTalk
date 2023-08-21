import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  eventsByTypeContainer: {
    display: 'flex',
    gap: '64px',
    padding: '45px 32px 50px',
    width: '100%',
    background: theme.colors.lightDark,
    borderRadius: '3px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
    },
    [MAX_WIDTH_767]: {
      alignItems: 'center',
      maxWidth: '328px',
      padding: '16px 16px 32px',
    },
  },
  eventsByTypeMeta: {
    width: '400px',
    [MAX_WIDTH_767]: {
      width: '100%',
    },
  },
  eventsByTypeList: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '16px',
    [MAX_WIDTH_767]: {
      width: '100%',
    },
  },
  eventItem: {
    width: '100%',
    color: theme.colors.white,
    paddingBottom: '16px',
    borderBottom: ['0.5px', 'solid', '#ffffff33'],
    transition: 'border-bottom 0.3s ease',
    '&:hover, &:active': {
      borderBottom: ['0.5px', 'solid', theme.colors.secondaryDark],
    },
    [MAX_WIDTH_1239]: {
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    [MAX_WIDTH_767]: {
      maxWidth: '296px',
      paddingBottom: '20px',
    },
  },
  eventName: {
    fontSize: '1.25rem',
    marginBlock: '0px 16px',
  },
  eventInfoWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gap: '16px',
    gridTemplateColumns: 'auto 1fr 1fr auto',

    '& p:first-of-type': {
      borderLeft: ['1px', 'solid', '#ffffff33'],
    },
    [MAX_WIDTH_1239]: {
      '& p:last-of-type': {
        paddingInline: '10px',
      },
    },
    [MAX_WIDTH_767]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '& p:first-of-type': {
        borderLeft: 'none',
      },
      '& p:last-of-type': {
        paddingInline: 'unset',
      },
    },
  },
  eventImg: {
    width: '216px',
    height: '72px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [MAX_WIDTH_767]: {
      width: '100%',
      height: '98px',
      borderRadius: '3px 3px 0px 0px',
    },
  },
  eventInfo: {
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    marginBlock: 'auto',
    paddingInline: '16px',
    borderRight: ['0.5px', 'solid', '#ffffff33'],
    [MAX_WIDTH_767]: {
      width: '100%',
      flexDirection: 'row',
      borderRight: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'unset',
      gap: '20px',
      paddingInline: 'unset',
    },
  },
  eventInfoLabel: {
    textTransform: 'uppercase',
    color: theme.colors.grey,
    fontSize: '0.875rem',
    lineHeight: '1.225rem',
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
      lineHeight: '1.05rem',
    },
  },
  eventInfoAmount: {
    color: theme.colors.white,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
  },

  noEvents: {
    alignSelf: 'center',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.35rem',
    color: theme.colors.white,
    margin: 'auto',
    [MAX_WIDTH_1239]: { fontSize: '1.25rem' },
    [MAX_WIDTH_767]: { fontSize: '1.05rem' },
  },

  metaTitle: {
    fontSize: '2rem',
    lineHeight: '2.4rem',
    textTransform: 'uppercase',
    marginBlock: '0px 8px',
    [MAX_WIDTH_767]: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      marginBlock: '0px 8px',
    },
  },
  metaDescription: {
    color: theme.colors.grey,
    fontSize: '1rem',
    lineHeight: '1.4rem',
    marginBlock: '0px 32px',
    [MAX_WIDTH_767]: {
      fontSize: '0.875rem',
      lineHeight: '1.225rem',
    },
  },
  metaList: {
    fontFamily: theme.fonts.Everett.Light,
    color: theme.colors.grey,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    padding: '0px 0px 0px 32px',
    marginBlock: '0px 32px',
    [MAX_WIDTH_767]: {
      fontSize: '1rem',
      lineHeight: '1.4rem',
      padding: '0px 0px 0px 24px',
    },
  },
  metaBtn: {
    justifyContent: 'flex-start',
    '& button': {
      width: '174px',
      height: '49px',
      padding: '16px',
      background: 'transparent',
      border: ['1px', 'solid', theme.colors.secondaryDark],
      '&:hover, &:active': {
        background: 'transparent',
      },
      '&:disabled': {
        border: 'none',
      },
    },
  },

  // ICONS
  metaIcon: {},
  lectureIcon: {
    width: '86px',
    height: '120px',
    marginBottom: '18px',
    [MAX_WIDTH_1239]: {
      marginBottom: '24px',
    },
    [MAX_WIDTH_767]: {
      width: '47px',
      height: '66px',
      marginBottom: '8px',
    },
  },
  tournamentIcon: {
    width: '103px',
    height: '89px',
    marginBottom: '44px',
    [MAX_WIDTH_767]: {
      width: '56px',
      height: '48px',
      marginBottom: '8px',
    },
  },
  hackatoneIcon: {
    width: '97px',
    height: '94px',
    marginBottom: '36px',
    [MAX_WIDTH_767]: {
      width: '53px',
      height: '51px',
      marginBottom: '8px',
    },
  },
}));
