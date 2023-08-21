import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  transfersContainer: {
    width: '100%',
    marginTop: '32px',
    [MAX_WIDTH_1439]: { marginTop: '28px' },
  },
  willAvailableSoon: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: '1.5rem',
    [MAX_WIDTH_1439]: { fontSize: '1.35rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.15rem' },
    [MAX_WIDTH_767]: { fontSize: '0.95rem' },
  },
  transfersTable: {
    width: '100%',
    textAlign: 'center',
    '& tr': {
      display: 'table',
      tableLayout: 'fixed',
      width: 'calc(100% - 20px)',
      marginRight: '-20px',
      padding: '23px 0px',
      borderBottomWidth: '0.5px',
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.white,
      lineHeight: '1.2rem',
      fontWeight: 400,
    },
    [MAX_WIDTH_1439]: {
      '& tr': {
        width: 'calc(100% - 16px)',
        marginRight: '-16px',
        padding: '17px 0px',
        fontSize: '0.81rem',
        lineHeight: '0.975rem',
      },
    },
  },
  transfersTableHead: {
    width: '100%',
    display: 'block',
    '& tr': { color: theme.colors.lightGrey },
  },
  transfersTableBody: {
    width: '100%',
    display: 'block',
    maxHeight: '200px',
    overflowY: 'auto',
    '& tr': { color: theme.colors.white },
    '& td': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    [MAX_WIDTH_1439]: { maxHeight: '168px' },
  },
  transferType: { textTransform: 'capitalize' },
}));
