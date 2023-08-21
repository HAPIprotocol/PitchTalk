import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  line: {
    borderWidth: '0.25px',
    borderStyle: 'solid',
    borderColor: theme.colors.white,
    marginInline: '35px',
    flex: 1,
  },
  pitch: {
    width: '312px',
    [MAX_WIDTH_1439]: { width: '260px' },
    [MAX_WIDTH_1239]: {
      width: '100%',
      '&:not(:last-child)': { marginBottom: '53px' },
    },
    [MAX_WIDTH_767]: {
      maxWidth: '427px',
      marginInline: 'auto',
      '&:not(:last-child)': { marginBottom: '35px' },
    },
  },
  pitchName: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    marginBottom: '52px',
    [MAX_WIDTH_1439]: { marginBottom: '42px' },
    '& svg': {
      marginLeft: '13px',
      minWidth: '18px',
      [MAX_WIDTH_1439]: { width: '15px', height: '15px', marginLeft: '10px' },
    },
    '& label': {
      maxWidth: '280px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      color: theme.colors.secondaryDark,
      [MAX_WIDTH_1439]: {
        maxWidth: '220px',
        fontSize: '1.015rem',
        lineHeight: '1.215rem',
      },
      [MAX_WIDTH_767]: { maxWidth: 'unset' },
    },
  },
  pitchType: {
    display: 'flex',
    alignItems: 'center',
    '& > div:nth-child(2)': { marginInline: '15px' },
    marginBottom: '34px',
  },
  pitchTypeLabel: {
    padding: '8px 20px',
    height: 'unset',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.05rem',
    [MAX_WIDTH_1439]: {
      padding: '6px 16px',
      fontSize: '0.75rem',
      lineHeight: '0.9rem',
    },
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    height: '86px',
    width: '100%',
    marginBottom: '16px',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      marginBottom: '11px',
      '& span:nth-child(2)': {
        color: theme.colors.lightGrey,
        fontSize: '0.75rem',
      },
      [MAX_WIDTH_1439]: {
        fontSize: '0.75rem',
        lineHeight: '0.9rem',
      },
    },
    [MAX_WIDTH_1439]: {
      height: '75px',
      marginBottom: '4px',
    },
  },
  inputContainer: { margin: 0 },
  input: {
    height: '36px',
    padding: '6px 0px 6px 15px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.94rem',
      height: '29px',
      padding: '6px 0px 6px 15px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.84rem',
      height: '29px',
      padding: '4px 0px 4px 12px',
    },
  },
  controlsWrapper: {
    marginTop: '80px',
    [MAX_WIDTH_1239]: {
      marginTop: '30px',
    },
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    width: '325px',
    rowGap: '15px',
    [MAX_WIDTH_1439]: { width: '249px', rowGap: '12px' },
    [MAX_WIDTH_1239]: { marginInline: 'auto' },
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
  controlDates: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: '14px',
    [MAX_WIDTH_1439]: {
      height: '90px',
    },
  },
  smallDate: {
    fontSize: '0.85rem',
    paddingLeft: '9px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.65rem',
      paddingLeft: '6px',
    },
  },
  dateInputContainer: { flex: 'unset' },
  durationInput: {
    fontSize: '0.85rem',
    [MAX_WIDTH_1439]: {
      fontSize: '0.65rem',
    },
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
