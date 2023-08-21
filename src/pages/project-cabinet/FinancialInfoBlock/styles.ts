import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

import { getInputInfoLabelStyles } from '../utils';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    marginTop: '100px',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    columnGap: '115px',
    height: '732px',
    [MAX_WIDTH_1439]: {
      height: '600px',
    },
    [MAX_WIDTH_1239]: {
      height: 'unset',
      flexWrap: 'wrap',
      marginInline: 'auto',
      width: '70%',
    },
    [MAX_WIDTH_767]: {
      width: '100%',
      maxWidth: '427px',
    },
  },
  projectTokensInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px',
    maxWidth: '325px',
    height: '100%',
    [MAX_WIDTH_1439]: { maxWidth: '263px' },
    [MAX_WIDTH_1239]: { maxWidth: 'unset', width: '100%' },
  },
  vestingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [MAX_WIDTH_1239]: {
      width: '100%',
    },
  },
  controlsWrapper: {
    alignSelf: 'center',
    margin: 'auto 0px 0px',
    [MAX_WIDTH_1239]: {
      marginInline: 'auto',
    },
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    width: '325px',
    rowGap: '15px',
    [MAX_WIDTH_1439]: { width: '263px', rowGap: '12px' },
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
  projectToken: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '32px',
    marginBottom: '50px',
    height: '120px',
    '& > label': { marginBottom: '10px' },
    [MAX_WIDTH_1439]: {
      marginTop: '25px',
      '& > label': { fontSize: '0.75rem', marginBottom: '10px' },
    },
    [MAX_WIDTH_767]: {
      height: 'unset',
    },
  },
  saveFtTokenBtn: {
    marginTop: '10px',
    '& button': {
      width: '100%',
      height: '34px',
      fontSize: '0.75rem',
      lineHeight: '0.9rem',
      padding: '10px 20px',
    },
    [MAX_WIDTH_1439]: {
      '& button': {
        height: '30px',
        fontSize: '0.61rem',
        padding: '8px 16px',
      },
    },
  },
  tokenSelectWrapper: {
    display: 'flex',
    marginBottom: '15px',
  },
  vestingToken: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '32px',
    '& > label': { marginBottom: '10px' },
    [MAX_WIDTH_1439]: {
      '& > label': { fontSize: '0.75rem', marginBottom: '10px' },
    },
  },
  vestingTokenInfo: {
    width: '100%',
    flex: 1,
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    marginLeft: '21px',
    color: theme.colors.lightGrey,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [MAX_WIDTH_1439]: {
      fontSize: '0.69rem',
      lineHeight: '0.825rem',
      marginLeft: '17px',
    },
  },
  vestingTokenInput: {
    padding: '11px 0px 11px 20px',
    fontSize: '0.9rem',
    lineHeight: '1.1rem',
    [MAX_WIDTH_1439]: {
      padding: '6xp 0px 6px 16px',
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
    },
  },
  vestingTokenInputContainer: {
    width: '100%',
    height: '36px',
  },
  warning: {
    textAlign: 'center',
    color: theme.colors.errorRed,
    fontSize: '0.8rem',
    [MAX_WIDTH_767]: {
      fontSize: '0.75rem',
    },
  },
  warningWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10px',
  },
  sendTokensBtn: {
    width: '100%',
    '& button': { width: '100%', fontSize: '1rem', marginBlock: '10px' },
    [MAX_WIDTH_1439]: { '& button': { fontSize: '0.8rem' } },
    [MAX_WIDTH_1239]: { '& button': { fontSize: '0.75rem' } },
    [MAX_WIDTH_767]: { '& button': { fontSize: '0.7rem' } },
  },
  tokensWarningWrapper: {
    composes: '$warningWrapper',
    marginBlock: '0px 10px',
  },
  ...getInputInfoLabelStyles(theme),
}));
