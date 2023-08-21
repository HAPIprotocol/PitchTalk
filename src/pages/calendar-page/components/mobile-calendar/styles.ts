import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_320, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  mobileCalendarHolder: {
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    [MAX_WIDTH_767]: {
      width: '100%',
    },
    [MAX_WIDTH_320]: {
      width: '240px',
    },
  },
  mobileDaySelect: {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    minHeight: '32px',
    marginBottom: '20px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  mobileDayButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '22px',
  },
  mobileDayWeekDay: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
  },
  mobileDayMonthDay: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: '0.75rem',
    color: theme.colors.grey,
    width: '20px',
    height: '20px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  mobileDaySelected: {
    composes: '$mobileDayMonthDay',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
  },
  mobileDayToday: {
    composes: '$mobileDayMonthDay',
    backgroundColor: theme.colors.secondaryDark,
  },
  hoursHolder: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  hourLine: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    marginBottom: '20px',
    height: '12px',
  },
  timestamp: {
    color: theme.colors.grey,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.5rem',
    marginRight: '12px',
    minWidth: '26px',
  },
  divider: {
    flex: 1,
    borderTop: ['1px', 'solid', theme.colors.grey],
  },
  mobileEventsHolder: {
    width: '100%',
    height: '100%',
  },
  noEvents: {
    fontSize: '1rem',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.darkerGrey,
    textAlign: 'center',
  },
}));
