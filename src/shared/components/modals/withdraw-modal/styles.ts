import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  },
  availableAmount: {
    fontSize: '1.15rem',
    margin: '0px 0px 30px',
    '& span': { textTransform: 'capitalize' },
  },
  controlBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  amountBlock: { marginBottom: '20px' },
  walletInput: {
    padding: '10px 0px 10px 16px',
    height: 'unset',
    fontSize: '0.865rem',
  },
  amountInput: {
    padding: '14px 0px 14px 16px',
    height: 'unset',
    width: '153px',
    fontSize: '1.125rem',
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    height: '85px',
  },
  withdrawButton: {
    '& button': {
      width: '100%',
      fontSize: '1.125rem',
      height: '42px',
      marginTop: '15px',
    },
  },
  errorMsg: {
    height: 'unset',
    marginBottom: '0px',
  },
  modalHead: {
    marginBottom: '20px',
    '& p': {
      fontSize: '1.5rem',
      color: theme.colors.white,
      margin: '0px 0px 6px',
    },
  },
  withdrawAmount: {
    '& p': {
      color: theme.colors.grey,
      fontSize: '0.825rem',
      marginBottom: '2px',
    },
    '& span': {
      color: theme.colors.white,
      lineHeight: '1.2rem',
      marginBottom: '9px',
    },
  },
  tokenInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.18rem',
    lineHeight: '1.65rem',
    color: theme.colors.grey,
    '& img': { width: '21px', height: '21px', marginRight: '5px' },
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
}));
