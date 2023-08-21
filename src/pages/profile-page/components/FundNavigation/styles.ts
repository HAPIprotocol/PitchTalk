import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    marginBottom: '30px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
    },
    '& button': {
      width: '163px',
      height: '49px',
      fontSize: '0.875rem',
      lineHeight: '17px',
      [MAX_WIDTH_767]: {
        width: '143px',
        height: '49px',
        fontSize: '0.8rem',
        padding: '4px 2px',
        lineHeight: '0.525rem',
      },
    },
  },
  text: {
    color: theme.colors.white,
    overflow: 'hidden',
    fontSize: '1.125rem',
    fontFamily: theme.fonts.Everett.Regular,
    marginLeft: '30px',
    [MAX_WIDTH_1239]: { marginTop: '30px', marginLeft: '0' },
    [MAX_WIDTH_767]: { fontSize: '1rem' },
  },
}));
