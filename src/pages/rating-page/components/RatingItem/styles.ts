import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { banner?: string },
  IAppTheme
>((theme: IAppTheme) => ({
  ratingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    gap: '20px',
    padding: '15px 20px',
    zIndex: 0,
    borderBottom: ['1px', 'solid', theme.colors.white],
    '&:hover, &:active': {
      borderBottom: ['1px', 'solid', theme.colors.secondaryDark],
      transition: 'all 0.2s ease-in',
    },
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: ({ banner }) => `url(${banner || projectFrame})`,
      filter: 'blur(2px) grayscale(15%) opacity(0.35)',
      zIndex: -1,
    },
    [MAX_WIDTH_1439]: {
      padding: '12.5px 17.5px',
      '&:not(:last-child)': { marginBottom: '17.5px' },
    },
    [MAX_WIDTH_1239]: {
      padding: '10px 15px',
      '&:not(:last-child)': { marginBottom: '15px' },
    },
    [MAX_WIDTH_767]: {
      padding: '7.5px 10px',
      '&:not(:last-child)': { marginBottom: '12.5px' },
    },
  },
  ratingItemInfo: {
    width: '70%',
    color: theme.colors.white,
  },
  ratingItemInfoContent: {
    display: 'inline-flex',
    gap: '25px',
    alignItems: 'center',
    height: '100%',
    '& > img': { width: 60, height: 60 },
    [MAX_WIDTH_1439]: { gap: '20px', '& > img': { width: 50, height: 50 } },
    [MAX_WIDTH_1239]: { gap: '15px', '& > img': { width: 45, height: 45 } },
    [MAX_WIDTH_767]: { gap: '10px', '& > img': { width: 35, height: 35 } },
  },
  ratingItemPos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    fontSize: '1.25rem',
    fontFamily: theme.fonts.Everett.Medium,
    textDecoration: 'none',
    [MAX_WIDTH_1439]: {
      width: '32.5px',
      height: '32.5px',
      fontSize: '1.15rem',
    },
    [MAX_WIDTH_1239]: {
      width: '30px',
      height: '30px',
      fontSize: '1.05rem',
    },
    [MAX_WIDTH_767]: {
      width: '25px',
      height: '25px',
      fontSize: '0.95rem',
    },
  },
  ratingItemName: {
    fontSize: '1.65rem',
    fontFamily: theme.fonts.Everett.Regular,
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    [MAX_WIDTH_1439]: { fontSize: '1.65rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.35rem' },
    [MAX_WIDTH_767]: { fontSize: '1.15rem' },
  },
  ratingItemAmount: {
    width: '30%',
    textAlign: 'center',
    fontSize: '1.65rem',
    fontFamily: theme.fonts.Everett.Medium,
    color: theme.colors.white,
    [MAX_WIDTH_1439]: { fontSize: '1.6rem' },
    [MAX_WIDTH_1239]: { fontSize: '1.3rem' },
    [MAX_WIDTH_767]: { fontSize: '1.05rem' },
  },
  ratingItemAmountToken: {
    fontSize: '1.25rem',
    fontFamily: theme.fonts.Everett.Regular,
    [MAX_WIDTH_1439]: { fontSize: '1.15rem' },
    [MAX_WIDTH_1239]: { fontSize: '1rem' },
    [MAX_WIDTH_767]: { fontSize: '0.85rem' },
  },
}));
