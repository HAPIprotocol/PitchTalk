import { EPitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { createUseStyles } from 'react-jss';

import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { getPitchStatusColor, IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1130px',
    marginInline: 'auto',
    [MAX_WIDTH_1439]: {
      maxWidth: '875px',
    },
    [MAX_WIDTH_1239]: {
      maxWidth: '520px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '280px',
      marginBlock: '30px',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '112px',
    position: 'relative',
    height: '100%',
    [MAX_WIDTH_1439]: {
      gap: '86px',
    },
    [MAX_WIDTH_1239]: {
      gap: '51px',
    },
    [MAX_WIDTH_767]: {
      gap: '19px',
      flexDirection: 'column',
    },
  },
  rightContent: {
    height: '100%',
    position: 'relative',
  },
  leftContent: {
    marginBlock: '56.25px',
    [MAX_WIDTH_1439]: {
      marginBlock: '43px',
    },
    [MAX_WIDTH_1239]: {
      marginBlock: '25px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '280px',
      marginBlock: 'unset',
    },
  },
  slideContainer: {
    display: 'flex',
    overflow: 'hidden',
    width: '475px',
    height: '100%',
    paddingBlock: '56.25px',
    position: 'relative',
    [MAX_WIDTH_1439]: {
      width: '366px',
      paddingBlock: '43px',
    },
    [MAX_WIDTH_1239]: {
      width: '217px',
      paddingBlock: '25px',
    },
    [MAX_WIDTH_767]: {
      width: '300px',
      height: '95px',
      paddingBlock: '10px',
    },
  },
  title: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    marginBlock: '0px 27px',
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
  },
  arrowIcon: {
    marginBottom: '39px',
    [MAX_WIDTH_1439]: {
      width: '57px',
      height: '58px',
      marginBottom: '30px',
    },
    [MAX_WIDTH_1239]: {
      width: '34px',
      height: '35px',
      marginBottom: '18px',
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
    width: '475px',
    height: '589px',
    position: 'relative',
    padding: '87px 84px 34px',
    display: 'flex',
    flexDirection: 'column',
    border: ['1px', 'solid', theme.colors.lightGrey],
    borderRadius: '10px',
    [MAX_WIDTH_1439]: {
      width: '366px',
      height: '437px',
      padding: '67px 65px 26px',
    },
    [MAX_WIDTH_1239]: {
      width: '217px',
      height: '259px',
      padding: '38px 38px 0px',
    },
    [MAX_WIDTH_767]: {
      width: '280px',
      height: '95px',
      padding: '12px 8px 4px 16px',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: '27px',
    },
  },
  breakLine: {
    width: '100vw',
    height: '1px',
    background: theme.colors.lightGrey,
  },
  pitch: {
    paddingBlock: '32px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '110px',
    fontSize: '3.603rem',
    lineHeight: '4.323rem',
    cursor: 'default',
    userSelect: 'none',
    '&.intro': { background: getPitchStatusColor[EPitchType.Intro] },
    '&.update': { background: getPitchStatusColor[EPitchType.Update] },
    '&.invest': { background: getPitchStatusColor[EPitchType.Investment] },
    [MAX_WIDTH_1439]: {
      marginBottom: '85px',
      fontSize: '2.781rem',
      lineHeight: '3.336rem',
      paddingBlock: '25px',
      borderRadius: '9px',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '50px',
      fontSize: '1.649rem',
      lineHeight: '1.979rem',
      paddingBlock: '15px',
      borderRadius: '5.6px',
    },
    [MAX_WIDTH_767]: {
      marginBottom: 'unset',
      fontSize: '1.193rem',
      lineHeight: '1.431rem',
      padding: '10px 27px',
      borderRadius: '4px',
    },
  },
  pitchName: {
    marginBlock: '0px 21px',
    fontSize: '2rem',
    lineHeight: '1.875rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    [MAX_WIDTH_1439]: {
      fontSize: '1.544rem',
      lineHeight: '1.447rem',
      marginBlock: '0px 15px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.916rem',
      lineHeight: '0.858rem',
      marginBlock: '0px 9px',
    },
    [MAX_WIDTH_767]: {
      textAlign: 'left',
      fontSize: '0.816rem',
      lineHeight: '0.758rem',
      marginBlock: '0px 6px',
    },
  },
  pitchTextContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  pitchContent: {
    margin: 0,
    fontFamily: theme.fonts.Everett.Light,
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    textAlign: 'center',
    color: theme.colors.lightGrey,
    [MAX_WIDTH_1439]: {
      fontSize: '0.965rem',
      lineHeight: '1.447rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.573rem',
      lineHeight: '0.858rem',
    },
    [MAX_WIDTH_767]: {
      lineHeight: '0.764rem',
      textAlign: 'left',
    },
  },
}));
