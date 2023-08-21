import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  calendarHolder: {
    position: 'relative',
    width: '1042px',
    [MAX_WIDTH_1439]: {
      width: '1003px',
    },
    [MAX_WIDTH_1239]: {
      width: '659px',
    },
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(101, 62, 226, 0.2)',
    zIndex: -5,
    filter: 'blur(200px)',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflowX: 'scroll',
    zIndex: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  calendarMonthlyView: {
    composes: '$calendar',
    overflow: 'auto',
    flexWrap: 'wrap',
    '& $dayItem:nth-child(5n)': {
      marginRight: 0,
    },
  },
  dayItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: ['1px', 'solid', theme.colors.darkerGrey],
    borderRadius: '3px',
    height: '340px',
    minWidth: '194px',
    maxWidth: '194px',
    marginRight: '18px',
    marginBottom: '17px',
    color: theme.colors.white,
    [MAX_WIDTH_1439]: {
      minWidth: '187px',
      maxWidth: '187px',
      height: '328px',
      marginRight: '17px',
      marginBottom: '17px',
    },
    [MAX_WIDTH_1239]: {
      minWidth: '123px',
      maxWidth: '123px',
      height: '216px',
      marginRight: '11px',
      marginBottom: '13px',
    },
  },
  todayDayItem: {
    composes: '$dayItem',
    backgroundColor: theme.colors.secondaryDark,
    '& $event': {
      border: ['1px', 'solid', theme.colors.white],
      borderLeft: ['12px', 'solid', theme.colors.white],
      color: theme.colors.white,
    },
    '& $dayDate': {
      color: theme.colors.white,
    },
  },
  upcomingDayItem: {
    composes: '$dayItem',
    '& $event': {
      borderLeft: ['12px', 'solid', theme.colors.secondaryDark],
      color: theme.colors.white,
    },
  },
  noEvents: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    color: theme.colors.darkerGrey,
    width: 110,
    [MAX_WIDTH_1239]: {
      fontSize: '0.5rem',
    },
  },
  eventsHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '18px',
    width: '100%',
    '&::-webkit-scrollbar-button': {
      padding: '70px 0',
    },
    [MAX_WIDTH_1439]: {
      padding: '17px',
    },
    [MAX_WIDTH_1239]: {
      padding: '11px',
    },
  },
  dayDate: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.grey,
    overflowWrap: 'anywhere',
    margin: '14px 18px 0',
    wordBreak: 'break-word',
    [MAX_WIDTH_1439]: {
      color: theme.colors.grey,
      fontSize: '1.125rem',
    },
  },
}));
