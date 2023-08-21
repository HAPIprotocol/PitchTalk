import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import { MAX_WIDTH_1239, MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
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
    },
    [MAX_WIDTH_1439]: {
      marginBottom: '28px',
      '& > label': { fontSize: '0.75rem', marginBottom: '10px' },
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
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
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
  nonLinearStages: {
    position: 'relative',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [MAX_WIDTH_1439]: { width: '250px' },
    [MAX_WIDTH_1239]: { width: '100%' },
  },
  stagesWrapper: {
    width: '100%',
    maxHeight: '628px',
    overflowY: 'auto',
    paddingRight: '10px',
    [MAX_WIDTH_1239]: {
      maxHeight: '512px',
    },
  },
  stageInputControl: {
    composes: '&inputControl',
    fontSize: '0.875rem',
    marginBottom: '18px',
    '& > label': {
      display: 'inline-block',
      marginBottom: '6px',
    },
    [MAX_WIDTH_1439]: {
      '& > label': { fontSize: '0.75rem' },
    },
  },
  stageHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      width: '12px',
      height: '12px',
      cursor: 'pointer',
      marginLeft: '6px',
    },
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
