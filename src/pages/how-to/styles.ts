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
  pageHeader: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    marginBottom: '110px',
    [MAX_WIDTH_767]: {
      marginBottom: '45px',
      alignSelf: 'center',
    },
  },
  pageTitle: {
    fontWeight: 400,
    fontSize: '3rem',
    lineHeight: '3.6rem',
    [MAX_WIDTH_1439]: {
      fontSize: '2.625rem',
      lineHeight: '3.125rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '3rem',
      lineHeight: '3.625rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '2.025rem',
      lineHeight: '2.425rem',
      textAlign: 'center',
    },
  },
  sectionsWrapper: {
    width: '100%',
  },
  pageSubTitle: {
    fontWeight: 400,
    color: theme.colors.grey,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    '& label': {
      cursor: 'pointer',
      '&:hover': {
        color: theme.colors.secondaryDark,
        textDecoration: 'underline',
      },
    },
    [MAX_WIDTH_1439]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.69rem',
      lineHeight: '1.05rem',
      textAlign: 'center',
    },
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    [MAX_WIDTH_767]: {
      alignItems: 'center',
      '&:nth-child(2) :last-child': {
        justifyContent: 'center',
      },
    },
  },
  videoSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '376px',
    marginBottom: '74px',
    paddingTop: '10px',
    [MAX_WIDTH_1439]: {
      height: '326px',
      marginBottom: '63px',
      paddingTop: '10px',
    },
    [MAX_WIDTH_1239]: {
      height: '216px',
      marginBottom: '38px',
      paddingTop: '10px',
    },
    [MAX_WIDTH_767]: {
      height: 'unset',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      marginBottom: '58px',
      paddingTop: '10px',
    },
  },
  videoInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: theme.fonts.Everett.Regular,
    height: '100%',
    '& label': {
      fontSize: '2rem',
      lineHeight: '2.7rem',
      color: theme.colors.white,
    },
    '& h5': {
      fontSize: '1.5rem',
      lineHeight: '1.8rem',
      color: theme.colors.grey,
      margin: '0px',
      maxWidth: '372px',
    },
    [MAX_WIDTH_1439]: {
      '& label': {
        fontSize: '1.95rem',
        lineHeight: '2.35rem',
      },
      '& h5': {
        fontSize: '1.3rem',
        lineHeight: '1.55rem',
        maxWidth: '324px',
      },
    },
    [MAX_WIDTH_1239]: {
      '& label': {
        fontSize: '1.3rem',
        lineHeight: '1.55rem',
      },
      '& h5': {
        fontSize: '0.875rem',
        lineHeight: '1.05rem',
        maxWidth: '215px',
      },
    },
    [MAX_WIDTH_767]: {
      order: 1,
      '& label': {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
      '& h5': {
        maxWidth: 'unset',
        textAlign: 'center',
      },
    },
  },
  playerHolder: {
    border: ['1px', 'solid', theme.colors.white],
    [MAX_WIDTH_767]: {
      margin: '22px 0px',
    },
  },
  infoItems: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row wrap',
    '& div:nth-child(3n), & div:last-child': {
      marginRight: '0px',
    },
    [MAX_WIDTH_767]: {
      width: '100%',
      flexFlow: 'row nowrap',
      maxWidth: '85%',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      marginBottom: '57px',
      '& div:nth-child(3n)': {
        marginRight: '28px',
      },
    },
  },
  infoItem: {
    width: '345px',
    height: '436px',
    border: ['1px', 'solid', theme.colors.white],
    borderRadius: '20px',
    marginRight: '48px',
    marginBottom: '53px',
    cursor: 'pointer',
    '& img': {
      width: '343px',
      height: '212px',
      borderRadius: '20px',
      marginBottom: '53px',
      overflow: 'hidden',
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      background: theme.colors.secondaryDark,
      fontWeight: 400,
      width: '183px',
      height: '37px',
      borderRadius: '5px',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      marginLeft: '31px',
    },
    '& h5': {
      display: 'flex',
      alignItems: 'center',
      height: 'calc(100% - 302px)',
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: '1.8rem',
      marginInline: '31px 11px',
      marginTop: 0,
      marginBottom: 0,
    },
    [MAX_WIDTH_1439]: {
      width: '301px',
      height: '380px',
      marginRight: '42px',
      marginBottom: '56px',
      '& img': {
        width: '299px',
        height: '185px',
        marginBottom: '46px',
      },
      '& div': {
        width: '160px',
        height: '32px',
        borderRadius: '4px',
        fontSize: '0.76rem',
        lineHeight: '0.9rem',
        marginLeft: '27px',
      },
      '& h5': {
        height: 'calc(100% - 263px)',
        fontSize: '1.3rem',
        lineHeight: '1.56rem',
        marginLeft: '27px',
        marginInline: '27px 8px',
      },
    },
    [MAX_WIDTH_1239]: {
      width: '200px',
      height: '252px',
      marginRight: '28px',
      marginBottom: '30.6px',
      '& img': {
        width: '198px',
        height: '122px',
        marginBottom: '31px',
      },
      '& div': {
        width: '106px',
        height: '21px',
        borderRadius: '3px',
        fontSize: '0.5rem',
        lineHeight: '0.6rem',
        marginLeft: '18px',
      },
      '& h5': {
        height: 'calc(100% - 174px)',
        fontSize: '0.8rem',
        lineHeight: '0.95rem',
        marginInline: '18px 8px',
      },
    },
    [MAX_WIDTH_767]: {
      marginRight: '28px',
      marginBottom: '15px',
      minWidth: '200px',
      scrollSnapAlign: 'center',
      '& h5': {
        fontSize: '0.8rem',
        lineHeight: '1.05rem',
      },
    },
  },
  sectionTitle: {
    width: '100%',
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '38px',
    marginTop: '10px',
    '& label': {
      fontSize: '2rem',
      lineHeight: '2.7rem',
      background: theme.colors.black,
      position: 'absolute',
      zIndex: 2,
      paddingRight: '45px',
    },
    '& hr': {
      width: '100%',
    },
    [MAX_WIDTH_1439]: {
      marginBottom: '31px',
      marginTop: '10px',
      '& label': {
        fontSize: '1.963rem',
        lineHeight: '2.35rem',
      },
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '18px',
      marginTop: '10px',
      '& label': {
        fontSize: '1.3rem',
        lineHeight: '1.55rem',
        paddingRight: '30px',
      },
    },
    [MAX_WIDTH_767]: {
      marginBottom: '14px',
      marginTop: '10px',
      '& label': {
        position: 'unset',
        alignSelf: 'center',
        margin: '0px auto',
        paddingRight: '0px',
      },
      '& hr': {
        display: 'none',
      },
    },
  },
  wrapper: {},
  content: {},
}));
