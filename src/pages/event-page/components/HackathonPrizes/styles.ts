import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IVideoPlayerStyles {
  banner?: string;
}

export const useStyles = createUseStyles<string, IVideoPlayerStyles, IAppTheme>(
  (theme) => ({
    sectionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '60px',
      [MAX_WIDTH_767]: {
        marginBottom: '25px',
      },
    },
    prizesWrapper: {
      display: 'flex',
      gap: '24px',
      [MAX_WIDTH_1239]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    prizesMeta: {
      color: theme.colors.grey,
      lineHeight: '1.4rem',
      fontSize: '1rem',
      marginBlock: '2rem 0px',
    },
    prizeItem: {
      color: theme.colors.white,
      background: theme.colors.lightDark,
      userSelect: 'none',
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '24px',
      width: '100%',
      maxWidth: '304px',
    },
    prizePosition: {
      margin: 0,
      fontSize: '1.25rem',
    },
    prizeMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    prizeAmount: {
      margin: 0,
      fontSize: '3rem',
    },
    prizeDescription: {
      color: theme.colors.lightGrey,
      fontSize: '1rem',
      margin: 0,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word',
      WebkitLineClamp: 4,
    },
    fullHeight: {
      WebkitLineClamp: 8,
    },
  })
);
