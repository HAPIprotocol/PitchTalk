import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, { banner: string }, IAppTheme>(
  (theme: IAppTheme) => ({
    eventContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '333px',
      borderRadius: '3px',
      color: theme.colors.white,
      background: theme.colors.lightDark,
    },
    eventImg: {
      width: '100%',
      height: '111px',
      objectFit: 'cover',
    },
    eventInfo: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '16px',
      position: 'relative',
    },
    eventName: {
      margin: 0,
      fontSize: '1.25rem',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word',
      WebkitLineClamp: 1,
    },
    eventPlace: {
      margin: 0,
      fontSize: '0.875rem',
      color: theme.colors.grey,
    },
    eventOpenIcon: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      width: '24px',
      height: '24px',
    },
  })
);
