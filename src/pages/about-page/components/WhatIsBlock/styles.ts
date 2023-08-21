import { createUseStyles } from 'react-jss';

import gradient from 'assets/images/about-page/what-is/gradient.png';
import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1130px',
    marginInline: '155px',
    marginBlock: '100px',
    [MAX_WIDTH_1439]: {
      maxWidth: '875px',
      marginInline: 'auto',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '520px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '280px',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '112px',
    position: 'relative',
    [MAX_WIDTH_1439]: {
      gap: '86px',
    },
    [MAX_WIDTH_1239]: {
      gap: '51px',
    },
    [MAX_WIDTH_767]: {
      gap: '36px',
      flexDirection: 'column',
    },
  },
  leftContent: {
    [MAX_WIDTH_767]: {
      marginBlock: 'calc(2 * 43.94px + 27px) 0px',
    },
  },
  gradient: {
    width: 'fit-content',
    height: 'fit-content',
    position: 'relative',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${gradient})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '0.7',
      filter: 'blur(45.165px)',
    },
  },
  slideContainer: {
    display: 'flex',
    overflowX: 'hidden',
    width: '450px',
    height: '551px',
    position: 'relative',
    [MAX_WIDTH_1439]: {
      width: '347px',
      height: '425px',
    },
    [MAX_WIDTH_1239]: {
      width: '206px',
      height: '252px',
    },
    [MAX_WIDTH_767]: {
      width: '280px',
      height: '139px',
    },
  },
  title: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    marginBlock: '0px 32px',
    textTransform: 'uppercase',
    cursor: 'default',
    userSelect: 'none',
    ...textWithGradient,
    [MAX_WIDTH_1439]: {
      fontSize: '4.631rem',
      lineHeight: '4.341rem',
      marginBlock: '0px 24px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '2.746rem',
      lineHeight: '2.575rem',
      marginBlock: '0px 14px',
    },
    [MAX_WIDTH_767]: {
      position: 'absolute',
      top: 0,
      marginBlock: '0px',
    },
  },
  textContent: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    marginBlock: '0px 32px',
    fontFamily: theme.fonts.Everett.Light,
    '& > b': {
      fontFamily: theme.fonts.Everett.Medium,
    },
    '&:last-child': {
      marginBlock: '0px',
    },
    [MAX_WIDTH_1439]: {
      fontSize: '0.965rem',
      lineHeight: '1.544rem',
      marginBlock: '0px 24px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.573rem',
      lineHeight: '0.916rem',
      marginBlock: '0px 14px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.573rem',
      lineHeight: '0.916rem',
      marginBlock: '0px 28px',
    },
  },
  scrollBlockContainer: {
    width: '450px',
    height: '551px',
    position: 'relative',
    padding: '65px 30px 50px 61px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [MAX_WIDTH_1439]: {
      width: '347px',
      height: '425px',
      padding: '50px 10px 40px 44px',
    },
    [MAX_WIDTH_1239]: {
      width: '206px',
      height: '252px',
      padding: '30px 5px 20px 25px',
    },
    [MAX_WIDTH_767]: {
      width: '280px',
      height: '139px',
      padding: '33px 26px',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: '26px',
    },
  },
  scrollBlockTextContent: {
    fontFamily: theme.fonts.Everett.Medium,
    fontSize: '2rem',
    lineHeight: '2.25rem',
    textTransform: 'uppercase',
    marginBlock: 0,
    [MAX_WIDTH_1439]: {
      fontSize: '1.544rem',
      lineHeight: '1.736rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.916rem',
      lineHeight: '1.03rem',
    },
  },
  scrollBlockIcon: {
    width: '152px',
    height: '146px',
    [MAX_WIDTH_1439]: {
      width: '117px',
      height: '111px',
    },
    [MAX_WIDTH_1239]: {
      width: '70px',
      height: '66px',
    },
    [MAX_WIDTH_767]: {
      minWidth: '66px',
      minHeight: '63px',
    },
  },
  breakLine: {
    width: '100vw',
    height: '1px',
    background: theme.colors.lightGrey,
  },
}));
