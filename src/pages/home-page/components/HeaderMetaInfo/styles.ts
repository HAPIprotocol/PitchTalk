import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  metaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '120px',
    [MAX_WIDTH_767]: {
      marginBottom: '84px',
      maxWidth: '328px',
      marginInline: 'auto',
    },
  },
  metaWrapper: {
    width: '100%',
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr 1fr auto',
    gap: '108px',
    [MAX_WIDTH_1239]: {
      gridTemplateColumns: 'auto auto',
      gridTemplateRows: 'auto auto',
      columnGap: '68px',
      rowGap: '72px',
    },
    [MAX_WIDTH_767]: {
      columnGap: '24px',
      rowGap: '48px',
    },
  },
  metaBlock: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '24px',
    cursor: 'default',
    userSelect: 'none',
    '&, & p': { marginBlock: 0, textAlign: 'center' },
  },
  metaLabel: {
    color: theme.colors.grey,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    [MAX_WIDTH_767]: {
      fontSize: '0.875rem',
      lineHeight: '1.225rem',
    },
  },
  metaAmount: {
    color: theme.colors.blueTeal,
    fontSize: '4rem',
    lineHeight: '4.8rem',
    [MAX_WIDTH_767]: {
      fontSize: '2rem',
      lineHeight: '2.4rem',
    },
  },
}));
