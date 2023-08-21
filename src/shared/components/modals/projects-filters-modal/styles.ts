import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  modal: {
    padding: '42px 43px 44px',
    width: '410px',
    background: theme.colors.lightDark,
    [MAX_WIDTH_767]: {
      width: '340px',
      padding: '27px 40px 29px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& h5': {
      color: theme.colors.lightGrey,
    },
  },
  statusFiltersContainer: {
    marginBottom: '36px',
    '& h5': {
      fontSize: '0.875rem',
      marginBottom: '20px',
      marginTop: 0,
    },
    [MAX_WIDTH_767]: {
      marginBottom: '24px',
      '& h5': { marginBottom: '16px', fontSize: '0.75rem' },
    },
  },
  sortedFiltersContainer: {
    color: theme.colors.lightGrey,
    marginBottom: '30px',
    '& h5': { fontSize: '0.875rem', marginBottom: '20px', marginTop: 0 },
    [MAX_WIDTH_767]: {
      marginBottom: '24px',
      '& h5': { marginBottom: '16px', fontSize: '0.75rem' },
    },
  },
  sortedFiltersWrapper: { display: 'flex', gap: '12px' },
  button: {
    '& button': { width: '100%', fontSize: '1.125rem', height: '42px' },
    [MAX_WIDTH_767]: {
      '& button': { fontSize: '0.875rem', height: '32px' },
    },
  },
  filteredProjectsAmount: {
    marginTop: '0px',
    marginBottom: '5px',
    textAlign: 'left',
  },
}));
