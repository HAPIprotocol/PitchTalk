import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  nextEventsContainer: {
    marginBottom: '120px',
    [MAX_WIDTH_767]: {
      marginBottom: '84px',
    },
  },

  titleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: '0px 60px',
    gap: '17px',
    [MAX_WIDTH_767]: { marginBlock: '0px 32px', gap: '12px' },
  },
  title: {
    fontSize: '1.963rem',
    lineHeight: '2.355rem',
    letterSpacing: '0.02em',
    userSelect: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: theme.colors.white,
    margin: 0,
    [MAX_WIDTH_767]: { fontSize: '1.25rem', lineHeight: '1.5rem' },
  },
  titleSplitter: {
    height: '0.5px',
    background: theme.colors.white,
    flex: 1,
  },

  nextEventsListContainer: {
    position: 'relative',
    marginInline: 'auto',
    [MAX_WIDTH_1439]: {
      width: '1150px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '659px',
      width: 'unset',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '360px',
    },
  },

  nextEventsList: {
    maxWidth: '1200px',
    height: '278px',
    [MAX_WIDTH_1439]: {
      maxWidth: '1000px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: 'unset',
      height: '350px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: 'unset',
      height: '245px',
    },
  },

  nextEventImg: {
    width: '100%',
    height: '128px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [MAX_WIDTH_1239]: {
      height: '200px',
    },
    [MAX_WIDTH_767]: {
      height: '109px',
    },
  },
  nextEventInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
  },
  nextEventInfoTitle: {
    margin: 0,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 1,
  },
  nextEventInfoDescription: {
    margin: 0,
    color: theme.colors.grey,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 1,
  },
  nextEventStart: {
    margin: 0,
    color: theme.colors.grey,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 1,
  },

  noEvents: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    marginInline: 'auto',
    [MAX_WIDTH_1239]: { fontSize: '1.25rem' },
    [MAX_WIDTH_767]: { fontSize: '0.75rem' },
  },

  swiperButton: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: `1px solid ${theme.colors.secondaryDark}`,
    background: 'transparent',
    outline: 'none',
    cursor: 'pointer',

    top: '50%',
    transform: 'translate(0%, calc(-50% - 20px))',
    [MAX_WIDTH_1439]: {
      width: '46px',
      height: '46px',
    },
  },
  prevBtn: {
    composes: '$swiperButton',
    left: -50,
    right: 'auto',
    [MAX_WIDTH_1439]: {
      left: 0,
    },
  },
  nextBtn: {
    composes: '$swiperButton',
    left: 'auto',
    right: -50,
    '& svg': {
      transform: 'rotate(180deg)',
    },
    [MAX_WIDTH_1439]: {
      right: 0,
    },
  },
}));
