import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    position: 'relative',
    margin: '10px 0',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    paddingRight: '12px',
    borderRadius: '3px',
    caretColor: theme.colors.inputFocused,
  },
  borderFocus: {
    '&:focus-within': {
      border: ['1px', 'solid', theme.colors.inputFocused],
    },
  },
  errorContainer: {
    composes: '$container',
    borderColor: theme.colors.errorPink,
  },
  input: {
    flex: 2,
    width: '100%',
    backgroundColor: 'unset',
    color: theme.colors.grey,
    border: 'none',
    boxSizing: 'border-box',
    height: 52,
    padding: '16px 0px 16px 20px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    outline: 'none',
    caretColor: theme.colors.inputFocused,
    '&:read-only': {
      color: theme.colors.inputReadOnly,
      pointerEvents: 'none',
    },

    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
  inputHolder: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  setMaxButton: {
    width: 50,
    height: 24,
    color: theme.colors.secondaryDark,
    border: ['1px', 'solid', theme.colors.darkGrey],
    borderRadius: 3,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: '16px',
    cursor: 'pointer',
    letterSpacing: '0.28px',
    textTransform: 'uppercase',
    backgroundColor: 'unset',

    '&:disabled': {
      pointerEvents: 'none',
    },

    '&:hover': {
      borderColor: theme.colors.secondaryDark,
    },
  },
  errorMessage: {
    color: theme.colors.errorPink,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    height: '1.5rem',
    marginBottom: '10px',
  },
  infoLabel: {
    position: 'absolute',
    top: 0,
    left: '5px',
    paddingInline: '5px',
    fontSize: '0.85rem',
    transform: 'translate(0, -70%)',
    background: theme.colors.black,
  },
  endAdornment: {
    position: 'absolute',
    top: '50%',
    right: '-1px',
    paddingInline: '5px',
    fontSize: '0.85rem',
    transform: 'translate(0, -50%)',
    background: theme.colors.black,
    cursor: 'default',
    [MAX_WIDTH_1239]: {
      fontSize: '0.75rem',
      paddingInline: '4px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.65rem',
      paddingInline: '3px',
    },
  },
}));
