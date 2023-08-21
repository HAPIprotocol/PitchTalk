import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<string, never, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      position: 'relative',
      width: '100%',
      marginBottom: '24px',
      [MAX_WIDTH_767]: {
        width: '100%',
        maxWidth: '320px',
        marginInline: 'auto',
      },
    },
    content: {
      display: 'flex',
      gap: '24px',
      [MAX_WIDTH_767]: {
        flexDirection: 'column',
      },
    },

    logoWrapper: {
      [MAX_WIDTH_767]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      },
    },
    logoContainer: {
      [MAX_WIDTH_767]: {
        width: '72px',
        height: '72px',
        padding: '3px',
      },
    },

    projectInfo: {
      width: '100%',
    },

    projectTitle: {
      maxWidth: '450px',
      fontSize: '2.5rem',
      lineHeight: '130%',
      fontWeight: 500,
      fontStyle: 'normal',
      marginBlock: '0px 12px',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word',
      WebkitLineClamp: 2,
      [MAX_WIDTH_767]: {
        fontSize: '1.75rem',
      },
    },
    projectDescription: {
      color: theme.colors.grey,
      marginBlock: '0px 24px',
      [MAX_WIDTH_767]: {
        fontSize: '0.875rem',
      },
    },

    projectUrl: {
      color: theme.colors.white,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginBottom: '24px',
      fontSize: '0.875rem',
      lineHeight: '1.05rem',
      fontFamily: theme.fonts.Everett.Light,
      '&:hover, &:active': {
        '& span': {
          textDecoration: 'underline',
        },
      },
    },
  })
);
