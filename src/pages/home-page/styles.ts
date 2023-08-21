import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    padding: '80px 95px',
    color: theme.colors.white,
    [MAX_WIDTH_1239]: {
      padding: '40px 86px 60px',
    },
    [MAX_WIDTH_767]: {
      padding: '24px 40px 32px',
    },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  playerContentWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    [MAX_WIDTH_1239]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  playerContent: {
    [MAX_WIDTH_1439]: {
      maxWidth: '856px',
    },
  },
  events: {
    marginBottom: '120px',
    [MAX_WIDTH_767]: {
      marginBottom: '76px',
    },
  },
  eventsTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBlock: '0px 60px',
    fontSize: '1.963rem',
    lineHeight: '2.355rem',
    [MAX_WIDTH_767]: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      width: '290px',
      marginInline: 'auto',
    },
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    [MAX_WIDTH_767]: {
      alignItems: 'center',
    },
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0 50%',
    },
  },
  playerHolder: {
    border: ['1px', 'solid', theme.colors.grey],
    borderRadius: '3px',
  },
  partnersWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '176px',
    [MAX_WIDTH_1439]: { marginTop: '156px' },
    [MAX_WIDTH_1239]: { marginTop: '100px' },
    [MAX_WIDTH_767]: { marginTop: '80px' },
  },
}));
