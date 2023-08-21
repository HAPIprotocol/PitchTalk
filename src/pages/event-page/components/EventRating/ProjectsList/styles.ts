import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_767,
  MAX_WIDTH_1439,
  MAX_WIDTH_1239,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  eventProject: {
    width: '100%',
    minHeight: '180px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: theme.colors.white,
    background: theme.colors.lightDark,
    padding: '24px',
    gap: '24px',
    overflow: 'hidden',
    [MAX_WIDTH_1239]: { padding: '20px', gap: '20px', height: '160px' },
    [MAX_WIDTH_767]: { padding: '14px', gap: '10px', height: '150px' },
  },
  eventProjectLogo: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    minWidth: '72px',
    minHeight: '72px',
    borderRadius: '50%',
    border: ['1px', 'solid', theme.colors.grey],
    [MAX_WIDTH_1239]: { minWidth: '62px', minHeight: '62px' },
    [MAX_WIDTH_767]: { minWidth: '50px', minHeight: '50px' },
  },
  eventProjectMainInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflow: 'hidden',
    [MAX_WIDTH_1239]: { gap: '6px' },
    [MAX_WIDTH_767]: { gap: '4px' },
  },
  eventProjectInfo: {
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    [MAX_WIDTH_1239]: { gap: '6px' },
    [MAX_WIDTH_767]: { gap: '4px' },
  },
  eventProjectTitle: {
    fontSize: '1.25rem',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    margin: 0,
    [MAX_WIDTH_1439]: { fontSize: '1.15rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.1rem' },
    [MAX_WIDTH_767]: { fontSize: '1.05rem' },
  },
  eventProjectDescription: {
    margin: 0,
    color: theme.colors.lightGrey,

    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    fontSize: '0.875rem',
    [MAX_WIDTH_1439]: { fontSize: '0.875rem' },
    [MAX_WIDTH_1239]: { fontSize: '0.875rem' },
    [MAX_WIDTH_767]: { fontSize: '0.875rem' },
  },
  eventProjectMetaInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    [MAX_WIDTH_767]: { gap: '7px' },
  },
  eventProjectRankInfoContainer: {
    display: 'flex',
    gap: '20px',
    [MAX_WIDTH_1439]: { gap: '15px' },
    [MAX_WIDTH_1239]: { gap: '12px' },
    [MAX_WIDTH_767]: { gap: '10px' },
  },
  eventProjectRankInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '& p': { margin: 0 },
    '& p:first-child': {
      fontFamily: theme.fonts.Everett.Medium,
    },
    '& p:last-child': {
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.lightGrey,
      fontSize: '0.75rem',
    },
    [MAX_WIDTH_1439]: {
      gap: '4px',
      '& p:first-child': { fontSize: '0.95rem' },
      '& p:last-child': { fontSize: '0.7rem' },
    },
    [MAX_WIDTH_1239]: {
      gap: '3px',
      '& p:first-child': { fontSize: '0.9rem' },
      '& p:last-child': { fontSize: '0.65rem' },
    },
    [MAX_WIDTH_767]: {
      gap: '2px',
      '& p:first-child': { fontSize: '0.85rem' },
      '& p:last-child': { fontSize: '0.6rem' },
    },
  },
  eventControls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '15px',
    [MAX_WIDTH_767]: { gap: '7px' },
  },
  eventControlButton: {
    width: '75px',
    '& button': {
      height: '36px',
      [MAX_WIDTH_1239]: {
        width: '120px',
        fontSize: '0.8rem',
      },
      [MAX_WIDTH_767]: {
        width: '60px',
        height: '24px',
        fontSize: '0.65rem',
      },
    },
    [MAX_WIDTH_767]: {
      width: 'unset',
    },
  },
  grantsControls: {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px',
    [MAX_WIDTH_767]: {
      flexDirection: 'column',
      gap: '7px',
    },
  },
  eventProjectHackathonInfo: {
    display: 'flex',
  },
}));
