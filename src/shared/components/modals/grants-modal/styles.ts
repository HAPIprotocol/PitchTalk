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
    backgroundColor: theme.colors.grantBaseColor,
    borderRadius: '50%',
    marginRight: '8px',
    '& svg circle': {
      fill: theme.colors.grantBaseColor,
    },
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
  currencyDropDownWrapper: {
    width: 'fit-content',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.lightGrey,
    '& svg': { marginLeft: '6px', transition: 'transform 0.1s ease-in' },
    '&.opened': {
      '& svg': {
        transform: 'rotate(180deg)',
        transition: 'transform 0.1s ease-in',
      },
    },
  },
  currencyDropDownMenu: {
    background: theme.colors.lightGrey,
    width: '98px',
    padding: '14px 0 13px 0',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  currencyDropDownItem: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.lightDark,
    width: '100%',
    height: '24px',
    paddingInline: '16px',
    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateColumns: '0.5fr 1fr',
    cursor: 'pointer',
    '& img': { width: '1rem', height: '1rem' },
    '& span': { fontSize: '0.75rem', height: '0.9rem' },
    '&:hover': { background: theme.colors.dropdownHoverBG },
  },
  currencyDropDownItemActive: {
    composes: '$currencyDropDownItem',
    background: theme.colors.dropdownBG,
    '&:hover': { background: theme.colors.dropdownBG },
    '& > span': { color: theme.colors.lightGrey },
  },
}));
