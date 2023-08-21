import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    marginTop: '32px',
    display: 'flex',
    columnGap: '35px',
    [MAX_WIDTH_1439]: {
      marginTop: '25px',
      columnGap: '30px',
    },
    [MAX_WIDTH_767]: {
      flexWrap: 'wrap',
    },
  },
  commonSettings: {
    width: '310px',
    '& > :last-child': { marginBottom: '0px' },
    [MAX_WIDTH_1439]: { width: '250px' },
    [MAX_WIDTH_1239]: { width: '100%', marginBottom: '30px' },
  },
  inputControl: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '36px',
    '& > label': {
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '11px',
      '& span': {
        display: 'inline-flex',
        alignItems: 'center',
      },

      '& svg': {
        marginLeft: 6,
      },
    },
    [MAX_WIDTH_1439]: {
      marginBottom: '28px',
      '& > label': {
        width: '100%',
        fontSize: '0.75rem',
        marginBottom: '10px',
        '& svg': {
          width: '14.5px',
          height: '14.5px',
        },
      },
    },
  },
  dateInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    [MAX_WIDTH_1439]: { columnGap: '15px' },
  },
  dateInput: {
    alignItems: 'flex-start',
    '& > div': { flex: 'unset', width: '100%' },
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
    },
  },
  smallDateInput: {
    fontSize: '0.75rem',
    paddingLeft: '9px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.6rem',
      paddingLeft: '6px',
    },
  },
  inputContainer: { margin: '0px' },
  amountInput: {
    height: '36px',
    padding: '6px 0px 6px 20px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
      height: '29px',
      padding: '4px 0px 4px 16px',
    },
  },
  stageHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhaseBtn: { position: 'sticky', marginTop: '10px' },
  error: {
    height: 'unset',
    color: theme.colors.failed,
    margin: '6px 0px 0px',
    fontSize: '0.75rem',
    fontFamily: theme.fonts.Everett.Regular,
    [MAX_WIDTH_1439]: { fontSize: '0.65rem' },
  },
  errorContainer: {
    composes: '$inputContainer',
    marginBottom: '16px',
    [MAX_WIDTH_1439]: { marginBottom: '10px' },
  },
  errorBorder: {
    borderColor: theme.colors.failed,
    flex: 'unset',
    width: '100%',
  },
  processingWrapper: {
    position: 'relative',
  },
  processingLabel: {
    composes: '$processingColor',
    position: 'absolute',
    top: 0,
    left: '5px',
    paddingInline: '5px',
    fontSize: '0.85rem',
    transform: 'translate(0, -70%)',
    background: theme.colors.black,
  },
  ...getInputInfoLabelStyles(theme),
}));
