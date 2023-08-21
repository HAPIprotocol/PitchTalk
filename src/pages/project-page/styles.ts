import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
      alignItems: 'center',
      marginBlock: '48px',
      padding: '0px',
      color: theme.colors.white,
      [MAX_WIDTH_767]: {
        marginBlock: '36px',
      },
    },
    wrapper: {
      display: 'flex',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
    content: {
      display: 'flex',
      width: '100%',
      maxWidth: '690px',
      justifyContent: 'center',
      flexDirection: 'column',
      [MAX_WIDTH_767]: {
        maxWidth: '360px',
      },
    },
  })
);
