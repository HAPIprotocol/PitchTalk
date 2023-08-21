import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  any,
  { isLoading?: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  modalWrapper: {
    width: 'unset',
    pointerEvents: (props) => (props.isLoading ? 'none' : 'auto'),
    filter: (props) => (props.isLoading ? 'blur(2px)' : 'none'),
    [MAX_WIDTH_767]: {
      width: '90%',
    },
  },
  wrapperStyles: {
    pointerEvents: (props) => (props.isLoading ? 'none' : 'auto'),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    color: theme.colors.white,
    marginBottom: '48px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  pictureInputs: {
    display: 'flex',
    gap: '30px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  pictureCenter: { justifyContent: 'center' },
  delimiter: {
    minWidth: '1px',
    backgroundColor: theme.colors.borderGray,
    [MAX_WIDTH_767]: {
      minHeight: '1px',
      width: '100%',
    },
  },
  uploadImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '25px',

    '& p': {
      margin: 'unset',
    },
  },
  uploadImageTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1rem',
    color: theme.colors.white,
    display: 'inline-flex',
    textAlign: 'center',
    '& svg': {
      marginLeft: 8,
    },
  },
  uploadImageInputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    '& > input': {
      marginRight: '6.65px',
    },
  },
  formBtn: {
    border: 'none',
    outline: 'none',
    background: theme.colors.secondaryDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.563rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    borderRadius: '1.89px',
    cursor: 'pointer',
    width: '70px',
    height: '35px',
    '&:disabled': {
      background: theme.colors.lightGrey,
      color: theme.colors.black,
    },
  },
  formBtnRed: {
    composes: '$formBtn',
    background: theme.colors.declinedColor,
    borderColor: theme.colors.declinedColor,
  },
  uploadImageInput: {
    width: '200px',
    height: '36px',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '1.8px',
    fontSize: '0.688rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    background: 'unset',
    textAlign: 'center',
    outline: 'none',
    caretColor: theme.colors.inputFocused,
    '&::placeholder': {
      fontSize: '0.688rem',
      color: theme.colors.lightGrey,
      fontFamily: theme.fonts.Everett.Light,
      textAlign: 'center',
    },
    '&:focus': {
      border: ['1px', 'solid', theme.colors.inputFocused],
      '&::placeholder': {
        color: 'transparent',
      },
    },
  },
  fileInput: {
    display: 'none',
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    gap: '30px',
  },
  button: {
    '& button': {
      backgroundColor: '#3C73DE',
      width: '100%',
      fontSize: '0.875rem',
      height: '36px',
    },
  },
  buttonSubmit: {
    '& button': {
      width: '200px',
      fontSize: '1.25rem',
      height: '42px',
      textTransform: 'uppercase',
    },
  },
  buttonClose: {
    composes: '$button',
    '& button': {
      width: '200px',
      fontSize: '1.25rem',
      height: '42px',
      textTransform: 'uppercase',
      backgroundColor: theme.colors.declinedColor,
      border: ['1px', 'solid', theme.colors.declinedColor],
      color: theme.colors.white,
      '&:hover': {
        backgroundColor: theme.colors.declinedColor,
        borderColor: theme.colors.declinedColor,
      },
    },
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    height: '42px',
    '&.exitCheck.projectCabinet': {
      gap: '33px',
      maxWidth: '430px',
    },
    [MAX_WIDTH_767]: {
      flexWrap: 'wrap',
      height: 'unset',
    },
  },
  smallButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '30px',
  },
  awareTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1rem',
    margin: 'unset',
    color: theme.colors.white,
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
    },
  },
}));
