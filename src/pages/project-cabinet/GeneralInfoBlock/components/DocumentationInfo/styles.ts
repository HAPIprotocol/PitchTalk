import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: '40px',
    [MAX_WIDTH_1439]: { marginTop: '32px' },
    [MAX_WIDTH_1239]: {
      marginTop: '27px',
      justifyContent: 'space-evenly',
    },
    [MAX_WIDTH_767]: {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      maxWidth: '427px',
      marginInline: 'auto',
    },
  },
  controlInput: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '329px',
    marginBottom: '25px',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '11px',
      '& svg': {
        width: '14px',
        height: '14px',
        marginRight: '10px',
        '& path': { fill: theme.colors.white },
      },
      '& span': {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.05rem',
        [MAX_WIDTH_1439]: { fontSize: '0.71rem', lineHeight: '0.85rem' },
      },
    },
    [MAX_WIDTH_1439]: {
      width: '267px',
      '& label': { marginBottom: '10px' },
      '& svg': { width: '12px', height: '12px', marginRight: '8px' },
    },
    [MAX_WIDTH_1239]: {
      width: '200px',
    },
    [MAX_WIDTH_767]: {
      width: '100%',
    },
  },
  inputContainer: {
    width: '100%',
    margin: 0,
    paddingRight: '30px',
  },
  input: {
    height: 'unset',
    padding: '10px 0px 10px 16px',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: { padding: '7px 0px 7px 12px' },
  },
  inputAndButtonWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: '13px',
    marginBottom: '18px',
    [MAX_WIDTH_1439]: { columnGap: '10px' },
  },

  error: {
    height: 'unset',
    color: theme.colors.failed,
    margin: '4px 0px -16px',
    fontSize: '0.625rem',
    fontFamily: theme.fonts.Everett.Regular,
  },
  errorContainer: { marginBottom: '7px' },
  errorBorder: { borderColor: theme.colors.failed },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    '& svg': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      width: '14px',
      height: '14px',
      cursor: 'pointer',
    },
    [MAX_WIDTH_1439]: {
      '& svg': {
        top: '8px',
        right: '8px',
        width: '13px',
        height: '13px',
      },
    },
    [MAX_WIDTH_1239]: {
      '& svg': {
        right: '5px',
        width: '12px',
        height: '12px',
      },
    },
  },
  buttonControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [MAX_WIDTH_1439]: { columnGap: '10px' },
    [MAX_WIDTH_767]: { justifyContent: 'flex-end' }
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
      }
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
      }
    }
  },
  blurOverlay: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: '-1px',
    width: '101%',
    height: '101%',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ...getInputInfoLabelStyles(theme),
}));
