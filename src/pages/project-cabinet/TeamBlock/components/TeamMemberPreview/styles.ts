import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { userImg: string; isProjectPage: boolean },
  IAppTheme
>((theme: IAppTheme) => ({
  teamMemberContainer: {
    color: theme.colors.white,
    position: 'relative',
    width: '190px',
    height: '290px',
    padding: '10px',
    border: '1px solid #4C545E',
    borderRadius: '12px',
    marginBlock: 'auto',
    [MAX_WIDTH_1439]: {
      gap: '8px',
      padding: '8px 8px 16px 8px',
    },
    [MAX_WIDTH_1239]: {
      gap: '6px',
      padding: '6px 6px 16px 6px',
    },
    [MAX_WIDTH_767]: {
      gap: '4px',
      padding: '4px 4px 14px 4px',
    },
    '&.project-page': {
      [MAX_WIDTH_1239]: {
        width: '156px',
        height: '250px',
      },
      [MAX_WIDTH_767]: {
        width: '122px',
        height: '225px',
      },
    },
  },
  teamMemberLinksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '& svg': {
      cursor: 'pointer',
      width: '20px',
      height: '20px',
    },
  },
  teamMemberContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '200px',
    height: '100%',
  },
  memberImg: {
    width: '144px',
    height: '144px',
    borderRadius: '12px',
    border: 'none',
    backgroundImage: ({ userImg }) => (userImg ? `url(${userImg})` : 'unset'),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    [MAX_WIDTH_767]: {
      '&.project-page': {
        width: '110px',
        height: '110px',
      },
    },
  },

  alias: {
    width: '100%',
    fontSize: '1.25rem',
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'center',
    [MAX_WIDTH_1239]: { fontSize: '1.15rem' },
    [MAX_WIDTH_767]: { fontSize: '1rem' },
  },
  position: {
    width: '100%',
    fontSize: '1.15rem',
    color: theme.colors.lightGrey,
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'center',
    [MAX_WIDTH_1239]: { fontSize: '1rem' },
    [MAX_WIDTH_767]: { fontSize: '0.9rem' },
  },
  wallet: {
    width: '100%',
    fontSize: '1.15rem',
    color: theme.colors.lightGrey,
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    textAlign: 'center',
    [MAX_WIDTH_1239]: { fontSize: '1rem' },
    [MAX_WIDTH_767]: { fontSize: '0.9rem' },
  },
  deleteIcon: {
    position: 'absolute',
    cursor: 'pointer',
    top: 10,
    right: 10,

    width: '16px',
    height: '16px',
    [MAX_WIDTH_767]: {
      width: '12px',
      height: '12px',
    },
  },
  infoLabel: {
    position: 'absolute',
    top: 0,
    left: '5px',
    paddingInline: '5px',
    fontSize: '0.85rem',
    transform: 'translate(0, -70%)',
    background: theme.colors.black,
  },
  processing: {
    color: theme.colors.processingColor,
  },
  declined: {
    color: theme.colors.declinedColor,
  },
}));
