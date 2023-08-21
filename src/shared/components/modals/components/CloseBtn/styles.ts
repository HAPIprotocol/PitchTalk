import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  closeBtnContainer: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    padding: '4px',
    background: theme.colors.closeBtnBG,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
  closeBtnIcon: {
    width: '14px',
    height: '14px',
    '& rect': {
      fill: theme.colors.white,
    },
  },
}));
