import { createUseStyles } from 'react-jss';

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
  modal: {
    maxHeight: '95vh',
    overflow: 'auto',
    zIndex: 200,
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    width: 365,
    background: theme.colors.darkGrey,
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '10px',
    padding: '48px 52px 64px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
