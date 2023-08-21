import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  dropDownWrapper: {
    position: 'relative',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    fontFamily: theme.fonts.Everett.Regular,
    width: '131px',
    padding: '13px 15px',
    background: theme.colors.lightDark,
    borderRadius: '3px',
    zIndex: 10,
    '& a:last-child': {
      marginBottom: '0px',
    },
  },
}));
