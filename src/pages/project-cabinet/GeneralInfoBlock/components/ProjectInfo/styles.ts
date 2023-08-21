import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { isUpdated: boolean; isFailed: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '59px',
    marginTop: '32px',
    [MAX_WIDTH_1239]: {
      flexWrap: 'wrap',
    },
  },
  controlsWrapper: {
    width: '100%',
    minWidth: '670px',
    maxWidth: '870px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [MAX_WIDTH_1439]: {
      width: '670px',
      minWidth: 'unset',
      maxWidth: 'unset',
    },
    [MAX_WIDTH_1239]: {
      marginInline: 'auto',
      width: '543px',
    },
    [MAX_WIDTH_767]: {
      flexWrap: 'wrap',
      marginInline: 'auto',
      '& > div': {
        width: '100%',
        maxWidth: '427px',
        marginInline: 'auto',
      },
    },
  },
  result: {
    position: 'relative',
    width: '404px',
    minWidth: '404px',
    height: '222px',
    alignSelf: 'flex-end',
    marginBottom: '25px',
    [MAX_WIDTH_1439]: {
      minWidth: 'unset',
      width: '327px',
      height: '180px',
      marginBottom: '27px',
    },
    [MAX_WIDTH_1239]: {
      marginInline: 'auto',
    },
    [MAX_WIDTH_767]: {
      width: '427px',
      marginInline: 'auto',
    },
  },
  bannerWrapper: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  resultContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '63px',
    position: 'absolute',
    top: '18px',
    marginInline: '18px',
    '& img': {
      maxWidth: '83px',
      maxHeight: '83px',
    },
    '& span': {
      fontSize: '1.75rem',
      lineHeight: '1.95rem',
      maxWidth: '219px', // 'calc(401px - 63px - 36px - 83px)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    [MAX_WIDTH_1439]: {
      columnGap: '51px',
      marginInline: '16px',
      '& img': { maxWidth: '65px', maxHeight: '65px' },
      '& span': {
        fontSize: '1.435rem',
        lineHeight: '1.579rem',
        maxWidth: '151px', // 'calc(300px - 51px - 33px - 65px)'
      },
    },
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.05rem',
      marginBottom: '11px',
      [MAX_WIDTH_1439]: {
        fontSize: '0.71rem',
        lineHeight: '0.85rem',
        marginBottom: '10px',
      },
    },
  },
  inputContainer: {
    width: '100%',
    margin: 0,
  },
  input: {
    height: 'unset',
    padding: '10px 0px 10px 16px',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: { padding: '7px 0px 7px 12px' },
  },
  imagesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    columnGap: '8px',
    justifyContent: 'center',
  },
  inputAndButtonWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    columnGap: '8px',
    flex: 1,
    [MAX_WIDTH_1439]: { columnGap: '10px' },
  },
  uploadBtn: {
    '& button': {
      width: '80px',
      height: '34px',
      padding: 'unset',
      fontSize: '0.75rem',
    },
    [MAX_WIDTH_1439]: {
      '& button': { width: '66px', height: '30px', fontSize: '0.61rem' },
    },
  },
  inputName: {
    marginBottom: '25px',
    width: '100%',
    minWidth: '249px',
    maxWidth: '349px',
    [MAX_WIDTH_1439]: {
      width: '249px',
      minWidth: 'unset',
      maxWidth: 'unset',
    },
    [MAX_WIDTH_1239]: {
      width: '202px',
    },
    [MAX_WIDTH_767]: { width: '100%' },
  },
  controlsWrapperContainer: {
    width: '100%',
    '&:first-child': {
      marginRight: '40px',
    },
    [MAX_WIDTH_1439]: {
      width: 'unset',
      '&:first-child': {
        marginRight: 'unset',
      },
    },
    [MAX_WIDTH_767]: {
      '&:first-child': {
        marginRight: 'auto',
      },
    },
  },
  inputDesc: {
    height: '169px',
    width: '100%',
    minWidth: '249px',
    maxWidth: '349px',
    '&.withError textarea': {
      border: ['1px', 'solid', theme.colors.failed],
    },
    [MAX_WIDTH_1439]: {
      width: '249px',
      height: '150px',
      minWidth: 'unset',
      maxWidth: 'unset',
    },
    [MAX_WIDTH_1239]: {
      width: '202px',
    },
    [MAX_WIDTH_767]: { width: '100%' },
  },
  textArea: {
    maxHeight: '126px',
    width: '100%',
    height: '100%',
    flex: '2',
    color: theme.colors.grey,
    border: ['1px', 'solid', theme.colors.secondaryDark],
    outline: 'none',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    boxSizing: 'border-box',
    fontFamily: theme.fonts.Everett.Regular,
    backgroundColor: 'unset',
    borderRadius: '3px',
    resize: 'none',
    padding: '5px 0px 5px 12px',
    caretColor: theme.colors.inputFocused,
    '&:focus': {
      border: ['1px', 'solid', theme.colors.inputFocused],
    },
    '&:read-only': {
      color: theme.colors.inputReadOnly,
      cursor: 'default',
      userSelect: 'none',
      '&:focus': {
        border: ['1px', 'solid', theme.colors.secondaryDark],
      },
    },
    [MAX_WIDTH_1439]: { maxHeight: '109px' },
  },
  textAreaWrapper: {
    position: 'relative',
    height: '100%',
  },
  inputUrl: {
    marginBottom: '25px',
    width: '100%',
    minWidth: '309px',
    maxWidth: '409px',
    [MAX_WIDTH_1439]: {
      width: '309px',
      minWidth: 'unset',
      maxWidth: 'unset',
    },
    [MAX_WIDTH_1239]: {
      width: '250px',
    },
    [MAX_WIDTH_767]: { width: '100%' },
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
    composes: '$inputContainer',
    marginBottom: '5px',
    [MAX_WIDTH_1439]: { marginBottom: '7px' },
  },
  errorBorder: { borderColor: theme.colors.failed },
  infoLabel: {
    position: 'absolute',
    top: 0,
    left: '5px',
    paddingInline: '5px',
    fontSize: '0.85rem',
    transform: 'translate(0, -70%)',
    background: theme.colors.black,
  },
  formInputLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.05rem',
    marginBottom: '11px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.71rem',
      lineHeight: '0.85rem',
      marginBottom: '10px',
    },
  },
  formUploadBtn: {
    border: 'none',
    outline: 'none',
    background: ({ isUpdated, isFailed }) =>
      isUpdated
        ? theme.colors.processingColor
        : isFailed
        ? theme.colors.declinedColor
        : theme.colors.secondaryDark,
    '&.default': {
      background: theme.colors.secondaryDark,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    borderRadius: '1.89px',
    cursor: 'pointer',
    width: '100%',
    height: '35px',
    fontSize: '0.75rem',
    marginBottom: '3px',
    '&:disabled': {
      background: theme.colors.lightGrey,
      color: theme.colors.black,
      pointerEvents: 'none',
    },
  },
  statusMessage: {
    color: ({ isUpdated, isFailed }) =>
      isUpdated
        ? theme.colors.processingColor
        : isFailed
        ? theme.colors.declinedColor
        : theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    margin: '3px',
    maxWidth: '100%',
  },
  errorMessage: {
    composes: '$statusMessage',
    color: theme.colors.errorPink,
  },
  ...getInputInfoLabelStyles(theme),
  projectLogo: {
    maxWidth: '80px',
    maxHeight: '80px',
    padding: '3px',
    [MAX_WIDTH_1239]: {
      maxWidth: '75px',
      maxHeight: '75px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '65px',
      maxHeight: '65px',
    },
  },
}));
