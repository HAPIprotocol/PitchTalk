import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  attentionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: theme.colors.white,
    padding: '14px 20px',
    gap: '32px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      gap: '8px',
    },
  },
  attentionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    margin: 0,
  },
  attentionIcon: {
    minWidth: '24px',
    minHeight: '24px',
  },
  attentionIconHighLighted: {
    composes: '$attentionIcon',
    '& path': {
      fill: '#FF4545',
    },
  },
  addSolutionBtn: {},
  attentionText: {},
}));
