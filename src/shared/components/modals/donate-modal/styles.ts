import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  account: {
    alignSelf: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  accountIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backgroundColor: theme.colors.secondaryDark,
    borderRadius: '50%',
    marginRight: '8px',
  },
  accountInfoHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  accountAvailableBalanceTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
  },
  accountAvailableBalanceAmount: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    color: theme.colors.white,
  },
  button: {
    '& button': {
      width: '100%',
      fontSize: '1.125rem',
      height: '42px',
    },
  },
}));
