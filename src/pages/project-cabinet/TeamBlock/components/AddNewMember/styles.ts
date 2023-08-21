import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '50px',
  },
  content: {
    position: 'relative',
    width: '300px',
    [MAX_WIDTH_767]: {
      width: '196px',
    },
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    height: '86px',
    width: '100%',
    marginBottom: '16px',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      marginBottom: '11px',
      '& span:nth-child(2)': {
        color: theme.colors.lightGrey,
        fontSize: '0.75rem',
      },
      [MAX_WIDTH_1439]: {
        fontSize: '0.75rem',
        lineHeight: '0.9rem',
      },
    },
    [MAX_WIDTH_1439]: {
      height: '75px',
      marginBottom: '4px',
    },
  },
  input: {
    height: '36px',
    padding: '6px 0px 6px 15px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
      height: '29px',
      padding: '6px 0px 6px 15px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.84rem',
      height: '29px',
      padding: '4px 0px 4px 12px',
    },
  },
  error: {
    height: 'unset',
    color: theme.colors.failed,
    margin: '6px 0px 0px',
    fontSize: '0.75rem',
    fontFamily: theme.fonts.Everett.Regular,
    [MAX_WIDTH_1439]: { fontSize: '0.65rem' },
  },
  errorBorder: {
    borderColor: theme.colors.failed,
    flex: 'unset',
    width: '100%',
  },
  inputContainer: {
    margin: '0px',
  },
  inputWrapper: {
    marginBottom: '27.5px',
  },
  inputWrapperError: {
    marginBottom: '10px',
  },
}));
