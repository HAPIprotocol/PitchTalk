import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import { MAX_WIDTH_1439, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  teamBlockContentSettings: {
    maxWidth: '300px',
    width: '100%',
    [MAX_WIDTH_767]: { order: 1 },
  },
  buttonControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
    [MAX_WIDTH_1439]: { columnGap: '10px' },
    [MAX_WIDTH_767]: { justifyContent: 'flex-end' },
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    height: '86px',
    width: '100%',
    marginBottom: '16px',
    [MAX_WIDTH_1439]: {
      height: '75px',
      marginBottom: '4px',
    },
  },
  inputContainer: { margin: 0 },
  input: {
    height: 'unset',
    padding: '10px 0px 10px 16px',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: { padding: '7px 0px 7px 12px' },
  },
  error: {
    height: 'unset',
    color: theme.colors.failed,
    margin: '6px 0px 0px',
    fontSize: '0.75rem',
    fontFamily: theme.fonts.Everett.Regular,
    [MAX_WIDTH_1439]: { fontSize: '0.65rem' },
  },
  errorContainer: {
    marginBottom: '16px',
    [MAX_WIDTH_1439]: { marginBottom: '4px' },
  },
  errorBorder: {
    borderColor: theme.colors.failed,
    flex: 'unset',
    width: '100%',
  },
  saveBtn: {
    '& button': {
      width: '100px',
      height: '34px',
      padding: 'unset',
      fontSize: '0.75rem',
    },
    [MAX_WIDTH_1439]: {
      '& button': {
        width: '75px',
        height: '30px',
        fontSize: '0.61rem',
      },
    },
  },
  uploadButton: {
    composes: '$saveBtn',
    '& button': {
      background: 'none',
      color: '#3C73DE',
      border: ['1px', 'solid', '#3C73DE'],
      '&:hover': {
        color: theme.colors.white,
        background: '#3C73DE',
      },
    },
  },
  clearButton: {
    composes: '$saveBtn',

    '& button': {
      background: 'none',
      color: theme.colors.declinedColor,
      border: ['1px', 'solid', theme.colors.declinedColor],
      '&:hover': {
        color: theme.colors.white,
        background: theme.colors.declinedColor,
      },
    },
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    lineHeight: '1.05rem',
    marginBottom: '11px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.75rem',
      lineHeight: '0.9rem',
    },
  },
  inputLabelWithIcon: {
    composes: '$inputLabel',
  },
  ...getInputInfoLabelStyles(theme),
}));
