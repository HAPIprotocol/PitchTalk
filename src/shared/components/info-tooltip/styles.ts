import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, boolean, IAppTheme>((theme: IAppTheme) => ({
  tooltipContainer: {
    pointerEvents: 'visible',
    marginLeft: 8,
    '&:hover': {
      '& $tooltip': {
        visibility: 'visible'
      },
    },
    display: 'inline-flex',
    alignItems: 'center',
  },
  tooltipIcon: {
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
    [MAX_WIDTH_767]: {
      width: 10,
      height: 10
    }
  },
  tooltip: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: '105%',
    left: 0,
    padding: 15,
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '10px',
    backgroundColor: theme.colors.lightDark,
    color: theme.colors.lightGrey,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    minWidth: '175px',
    [MAX_WIDTH_1239]: {
      visibility: (visible: boolean) => visible ? 'visible' : 'hidden',
      fontSize: '0.5rem',
      padding: 8,
      minWidth: '140px',
    },
    [MAX_WIDTH_767]: {
      minWidth: 'unset'
    }
  }
}));