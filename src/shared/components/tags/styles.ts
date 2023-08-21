import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  tagsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: '20px',
    marginBlock: '0px 25px',
    color: theme.colors.white,
    [MAX_WIDTH_1239]: { gap: '15px', marginBlock: '0px 20px' },
    [MAX_WIDTH_767]: { gap: '12px' },
  },
  tag: {
    cursor: 'default',
    userSelect: 'none',
    borderRadius: '10px',
    padding: '10px',
    margin: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    border: ['2px', 'solid', 'transparent'],

    [MAX_WIDTH_1239]: {
      padding: '8px',
      borderRadius: '8px',
      fontSize: '0.9rem',
    },
    [MAX_WIDTH_767]: { borderRadius: '5px' },
  },
  uniqTag: {
    composes: '$tag',
    border: ['2px', 'solid', theme.colors.secondaryDark],
  },
  removeTagIcon: {},
  noTagMessage: {},
}));
