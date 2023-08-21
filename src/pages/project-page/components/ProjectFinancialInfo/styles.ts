import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      width: 'fit-content',
      height: 'fit-content',
      marginBottom: '72px',
      [MAX_WIDTH_767]: {
        width: '100%',
        maxWidth: '320px',
        marginInline: 'auto',
      },
    },
    investStyles: {
      width: '690px',
      flex: 0,
      border: ['1px', 'solid', theme.colors.grey],
      [MAX_WIDTH_767]: {
        width: '320px',
        borderInline: '0px',
      },
    },
  })
);
