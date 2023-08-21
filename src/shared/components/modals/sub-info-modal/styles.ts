import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  modalStyles: {
    padding: '48px 32px',
    [MAX_WIDTH_767]: {
      padding: '32px 24px',
      width: '300px',
    },
  },
  title: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    color: theme.colors.white,
    marginBottom: '32px',
    textAlign: 'center',
    [MAX_WIDTH_767]: {
      fontSize: '0.95rem',
      marginBottom: '24px',
    },
  },
  button: {
    '& button': {
      width: '100%',
      fontSize: '1.125rem',
      height: '42px',
    },
    [MAX_WIDTH_767]: {
      '& button': {
        width: '75%',
        fontSize: '0.95rem',
        height: '32px',
      },
    },
  },
  checkBoxWrapper: {
    color: theme.colors.lightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '0.95rem',
    marginBottom: '24px',
    textAlign: 'center',
    [MAX_WIDTH_767]: {
      gap: '8px',
      fontSize: '0.75rem',
      marginBottom: '16px',
    },
  },
}));
