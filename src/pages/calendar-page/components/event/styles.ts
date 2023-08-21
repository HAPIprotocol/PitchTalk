import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IEvent {
  isToday: boolean;
  isPitchFinished: boolean;
}

export const useStyles = createUseStyles<string, IEvent, IAppTheme>(
  (theme: IAppTheme) => ({
    event: {
      position: 'relative',
      cursor: 'pointer',
      border: ['1px', 'solid', theme.colors.grey],
      borderRadius: '3px',
      margin: '6px 0',
      width: '156px',
      minHeight: '73px',
      display: 'flex',
      padding: '0px 8px 0px 20px',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      [MAX_WIDTH_1439]: {
        fontSize: '0.625rem',
        width: '151px',
        minHeight: '71px',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.625rem',
        width: '99px',
        minHeight: '46px',
      },
    },
    eventLeftBorder: {
      width: '12px',
      height: 'calc(100% + 2px)',
      position: 'absolute',
      left: '-1px',
      top: '-1px',
      borderTopLeftRadius: '3px',
      borderBottomLeftRadius: '3px',
      background: ({ isToday, isPitchFinished }) => {
        if (isToday) {
          return theme.colors.white;
        }
        return isPitchFinished ? theme.colors.grey : theme.colors.secondaryDark;
      },
    },
    eventInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        width: '17px',
        height: '12px',
      },
      '& label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '46px',
        height: '17px',
        fontSize: '0.475rem',
        borderRadius: '1px',
      },
      [MAX_WIDTH_1439]: {
        '& svg': {
          width: '16px',
        },
        '& label': {
          width: '44px',
          height: '17px',
          fontSize: '0.45rem',
        },
      },
      [MAX_WIDTH_1239]: {
        '& svg': {
          width: '12px',
          height: '9px',
        },
        '& label': {
          width: '29px',
          height: '11px',
          fontSize: '0.375rem',
        },
      },
    },
    projectName: {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.875rem',
      lineHeight: '0.75rem',
      color: theme.colors.white,
      maxWidth: '105px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      cursor: 'default',
      [MAX_WIDTH_1439]: {
        maxWidth: '98px',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.525rem',
        maxWidth: '58px',
      },
    },
    eventName: {
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.white,
      fontSize: '0.725rem',
      lineHeight: '0.7rem',
      maxWidth: '80px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textDecoration: 'none',
      cursor: 'default',
      [MAX_WIDTH_1439]: {
        fontSize: '0.625rem',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.5rem',
      },
    },
    time: {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '1rem',
      color: theme.colors.white,
      [MAX_WIDTH_1439]: {
        fontSize: '0.875rem',
      },
      [MAX_WIDTH_1439]: {
        fontSize: '0.575rem',
      },
    },
    tag: {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.625rem',
      color: theme.colors.grey,
    },
  })
);
