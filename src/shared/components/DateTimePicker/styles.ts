import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    position: 'relative',
    margin: '10px 0',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    paddingRight: '12px',
    borderRadius: '3px',
  },
  input: {
    flex: 2,
    width: '100%',
    backgroundColor: 'unset',
    color: theme.colors.grey,
    border: 'none',
    boxSizing: 'border-box',
    height: '36px',
    padding: '6px 0px 6px 20px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    outline: 'none',
    caretColor: theme.colors.secondaryDark,

    '&:read-only': {
      color: theme.colors.inputReadOnly,
      pointerEvents: 'none',
    },

    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
      padding: '4px 0px 4px 16px',
      height: '29px',
    },
  },
  inputHolder: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '3px',
  },
}));
