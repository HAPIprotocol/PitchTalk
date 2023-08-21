import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    padding: '80px 154px',
    [MAX_WIDTH_1439]: {
      padding: '91px 118px',
    },
    [MAX_WIDTH_1239]: {
      padding: '92px 20px',
    },
    [MAX_WIDTH_767]: {
      padding: '14px 20px',
    },
  },
  pageWrapper: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    width: '1131px',
    marginBottom: '95px',
    [MAX_WIDTH_1439]: {
      width: '987px',
      marginBottom: '84px',
    },
    [MAX_WIDTH_1239]: {
      width: '656px',
      marginBottom: '55px',
    },
    [MAX_WIDTH_767]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginBottom: '72px',
      overflowX: 'hidden',
    },
  },
  questionPath: {
    fontSize: '1rem',
    lineHeight: '1.2rem',
    color: theme.colors.grey,
    fontStyle: 'normal',
    '& span:first-child': {
      cursor: 'pointer',
      '&:hover': {
        color: theme.colors.secondaryDark,
        textDecoration: 'underline',
      },
    },
    '& span:last-child': {
      cursor: 'default',
      color: theme.colors.secondaryDark,
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.7rem',
      lineHeight: '1.05rem',
    },
  },
  question: {
    fontSize: '4rem',
    lineHeight: '4.8rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: {
      fontSize: '3.5rem',
      lineHeight: '4rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '3rem',
      lineHeight: '3.5rem',
    },
    [MAX_WIDTH_767]: {
      textAlign: 'center',
      fontSize: '2rem',
      lineHeight: '3rem',
    },
  },
  answer: {
    maxWidth: '700px',
    fontSize: '1.5rem',
    lineHeight: '2.125rem',
    marginBottom: '52px',
    color: theme.colors.grey,
    [MAX_WIDTH_1439]: {
      fontSize: '1.4rem',
      lineHeight: '1.9rem',
      marginBottom: '45px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      marginBottom: '40px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1rem',
      lineHeight: '1.3rem',
      marginBottom: '32px',
    },
  },
  imagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexFlow: 'row wrap',
    '& img': {
      width: '500px',
      height: '233px',
      objectFit: 'cover',
      objectPosition: '100% 0',
      marginRight: '35px',
      marginBottom: '35px',
      border: ['1px', 'solid', theme.colors.white],
      backgroundSize: '100% 100%',
    },
    '& img:last-child': {
      marginRight: '0px',
    },
    [MAX_WIDTH_1439]: {
      '& img': {
        width: '440px',
        marginRight: '0px',
        marginBottom: '30px',
      },
      '& img:first-child': {
        marginRight: '30px',
      },
    },
    [MAX_WIDTH_1239]: {
      '& img': {
        width: '300px',
        marginRight: '0px',
        marginBottom: '22px',
      },
      '& img:first-child': {
        marginRight: '22px',
      },
    },
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      '& img': {
        width: '300px',
        marginRight: '0px',
      },
      '& img:first-child': {
        marginRight: '0px',
      },
    },
  },
}));
