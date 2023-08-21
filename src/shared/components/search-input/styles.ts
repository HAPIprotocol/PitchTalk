import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1439, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    position: 'relative',

    [MAX_WIDTH_1439]: {
      width: '177px',
    },
  },
  label: {
    alignContent: 'flex-start',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: 12,
    color: theme.colors.grey,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.disabledGrey,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: 3,
    height: 54,
    padding: '8px 16px 8px 44px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    lineHeight: 24,
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
      height: '28px',
    },
  },
  inputHolder: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    position: 'absolute',
    left: '14px',
    top: '9.5px',
    zIndex: 3,
    '& > svg': {
      width: '14px',
      height: '14px',
    },
    [MAX_WIDTH_767]: {
      left: '5.5px',
      top: '4px',
      '& > svg': {
        width: '5.5px',
        height: '5.5px',
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
    fontSize: '0.875rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.disabledGrey,
    outline: 'none',
    borderRadius: '3px',
    padding: '3px 4px',
    textDecoration: 'unset',
  },
  project: {
    composes: '$noResults',
    '&:hover': {
      backgroundColor: theme.colors.white,
      color: theme.colors.disabledGrey,
    },
  },
}));

export default useStyles;
