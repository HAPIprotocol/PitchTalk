import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { MAX_WIDTH_1239 } from '../../constants';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  mobileContainer: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  mobileInputs: {
    position: 'relative',
  },
  mobileText: {
    fontSize: '22px',
    fontFamily: theme.fonts.Everett.Light,
    color: theme.colors.white,
    padding: '0 30px',
    textAlign: 'center',
  },
  blurOverlay: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: '-1px',
    width: '101%',
    height: '101%',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroupTitle: {
    fontSize: '16px',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    lineHeight: '19px',
    [MAX_WIDTH_1239]: {
      marginTop: '15px',
      display: 'block',
    },
  },
  formBtn: {
    border: 'none',
    outline: 'none',
    background: theme.colors.secondaryDark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '9px',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    borderRadius: '1.89px',
    cursor: 'pointer',
  },

  formInput: {
    marginTop: '14px',
    width: '100%',
    height: '31px',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '1.8px',
    fontSize: '9px',
    color: theme.colors.lightGrey,
    fontFamily: theme.fonts.Everett.Light,
    background: 'unset',
    textAlign: 'center',
    outline: 'none',
    '&::placeholder': {
      fontSize: '9px',
      color: theme.colors.lightGrey,
      fontFamily: theme.fonts.Everett.Light,
      textAlign: 'center',
    },
  },
  formInputFlex: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '14px',
    width: ' 100%',
    '& > input': {
      marginTop: '0',
      marginRight: '6.65px',
    },
  },
  formUploadBtn: {
    width: '70.35px',
    height: '31.18px',
    '&:disabled': {
      background: theme.colors.lightGrey,
      color: theme.colors.black,
    },
  },
  payBtn: {
    marginTop: '20px',
    height: '63px',
    width: '100%',
    fontSize: '17px',
    '&:disabled': {
      background: theme.colors.lightGrey,
      color: theme.colors.black,
    },
  },
}));
