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
    tasksWrapper: {
      display: 'flex',
      marginInline: 'auto',
      flexDirection: 'column',
      gap: '64px',
      maxWidth: '640px',
      [MAX_WIDTH_767]: {
        maxWidth: '320px',
      },
    },
    taskItem: {
      color: theme.colors.grey,
    },
    taskTitleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: theme.colors.white,
    },
    taskImgBg: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      background: theme.colors.lightDark,
      borderRadius: '50%',
    },
    taskImg: {
      width: '100%',
      height: '100%',
      maxWidth: '36px',
      maxHeight: '36px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    taskTitle: {
      margin: 0,
      fontSize: '1.5rem',
    },
    taskDescription: {
      margin: 0,
      '& a': { color: theme.colors.eventLinkColor },
    },
    taskDocument: {
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      color: theme.colors.white,
      background: 'rgba(101, 62, 226, 0.32)',
      borderRadius: '3px',
      marginTop: '12px',
      '&:hover, &:active': {
        background: 'rgba(101, 62, 226, 0.4)',
        transition: 'scale ease 0.3s',
      },
    },
    taskDocumentIcon: {
      width: '20px',
      height: '20px',
      marginBottom: '2px',
      transform: 'rotate(-45deg)',
      minWidth: '20px',
      minHeight: '20px',
      [MAX_WIDTH_1239]: {
        width: '18px',
        height: '18px',
        minWidth: '18px',
        minHeight: '18px',
      },
    },
  })
);
