import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, unknown, IAppTheme>(
  (theme: IAppTheme) => ({
    likesBtnWrapper: {
      width: 'fit-content',
      height: 'fit-content',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 12px',
      gap: '4px',
      borderRadius: '20px',
      background: theme.colors.likesBtnBg,
      color: theme.colors.white,
      cursor: 'pointer',
    },
    likesIcon: {
      width: '20px',
      height: '20px',
    },
    likesIconFilled: {
      width: '20px',
      height: '20px',
    },
    likesAmount: {
      color: theme.colors.white,
      fontSize: '0.875rem',
    },
  })
);
