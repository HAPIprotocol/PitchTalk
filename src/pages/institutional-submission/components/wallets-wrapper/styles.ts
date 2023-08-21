import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239 } from '../../../../shared/constants';
import { IAppTheme } from '../../../../shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  walletWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '14px',
    height: '60px',
    position: 'relative',
    '& $formInput': {
      marginTop: 0,
    },
    [MAX_WIDTH_1239]: {
      justifyContent: 'center',
    },
  },
  inputItem: {
    height: '60px',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteIcon: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: theme.colors.white,
    marginLeft: '10px',
    cursor: 'pointer',
  },
  formInput: {
    width: '249px',
    height: '36px',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '1.8px',
    fontSize: '0.688rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    background: 'unset',
    textAlign: 'center',
    outline: 'none',
    caretColor: theme.colors.inputFocused,
    marginTop: '12px',
    '&::placeholder': {
      fontSize: '0.688rem',
      color: theme.colors.lightGrey,
      fontFamily: theme.fonts.Everett.Light,
      textAlign: 'center',
    },
    '&:focus': {
      border: ['1px', 'solid', theme.colors.inputFocused],
      '&::placeholder': {
        color: 'transparent',
      },
    },
  },
  errorInput: {
    border: ['1px', 'solid', theme.colors.errorRed],
    '&::placeholder': {
      color: theme.colors.errorRed,
    },
  },
}));
