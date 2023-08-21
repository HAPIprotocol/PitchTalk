import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { isFullList: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  eventReferee: {
    maxWidth: '380px',
    display: 'flex',
    background: theme.colors.lightDark,
    color: theme.colors.white,
    padding: '22px',
    gap: '15px',
    width: '100%',
    [MAX_WIDTH_1239]: { gap: '12px', padding: '16px' },
    [MAX_WIDTH_767]: { padding: '10px' },
  },
  eventRefereeLogo: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    minWidth: '72px',
    minHeight: '72px',
    borderRadius: '50%',
    [MAX_WIDTH_1239]: { minWidth: '62px', minHeight: '62px' },
    [MAX_WIDTH_1239]: { minWidth: '50px', minHeight: '50px' },
  },
  eventRefereeInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    [MAX_WIDTH_1439]: { fontSize: '0.95rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.9rem' },
    [MAX_WIDTH_767]: { fontSize: '0.85rem' },
  },
  eventRefereeInfoVotes: {
    margin: 0,
    color: theme.colors.ptGreyDarkText,
  },
  eventRefereeInfoTitleName: {
    margin: 0,
    fontSize: '1.25rem',
    [MAX_WIDTH_1239]: { fontSize: '1.1rem' },
    [MAX_WIDTH_767]: { fontSize: '0.95rem' },
  },
  eventRefereeInfoTitleAccount: { margin: 0 },
}));
