import { createUseStyles } from 'react-jss';

import blockGradient from 'assets/images/about-page/features/blockGradient.png';
import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1130px',
    margin: '0px auto',
    position: 'relative',
    zIndex: 1,
    [MAX_WIDTH_1439]: { maxWidth: '875px' },
    [MAX_WIDTH_1239]: { maxWidth: '520px' },
    [MAX_WIDTH_767]: { maxWidth: '280px' },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100vw',
      height: '100%',
      marginInline: 'auto',
      backgroundImage: `url(${blockGradient})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '110% 110%',
      backgroundPosition: 'center',
      zIndex: -1,
    },
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '118px',
    [MAX_WIDTH_1439]: { gap: '90px' },
    [MAX_WIDTH_1239]: { gap: '54px' },
    [MAX_WIDTH_767]: { gap: 'unset' },
  },
  breakLine: {
    width: '100vw',
    height: '1px',
    background: theme.colors.lightGrey,
  },
  title: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    marginBlock: '48px 0px',
    textTransform: 'uppercase',
    cursor: 'default',
    userSelect: 'none',
    ...textWithGradient,
    [MAX_WIDTH_1439]: {
      fontSize: '4.631rem',
      lineHeight: '4.341rem',
      marginBlock: '36px 0px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '2.746rem',
      lineHeight: '2.575rem',
      marginBlock: '22px 0px',
    },
    [MAX_WIDTH_767]: {
      maxWidth: '280px',
      marginInline: 'auto',
      marginBlock: '0px 21px',
    },
  },
  featureListContainer: {
    maxHeight: '454px',
    overflow: 'hidden',
    [MAX_WIDTH_1439]: { maxHeight: '311px' },
    [MAX_WIDTH_1239]: { maxHeight: '208px' },
    [MAX_WIDTH_767]: { maxHeight: '209px' },
  },
  featureListContainerMarquee: {
    display: 'flex',
    flexDirection: 'column',
    gap: '90px',
    [MAX_WIDTH_1439]: { gap: '68px' },
    [MAX_WIDTH_1239]: { gap: '40px' },
  },
  featureItem: {
    display: 'flex',
    gap: '32px',
    [MAX_WIDTH_1439]: { gap: '24px' },
    [MAX_WIDTH_1239]: { gap: '14px' },
  },
  featureTitle: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    cursor: 'default',
    userSelect: 'none',
    ...textWithGradient,
    [MAX_WIDTH_1439]: { fontSize: '4.631rem', lineHeight: '4.052rem' },
    [MAX_WIDTH_1239]: { fontSize: '2.746rem', lineHeight: '2.403rem' },
  },
  featureContent: {
    marginBlock: '0px',
    fontSize: '1.5rem',
    lineHeight: '2.188rem',
    fontFamily: theme.fonts.Everett.Light,
    '& > b': { fontFamily: theme.fonts.Everett.Medium },
    [MAX_WIDTH_1439]: { fontSize: '1.158rem', lineHeight: '1.688rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.687rem', lineHeight: '1.001rem' },
  },
}));
