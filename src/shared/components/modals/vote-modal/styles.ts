import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  modalContainer: {
    padding: '48px 34px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    color: theme.colors.white,
  },
  votesModalTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '35px',
  },
  votesModalTitle: {
    fontSize: '1.25rem',
    textAlign: 'center',
    margin: 0,
  },
  votesModalSubTitle: {
    fontSize: '0.95rem',
    textAlign: 'center',
    color: theme.colors.ptGrey,
    margin: 0,
  },
  votesControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  votesLeft: {
    marginBlock: '0px',
  },
  voteInputControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  voteInput: {
    fontSize: '1.2rem',
    maxWidth: '64px',
    outline: 'none',
    background: 'transparent',
    color: theme.colors.white,
    textAlign: 'center',
    border: '1px solid #ACB3BD',
    borderRadius: '8px',
    padding: '12px',
  },
  voteInputDec: {
    width: '36px',
    height: '36px',
    backgroundColor: theme.colors.secondaryDark,
    border: 'none',
    borderRadius: '50%',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '2.5rem',
    cursor: 'pointer',
    color: theme.colors.white,
    position: 'relative',

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:disabled': {
      pointerEvents: 'none',
      color: theme.colors.black,
      backgroundColor: theme.colors.grey,
    },

    '&:hover': {
      backgroundColor: theme.colors.primaryHover,
      scale: 1.02,
    },
    '&:before': {
      content: '"-"',
      marginBottom: '3px',
    },
  },
  voteInputInc: {
    composes: '$voteInputDec',
    '&:before': {
      content: '"+"',
      marginBottom: '3px',
    },
  },
  voteButton: {},
}));
