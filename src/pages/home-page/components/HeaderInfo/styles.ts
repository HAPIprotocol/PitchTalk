import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  headerContainer: {
    display: 'flex',
    gap: '47px',
    marginBottom: '8px',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
    },
    [MAX_WIDTH_767]: {
      alignItems: 'center',
    },
  },
  infoContainer: {
    width: '550px',
    [MAX_WIDTH_1439]: { width: '500px' },
    [MAX_WIDTH_1239]: { width: '550px' },
    [MAX_WIDTH_767]: { width: '312px' },
  },
  headerInfo: {
    marginBottom: '48px',
  },
  infoTitle: {
    fontSize: '3rem',
    lineHeight: '3.6rem',
    textTransform: 'uppercase',
    marginBlock: '80px 8px',
    [MAX_WIDTH_1439]: {
      fontSize: '3rem',
      lineHeight: '3.6rem',
      marginBlock: '80px 8px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '3rem',
      lineHeight: '3.6rem',
      marginBlock: '80px 8px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '2rem',
      lineHeight: '2.4rem',
      marginBlock: '0px 8px',
    },
  },
  infoDescription: {
    color: theme.colors.grey,
    fontWeight: 400,
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    marginBlock: '0px',
  },
  submissionBtns: {
    display: 'flex',
    gap: '24px',
    [MAX_WIDTH_767]: {
      width: '100%',
      flexDirection: 'column',
    },
  },
  submitBtn: {
    '& button': {
      width: '160px',
      height: '49px',
      borderRadius: '3px',
      padding: '12px',
      fontSize: '0.875rem',
    },
    [MAX_WIDTH_767]: {
      '& button': {
        width: '100%',
      },
    },
  },
  submitBtnOutlined: {
    composes: '$submitBtn',
    '& button': {
      background: 'transparent',
      border: ['1px', 'solid', theme.colors.secondaryDark],
      '&:hover, &:active': {
        background: 'transparent',
      },
      '&:disabled': {
        border: 'none',
      },
    },
  },
  mainImg: {
    width: '647px',
    height: '751px',
    [MAX_WIDTH_1439]: { width: '600px', height: '650px' },
    [MAX_WIDTH_1239]: { width: '647px', height: '750px' },
    [MAX_WIDTH_767]: { width: '312px', height: '362px' },
  },
}));
