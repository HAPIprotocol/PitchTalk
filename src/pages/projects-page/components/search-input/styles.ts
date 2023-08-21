import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  input: {
    width: '100%',
    height: '37px',
    backgroundColor: theme.colors.lightDark,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: 3,
    padding: '8px 20px 8px 39px',
    fontSize: '0.875rem',
    fontFamily: theme.fonts.Everett.Regular,
    outline: 'none',
    color: 'white',

    '&:focus': {
      border: ['1px', 'solid', theme.colors.grey],
    },

    '&:read-only': {
      opacity: 0.5,
      pointerEvents: 'none',
    },

    [MAX_WIDTH_1439]: {
      padding: '4px 10px 4px 34px',
      height: '32px',
      fontSize: '0.75rem',
    },
    [MAX_WIDTH_1239]: {
      padding: '2px 10px 2px 29px',
      height: '33px',
      fontSize: '0.775rem',
    },
    [MAX_WIDTH_767]: {
      padding: '2px 10px 2px 15px',
      height: '22px',
      fontSize: '0.5rem',
    },
  },
  inputHolder: {
    display: 'flex',
    position: 'relative',
    width: '187px',
    borderRadius: '3px',
    [MAX_WIDTH_1439]: {
      width: '166px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '336px',
      width: '100%',
    },
    [MAX_WIDTH_767]: {
      maxWidth: 'unset',
      width: '89px',
    },
  },
  icon: {
    display: 'flex',
    position: 'absolute',
    top: '11px',
    left: '17px',
    zIndex: 3,
    '& > svg': {
      width: '14px',
      height: '14px',
      '& path': {
        fill: '#797979',
      },
    },
    lineHeight: '16px',
    [MAX_WIDTH_1439]: {
      top: '10px',
      left: '15px',
      '& > svg': {
        width: '12px',
        height: '12px',
      },
    },
    [MAX_WIDTH_1239]: {
      top: '9.7px',
      left: '11.5px',
      '& > svg': {
        width: '0.775rem',
        height: '0.775rem',
      },
    },
    [MAX_WIDTH_767]: {
      top: '6px',
      left: '5px',
      '& > svg': {
        width: '8.8px',
        height: '8.8px',
      },
    },
  },
}));
