import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';

export const useStyles = createUseStyles(() => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1600px',
    flex: 1,
    alignItems: 'center',
    padding: '60px 120px',
    [MAX_WIDTH_1439]: { padding: '40px 118px 60px' },
    [MAX_WIDTH_1239]: { padding: '40px 86px 60px' },
    [MAX_WIDTH_767]: { padding: '24px 20px 32px' },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  eventInfoBlocks: {
    maxWidth: '960px',
    marginInline: 'auto',
  },
}));
