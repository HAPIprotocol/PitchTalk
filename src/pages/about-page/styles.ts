import { createUseStyles } from 'react-jss';

import textGradient from 'assets/images/about-page/textGradient.png';
import { IAppTheme } from 'shared/styles/theme';

export const textWithGradient = {
  background: `url(${textGradient})`,
  backgroundPosition: '50% 50%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  ['-webkit-background-clip']: 'text',
  ['-webkit-text-fill-color']: 'transparent',
};

export const OPACITY = {
  FULL: 1,
  NO_OPACITY: 0,
};

export const TIME_PERIODS = {
  ONE_SEC: 1,
  HALF_SEC: 0.5,
};

export const getDefaultFadeAnimation = (isInView: boolean) => ({
  initial: { opacity: OPACITY.FULL / 4 },
  animate: { opacity: isInView ? OPACITY.FULL : OPACITY.FULL / 4 },
  transition: {
    ease: 'linear',
    duration: TIME_PERIODS.ONE_SEC,
    delay: TIME_PERIODS.HALF_SEC,
  },
});

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    overflowX: 'hidden',
  },
}));
