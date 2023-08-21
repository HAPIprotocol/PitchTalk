import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { banner?: string },
  IAppTheme
>((theme: IAppTheme) => ({
  ecoSystemSectionWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.colors.white,
  },
  ecoSystemParticipants: {
    width: '100%',
    marginInline: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    [MAX_WIDTH_1239]: { justifyContent: 'center', gap: '12px' },
    [MAX_WIDTH_767]: { justifyContent: 'center', gap: '8px' },
  },
  participant: {
    width: '180px',
    height: '223px',
    padding: '8px',
    background: theme.colors.lightDark,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
    [MAX_WIDTH_1239]: {
      width: '155px',
      height: '190px',
      padding: '7px',
      gap: '7px',
    },
  },
  participantImg: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    margin: '24px 0px 2px 0px',
    border: ['1px', 'solid', theme.colors.grey],
    [MAX_WIDTH_1239]: { width: '62px', height: '62px', marginTop: 12 },
    [MAX_WIDTH_767]: {
      width: '55px',
      height: '55px',
      margin: '20px 0px 2px 0px',
    },
  },
  participantName: {
    color: theme.colors.white,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 1,
    fontSize: '1.25rem',
    width: '100%',
    textAlign: 'center',
    margin: 0,
    [MAX_WIDTH_767]: { fontSize: '1.1rem' },
  },
  participantDescription: {
    color: theme.colors.grey,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    WebkitLineClamp: 2,
    fontSize: '0.875rem',
    width: '100%',
    textAlign: 'center',
    margin: 0,
    [MAX_WIDTH_767]: { fontSize: '0.8rem' },
  },
}));
