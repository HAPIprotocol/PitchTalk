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
    marginBottom: '24px',
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
  minAndMax: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  minAndMaxItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 14px',

    '&:first-child': {
      borderRight: ['1px', 'solid', theme.colors.grey],
      paddingLeft: 'unset',
    },
    '&:last-child': {
      borderLeft: ['1px', 'solid', theme.colors.grey],
      paddingRight: 'unset',
    },
  },
  amountTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
  },
  amount: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    color: theme.colors.white,
  },
  tokenAmountInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    lineHeight: '0.813rem',
    color: theme.colors.grey,
    marginBottom: '16px',
  },
  tokensAmount: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: '0.975rem',
    color: theme.colors.secondaryDark,
    marginTop: '2px',
  },
  termsContainer: {
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'flex-start',
    marginTop: '14px',
    '& input[type="checkbox"]': {
      marginTop: '4px',
    },
  },
  terms: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
    marginRight: '37px',
    maxWidth: '210px',
  },
  warningColor: {
    color: '#DE6D3C',
  },
  warningBorder: {
    borderColor: '#DE6D3C',
  },
}));
