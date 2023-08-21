import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  page: {
    flex: 1,
    width: '100%',
    marginTop: '70px',
    maxWidth: '1200px',
    padding: '0 0 50px',
    [MAX_WIDTH_1239]: {
      padding: '80px 45px 87px',
      maxWidth: '500px',
    },
    [MAX_WIDTH_767]: {
      padding: '40px 15px 40px',
    },
  },
  container: {
    width: '100%',
    [MAX_WIDTH_1239]: {
      justifyContent: 'center',
    },
  },
  flexRow: {
    display: 'flex',
    alignItems: 'start',
    width: '100%',
    marginTop: '20px',
    '& $formInputBox': {
      '& $formInput': {
        [MAX_WIDTH_1239]: {
          width: '95%',
        },
      },
    },
    '& $formInput': {
      marginTop: 0,
      marginRight: '10px',
    },
  },
  formGroupTitle: {
    fontSize: '1.125rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    lineHeight: '19px',
    [MAX_WIDTH_1239]: {
      marginTop: '15px',
      display: 'block',
      textAlign: 'center',
    },
  },
  inputInformationBox: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginTop: '45px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  generalInputs: {
    display: 'flex',
    [MAX_WIDTH_1239]: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  generalColumn: {
    display: 'flex',
    flexDirection: 'column',
    '&:first-child': {
      marginRight: '70px',
    },
    maxWidth: '330px',
    [MAX_WIDTH_1239]: {
      maxWidth: 'unset',
      '&:first-child': {
        marginRight: '0',
      },
    },
  },
  formInputBox: {
    height: '80px',
    [MAX_WIDTH_1239]: {
      width: '100%',
      height: '95px',
      '& $formInput': {
        width: '100%',
      },
    },
  },
  formInput: {
    width: '249px',
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
    marginTop: '12px',
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
  errorInput: {
    border: ['1px', 'solid', theme.colors.errorRed],
    '&::placeholder': {
      color: theme.colors.errorRed,
    },
  },
  formInputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    fontSize: '0.875rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
  },
  formInputFlex: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '14px',
    width: ' 100%',
    gap: '10px',
    '& > input': {
      marginTop: '0',
      marginRight: '6.65px',
    },
  },
  formUploadBtn: {
    composes: '$formBtn',
    width: '100%',
    height: '35px',
    fontSize: '0.75rem',
  },
  projectUrlBox: {
    composes: '$formInputBox',
  },
  formBtn: {
    border: 'none',
    outline: 'none',
    background: theme.colors.secondaryDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.763rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    borderRadius: '1.89px',
    cursor: 'pointer',
  },
  payBtn: {
    marginTop: '20px',
    height: '50px',
    width: '275px',
    fontSize: '1.063rem',
    '&:disabled': {
      background: theme.colors.lightGrey,
      color: theme.colors.black,
    },
    [MAX_WIDTH_1239]: {
      width: '100%',
    },
  },
  addFieldBtn: {
    composes: '$formBtn',
    width: '250px',
    height: '36px',
    fontSize: '0.6rem',
    [MAX_WIDTH_1239]: {
      margin: 'auto',
    },
  },
  walletWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '14px',
    height: '60px',
    position: 'relative',
    '& $formInput': {
      marginTop: 0,
    },
    [MAX_WIDTH_1239]: {
      justifyContent: 'center',
    },
  },
  deleteIcon: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: theme.colors.white,
    marginLeft: '10px',
    cursor: 'pointer',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
  },
  inputItem: {
    height: '60px',
  },
  formAgree: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
  },
  textAgree: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1rem',
    color: theme.colors.grey,
    marginLeft: '20px',
    '& > a': {
      color: theme.colors.secondaryDark,
    },
  },
  formInvalid: {
    color: theme.colors.errorRed,
    fontFamily: theme.fonts.Everett.Medium,
    fontSize: '0.875rem',
    display: 'block',
    margin: '15px 0',
  },
  approveText: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1rem',
    color: theme.colors.processingColor,
  },
  declineText: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1rem',
    color: theme.colors.declinedColor,
  },
  processingBox: {
    margin: '30px 0',
  },
  blurOverlay: {
    zIndex: 2,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
