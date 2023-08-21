import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { EAuthorizationlType } from '../types';

export const useStyles = createUseStyles<
  string,
  { type: EAuthorizationlType },
  IAppTheme
>((theme: IAppTheme) => ({
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    width: '100%',
    borderRadius: '3px',
    background: theme.colors.authBtnBG,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
  btnContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  btnArrow: {
    marginInline: 'auto 8px',
    width: '16px',
  },
  authIconWrapper: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: ({ type }) => {
      if (type === EAuthorizationlType.Google) {
        return '#c4c4c41f';
      }
      return theme.colors.authIconBG;
    },
  },
  authIcon: {
    width: '24px',
    height: '24px',
  },
}));
