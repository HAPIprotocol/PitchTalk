import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  hackathonParticipantButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flex: 1,
    alignItems: 'flex-end',
  },
  hackathonParticipantButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '2px 8px',
    background: theme.colors.secondaryDark,
    color: theme.colors.white,
    borderRadius: '4px',
    fontSize: '0.875rem',
    outline: 'none',
    border: 0,
    cursor: 'pointer',
    '&:disabled': {
      opacity: '0.4',
      cursor: 'default',
      pointerEvents: 'none',
      '&:hover, &:active': {
        scale: '1',
      },
    },
    '&:hover, &:active': {
      scale: '1.05',
    },
  },
  hackathonParticipantButtonRepo: {
    composes: '$hackathonParticipantButton',
    background: 'rgba(101, 62, 226, 0.32)',
  },
}));
