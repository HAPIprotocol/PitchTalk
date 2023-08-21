import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { loaderColor: keyof IAppTheme['colors'], backgroundColor: keyof IAppTheme['colors'] },
  IAppTheme
>((theme: IAppTheme) => ({
  loader: {
    fontSize: '10rem',
    margin: '50px auto',
    textIndent: '-9999rem',
    width: '11rem',
    height: '11rem',
    borderRadius: '50%',
    alignSelf: 'center',
    background: ({ loaderColor, backgroundColor }) => `linear-gradient(to right, ${theme.colors[loaderColor]} 10%, ${theme.colors[backgroundColor]} 42%)`,
    position: 'relative',
    WebkitAnimation: '$load 1.4s infinite linear',
    animation: '$load 1.4s infinite linear',
    WebkitTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    '&:before': {
      width: '50%',
      height: '50%',
      background: ({ backgroundColor }) => theme.colors[backgroundColor],
      borderRadius: '100% 0 0 0',
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
    },
    '&:after': {
      background: ({ backgroundColor }) => theme.colors[backgroundColor],
      width: '75%',
      height: '75%',
      borderRadius: '50%',
      content: '""',
      margin: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  '@-webkit-keyframes load': {
    '0%': {
      WebkitTransform: 'rotate(0deg)',
      transform: 'rotate(0deg)',
    },
    '100%': {
      WebkitTransform: 'rotate(360deg)',
      transform: 'rotate(360deg)',
    },
  },
  '@keyframes load': {
    '0%': {
      WebkitTransform: 'rotate(0deg)',
      transform: 'rotate(0deg)',
    },
    '100%': {
      WebkitTransform: 'rotate(360deg)',
      transform: 'rotate(360deg)',
    },
  },
}));
