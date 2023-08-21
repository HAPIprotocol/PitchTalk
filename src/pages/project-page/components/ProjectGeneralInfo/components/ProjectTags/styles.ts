import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(
  (theme: IAppTheme) => ({
    tagsContainer: {
      display: 'flex',
      flexDirection: 'column',

      gap: '12px',
      marginBottom: '24px',
    },
    projectTagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    projectEventsContainer: {
      marginBottom: 0,
    },
    projectTag: {
      color: theme.colors.lightGrey,
      lineHeight: '1.4rem',
      marginBlock: 0,
    },
    projectTagSlug: {
      textTransform: 'capitalize',
    },
  })
);
