import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, { img?: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    userImgWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '32px',
      minHeight: '32px',
      maxWidth: '32px',
      maxHeight: '32px',
      borderRadius: '50%',
      background: theme.colors.lightDark,
    },
    userImg: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      overflow: 'hidden',
    },
  })
);
