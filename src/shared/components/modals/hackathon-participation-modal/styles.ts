import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
  },
  modal: {
    width: '450px',
    padding: '48px 52px 64px',
  },
  wrapper: {
    width: '300px',
  },
  controlInputWrapper: {
    marginBottom: '10px',
    '& input': {
      height: '42px',
      padding: '12px 0px 12px 16px',
    },
  },
  headText: {
    textAlign: 'center',
  },
  blurOverlay: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      background:
        'linear-gradient(to right, rgb(101, 62, 226) 10%, rgb(20, 20, 20) 42%)',
      '&:after, &:before': {
        background: 'rgb(20, 20, 20) 42%',
      },
    },
  },
}));
