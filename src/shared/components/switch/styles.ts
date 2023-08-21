import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '53px',
    height: '24px',
    '& input': {
      opacity: '0',
      width: '0',
      height: '0',

      '&:checked + $slider': {
        backgroundColor: theme.colors.secondaryDark,
        color: theme.colors.white,
        '& span': { left: '10px' },
      },

      '&:checked + $slider::before': {
        WebkitTransform: 'translateX(25px)',
        MsTransform: 'translateX(25px)',
        transform: 'translateX(25px)',
      },
    },
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: theme.colors.lightGrey,
    WebkitTransition: '.4s',
    transition: '.4s',
    borderRadius: '20px',
    fontSize: '0.625rem',
    lineHeight: '0.75rem',

    '& span': {
      position: 'absolute',
      textTransform: 'uppercase',
      top: '6px',
      left: '27px',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      height: '18px',
      width: '18px',
      left: '5px',
      bottom: '3px',
      backgroundColor: theme.colors.lightDark,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '50%',
    },
  },
}));
