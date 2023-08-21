import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    width: '384px',
    [MAX_WIDTH_767]: {
      padding: '34px 26px',
      width: '350px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '304px',
    [MAX_WIDTH_767]: {
      width: 'unset',
    },
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentTitle: {
    width: '100%',
    color: theme.colors.white,
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBlock: '0px 12px',
  },
  subContent: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: 400,
    margin: 0,
    lineHeight: '140%',
  },
  userName: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 3,
    marginBlock: '32px 0px',
    maxWidth: '304px',
  },
  controlsButtons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '32px',
  },
  primaryBtn: {
    width: '100%',
    '& button': {
      height: '49px',
      width: '100%',
      padding: '16px 32px',
    },
  },
  secondaryBtn: {
    width: '100%',
    '& button': {
      height: '49px',
      width: '100%',
      padding: '16px 32px',
      background: theme.colors.userNameModalSecondaryBtn,
      '&:hover, &:active': {
        background: theme.colors.userNameModalSecondaryBtn,
      },
    },
  },
  userNameContainer: {
    width: '100%',
    marginBlock: '12px 0px',
  },
  userNameInputLabel: {
    color: theme.colors.grey,
    fontSize: '0.75rem',
  },
  userNameInput: {
    marginBlock: '8px',
    display: 'flex',
    height: '40px',
    padding: '8px 16px',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    color: theme.colors.white,
    outline: 'none',
    border: `2px solid ${theme.colors.secondaryDark}`,
    borderRadius: '2px',
    fontSize: '1rem',
    background: theme.colors.darkGrey,
    '&::placeholder': {
      fontSize: '0.875rem',
      color: theme.colors.lightGrey,
    },
    '&:focus': {
      transition: 'all ease 0.5s',
      border: `2px solid ${theme.colors.inputFocused}`,
    },
    transition: 'all ease 0.5s',
  },
  userNameError: {
    color: theme.colors.errorRed,
    fontSize: '0.75rem',
    margin: 0,
  },
  successTitle: {
    color: theme.colors.white,
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBlock: '12px 0px',
  },
}));
