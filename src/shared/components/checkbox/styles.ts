import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    margin: 0,
    '&.disabled': {
      opacity: 0.5,
      cursor: 'default',
    },
  },
  input: {
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: theme.colors.textGrey,
    margin: 0,
    font: 'inherit',
    color: theme.colors.textGrey,
    width: '0.875rem',
    height: '0.875rem',
    border: ['0.15rem', 'solid', theme.colors.textGrey],
    borderRadius: '3px',
    transform: 'translateY(-0.075rem)',
    display: 'grid',
    placeContent: 'center',

    '&:before': {
      content: '""',
      width: '0.5rem',
      height: '0.5rem',
      clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
      transform: 'scale(0)',
      transformOrigin: 'bottom left',
      transition: '120ms transform ease-in-out',
      boxShadow: ['inset', '0.5rem', '0.5rem', theme.colors.darkGrey],
    },
    '&:checked': {
      '&:before': {
        transform: 'scale(1)',
      },
    },
    '&:focus': {
      outline: 'none',
    },
    '&:disabled': { cursor: 'default' },
  },
}));
