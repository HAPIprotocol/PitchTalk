import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  wrapper: {
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backdropFilter: 'blur(10px)',
  },
  container: {},
  input: {
    width: '100%',
    height: '54px',
    backgroundColor: theme.colors.disabledGrey,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: 3,
    padding: '8px 20px 8px 64px',
    fontSize: '1.25rem',
    lineHeight: '24px',
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

    [MAX_WIDTH_767]: {
      padding: '4px 10px 4px 24px',
      height: '32px',
      fontSize: '0.75rem',
      lineHeight: '16px',
    },
  },
  inputHolder: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    width: '634px',
    borderRadius: '3px',
    [MAX_WIDTH_767]: {
      width: '270px',
      borderRadius: '1px',
    },
  },
  icon: {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '36px',
    zIndex: 3,
    '& > svg': {
      width: '20px',
      height: '20px',
      '& path': {
        fill: '#797979',
      },
    },
    [MAX_WIDTH_767]: {
      left: '6px',
      '& > svg': {
        width: '12px',
        height: '12px',
        '& path': {
          fill: '#797979',
        },
      },
    },
  },
  searchProjects: {
    zIndex: 5,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '218px',
    overflow: 'auto',
    backgroundColor: theme.colors.disabledGrey,
    borderRadius: '3px',
    padding: '12px 4px',
    right: 0,
    top: 'calc(100% + 8px)',
  },
  noResults: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.disabledGrey,
    outline: 'none',
    borderRadius: '3px',
    padding: '13px 14px',
    textDecoration: 'unset',
    lineHeight: '24px',
    [MAX_WIDTH_767]: {
      fontSize: '0.65rem',
      lineHeight: '16px',
      padding: '3px 7px',
    },
  },
  project: {
    composes: '$noResults',
    fontSize: '1.5rem',
    lineHeight: '24px',
    padding: '13px 14px',
    '&:hover': {
      backgroundColor: theme.colors.white,
      color: theme.colors.disabledGrey,
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.65rem',
      lineHeight: '16px',
      padding: '3px 7px',
    },
  },
  searchWrapper: {
    top: '20%',
    left: '50%',
    zIndex: 101,
    maxHeight: '95vh',
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
  },
}));
