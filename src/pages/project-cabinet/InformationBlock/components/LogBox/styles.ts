import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { isOnChainProject: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  logsContainer: {
    marginTop: '55px',
    width: ({ isOnChainProject }) => (isOnChainProject ? '598px' : '100%'),
    maxHeight: '421px',
    paddingRight: '23px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '28px',
    [MAX_WIDTH_1439]: {
      marginTop: '45px',
      width: () => '485px',
      paddingRight: '16px',
      rowGap: '23px',
    },
    [MAX_WIDTH_1239]: {
      marginTop: '35px',
      width: () => '330px',
      paddingRight: '8px',
      rowGap: '20px',
    },
    [MAX_WIDTH_767]: {
      marginTop: 'unset',
      width: () => '100%',
    },
  },
  logItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: ['1px', 'solid', theme.colors.white],
    paddingBottom: '21px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  action: {
    composes: '$comment',
    fontSize: '1rem',
    textTransform: 'uppercase',
  },
  comment: {
    color: theme.colors.white,
    marginBottom: '7px',
    fontSize: '0.875rem',
    lineHeight: '1.05rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: {
      marginBottom: '5px',
      fontSize: '0.71rem',
      lineHeight: '0.85rem',
    },
  },
  date: {
    color: theme.colors.lightGrey,
    fontSize: '0.625rem',
    lineHeight: '0.815rem',
    fontWeight: 400,
  },
  status: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95px',
    height: '26px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    '&.Success': {
      color: theme.colors.white,
      background: theme.colors.btnSuccess,
    },
    '&.Declined': {
      color: theme.colors.lightDark,
      background: theme.colors.failed,
    },
    [MAX_WIDTH_1439]: {
      width: '77px',
      height: '21px',
      borderRadius: '3px',
      fontSize: '0.625rem',
      lineHeight: '0.75rem',
    },
  },
  noLogs: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: '1.5rem',
    [MAX_WIDTH_1439]: { fontSize: '1.35rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.15rem' },
    [MAX_WIDTH_767]: { fontSize: '0.95rem' },
  },
}));
