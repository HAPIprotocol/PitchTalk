import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { MAX_WIDTH_1239 } from '../../shared/constants';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    marginTop: '70px',
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    [MAX_WIDTH_1239]: {
      padding: '80px 45px 87px',
    },
  },
  headWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  titleWrapper: {
    marginLeft: '90px',
    maxWidth: '408px',
    [MAX_WIDTH_1239]: {
      marginLeft: '0',
      marginRight: '0',
    },
  },
  title: {
    display: 'block',
    fontSize: '2.25rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    [MAX_WIDTH_1239]: {
      fontSize: '1.813rem',
    },
  },
  howToForProjects: {
    display: 'block',
    fontSize: '0.875rem',
    color: theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Light,
    marginTop: '40px',
    [MAX_WIDTH_1239]: {
      display: 'none',
    },
  },
  description: {
    fontSize: '0.875rem',
    fontFamily: theme.fonts.Everett.Light,
    lineHeight: '20px',
    color: theme.colors.grey,
    maxWidth: '455px',
    '& > span': {
      display: 'block',
      '&:last-child': {
        paddingTop: '20px',
      },
    },
    [MAX_WIDTH_1239]: {
      marginTop: '20px',
      maxWidth: '700px',
    },
  },
  formWrapper: {
    marginTop: '62px',
  },
  stepTitle: {
    display: 'block',
    margin: 0,
    color: theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Light,
    position: 'relative',
    overflow: 'hidden',
    '&:after': {
      top: '50%',
      transform: 'translate(0, -50%)',
      content: '""',
      display: 'inline-block',
      position: 'absolute',
      verticalAlign: 'bottom',
      width: '100%',
      marginRight: '-100%',
      marginLeft: '22px',
      borderTop: ['1px', 'solid', theme.colors.lightGrey],
      borderRadius: '10px',
    },
  },
  formGroup: {
    marginLeft: '90px',
    padding: '65px 0',
    [MAX_WIDTH_1239]: {
      padding: '65px 0px',
      maxWidth: '500px',
      margin: '0 auto',
    },
  },

  generalColumn: {
    display: 'flex',
    flexDirection: 'column',
    '&:first-child': {
      marginRight: '112px',
    },
    maxWidth: '250px',
    [MAX_WIDTH_1239]: {
      maxWidth: 'unset',
      '&:first-child': {
        marginRight: '0',
      },
    },
  },
  formGroupColumn: {
    width: '23%',
    marginRight: '143px',
  },
  formInputWrapper: {
    display: 'flex',
    marginTop: '36px',
    '& > div': {
      '&:first-child': {
        marginRight: '23px',
        [MAX_WIDTH_1239]: {
          marginRight: 0,
        },
      },
    },
    [MAX_WIDTH_1239]: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  errorHeight: {
    height: '80px',
    [MAX_WIDTH_1239]: {
      width: '100%',
      height: '95px',
      '& input': {
        width: '100%',
      },
    },
  },
  marginInput: {
    marginTop: '15px',
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

  marginBottom: {
    marginBottom: '15px',
  },
  generalInputs: {
    display: 'flex',
    [MAX_WIDTH_1239]: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  projectUrlBox: {
    composes: '$formInputBox',
  },
  projectUrl: {
    width: '100%',
  },
  formTextareaBox: {
    minHeight: '192px',
    marginTop: '15px',
    [MAX_WIDTH_1239]: {
      width: '100%',
      '& textarea': {
        width: '100%',
      },
    },
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
  formInputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    fontSize: '0.875rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
  },
  formTextarea: {
    resize: 'none',
    minHeight: '133px',
    caretColor: theme.colors.inputFocused,
    '&:focus': {
      border: ['1px', 'solid', theme.colors.inputFocused],
    },
    '&::placeholder': {
      lineHeight: '1150%',
    },
  },
  formInput: {
    marginTop: '14px',
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
  formInvalid: {
    color: theme.colors.errorRed,
    fontFamily: theme.fonts.Everett.Medium,
    fontSize: '0.875rem',
    display: 'block',
    margin: '15px 0',
  },
  inputWidth: {
    width: '249px',
    height: '36px',
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
  },
  formUploadBtn: {
    composes: '$formBtn',
    width: '100%',
    height: '35px',
    fontSize: '0.75rem',
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
  payment: {
    fontSize: '1.125rem',
    lineHeight: '25px',
    fontFamily: theme.fonts.Everett.Light,
    color: theme.colors.white,
    [MAX_WIDTH_1239]: {
      paddingLeft: '15px',
    },
  },
  inputFullwidth: {
    width: '172px',
    height: '35px',
  },
  socialInput: {
    width: '141px',
  },
  socialWrapper: {
    display: 'flex',
    marginTop: '45px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  socialBlock: {
    marginRight: '33px',
    '&:last-child': {
      marginRight: '0',
    },
    [MAX_WIDTH_1239]: {
      marginTop: '20px',
      marginRight: 0,
      width: '100%',
      height: '95px',
      '& input': {
        width: '100%',
      },
    },
  },
  socialLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      width: '16.84px',
      height: '13.47px',
      marginRight: '12.8px',
    },
  },
  socialTitle: {
    marginTop: '53px',
    display: 'block',
    fontSize: '1.125rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    [MAX_WIDTH_1239]: {
      textAlign: 'center',
    },
  },
  paymantWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      '&:first-child': {
        marginTop: '36px',
        marginRight: '85px',
        [MAX_WIDTH_1239]: {
          marginRight: '0',
          width: '100%',
        },
      },
      '&:last-child': {
        width: '234px',
        [MAX_WIDTH_1239]: {
          marginTop: '20px',
          width: 'auto',
          maxWidth: '400px',
        },
      },
    },
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'normal',
      padding: '0 15px',
    },
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
  totalFee: {
    color: theme.colors.secondaryDark,
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1.25rem',
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
  disclamer: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1rem',
    color: theme.colors.white,
    alignItems: 'center',
    '& > img': {
      width: '12.76px',
      height: '11.26px',
      marginRight: '6.58px',
    },
  },
  disclamerDescription: {
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '0.563rem',
    color: theme.colors.grey,
    marginTop: '5.22px',
    display: 'block',
  },
  flexRow: {
    display: 'flex',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  inputInformationBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '45px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  none: {
    display: 'none',
  },
}));
