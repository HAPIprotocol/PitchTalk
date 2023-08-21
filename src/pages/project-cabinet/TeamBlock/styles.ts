import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    marginTop: '100px',
  },
  teamBlockContentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '50px',
    maxHeight: '1000px',
    overflowY: 'auto',
    padding: '10px',
    '&.isEdit': {
      flexDirection: 'column',
      flexWrap: 'nowrap',
    },
    [MAX_WIDTH_767]: {
      gap: '25px',
      '&.isEdit': {
        alignItems: 'center',
      },
    },
  },
  teamMember: {
    display: 'flex',
    '&.isEdit': {
      width: '80%',
      flexDirection: 'column',
      marginInline: 'auto',
      borderBottom: ['1px', 'solid', theme.colors.secondaryDark],
      paddingBottom: '50px',
      [MAX_WIDTH_1239]: { paddingBottom: '40px' },
      [MAX_WIDTH_767]: { paddingBottom: '30px' },
    },
  },
  teamBlockContent: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    [MAX_WIDTH_767]: {
      gap: '50px',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  saveBtn: {
    width: '100%',
    '& button': {
      width: '100%',
      height: '77px',
      fontSize: '1.25rem',
    },
    [MAX_WIDTH_1439]: { '& button': { height: '62px', fontSize: '1.015rem' } },
  },
  controlsWrapper: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '80px',
    [MAX_WIDTH_1239]: { marginTop: '30px' },
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    width: '325px',
    rowGap: '15px',
    [MAX_WIDTH_1439]: { width: '249px', rowGap: '12px' },
    [MAX_WIDTH_1239]: { marginInline: 'auto' },
  },
  comment: {
    width: '100%',
    color: theme.colors.grey,
    backgroundColor: 'unset',
    border: ['1px', 'solid', theme.colors.lightGrey],
    borderRadius: '3px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    padding: '10px 0px 10px 12px',
    outline: 'none',
    resize: 'none',
  },
  noTeam: {
    textAlign: 'center',
    fontSize: '1.5rem',
    [MAX_WIDTH_1439]: { fontSize: '1.4rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.25rem' },
    [MAX_WIDTH_767]: { fontSize: '1rem' },
  },
}));
