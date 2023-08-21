import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  customFiltersWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& label': {
      display: 'flex',
      alignItems: 'center',
      color: theme.colors.lightGrey,
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      cursor: 'pointer',
      marginRight: '42px',
      '& input': { cursor: 'pointer', marginRight: '10px' },
      '& input:not(:checked)': {
        background: 'transparent',
        transition: 'ease-in-out all 0.15s',
      },
    },
    [MAX_WIDTH_1439]: {
      '& label': {
        fontSize: '0.775rem',
        lineHeight: '0.93rem',
        '& input': { marginRight: '9px', width: '12px', height: '12px' },
        '&:first-child': { marginLeft: '40px' },
      },
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '400px',
      width: '100%',
      justifyContent: 'center',
      '& label': {
        fontSize: '0.98rem',
        lineHeight: '1.18rem',
        marginRight: '28px',
        '& input': { marginRight: '11px', width: '16px', height: '16px' },
        '&:first-child': { marginLeft: '0px' },
        '&:last-child': { marginRight: '0px' },
      },
    },
    [MAX_WIDTH_767]: {
      maxWidth: 'unset',
      width: 'unset',
      '& label': {
        fontSize: '0.6rem',
        lineHeight: '0.72rem',
        marginRight: '20px',
        '& input': {
          marginRight: '7px',
          width: '10px',
          height: '10px',
          borderWidth: '0.63px',
          borderRadius: '0.63px',
        },
        '&:last-child': { marginRight: '0px' },
      },
    },
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [MAX_WIDTH_1239]: {
      width: '100%',
      minWidth: '140px',
    },
    [MAX_WIDTH_767]: {
      justifyContent: 'unset',
      '& > div': { width: '100%' },
    },
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersLabel: {
    color: theme.colors.filterColor,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 16px',
    borderRadius: '8px',
    border: ['1px', 'solid', theme.colors.filterColor],
    cursor: 'pointer',
    '& label': {
      cursor: 'pointer',
      marginRight: '0.5rem',
    },
    [MAX_WIDTH_767]: {
      padding: '3px 12px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      '& label': { marginRight: '0.35rem' },
      '& svg': { width: '12px', height: '12px' },
    },
    '&.active': {
      background: theme.colors.filterColor,
      color: theme.colors.lightDark,
      '& svg path': { fill: theme.colors.lightDark },
    },
  },
  filtersClearLabel: {
    composes: '$filtersLabel',
    marginLeft: '15px',
    '& svg': {
      width: '11px',
      height: '11px',
      '& rect': { fill: theme.colors.filterColor },
    },
    [MAX_WIDTH_767]: {
      '& svg': { width: '9.5px', height: '9.5px' },
    },
  },
  leaderBoardBtn: {
    display: 'flex',
    border: ['2px', 'solid', theme.colors.primary],
    borderRadius: '10px',
    justifyContent: 'flex-end',
    marginInline: 'auto 0',
    padding: '6px 10px',
    color: theme.colors.primary,
    [MAX_WIDTH_1239]: {
      position: 'absolute',
      top: '-45px',
      right: '0px',
    },
    [MAX_WIDTH_767]: {
      position: 'unset',
      padding: '4px 8px',
      fontSize: '0.9rem',
    },
  },
}));
