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
    backgroundColor: theme.colors.cardGrey,
    padding: '25px 29px 35px',
    width: '345px',
    height: '419px',
    marginRight: '48px',
    [MAX_WIDTH_1439]: {
      padding: '22px 25px 29px',
      width: '301px',
      height: '389px',
      marginRight: '42px',
    },
    [MAX_WIDTH_1239]: {
      padding: '15px 17px 21px',
      width: '201px',
      height: '260px',
      marginRight: '28px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '22px',
    marginBottom: '20px',
    [MAX_WIDTH_1439]: {
      height: '19px',
      marginBottom: '20px',
    },
    [MAX_WIDTH_1239]: {
      height: '19px',
      marginBottom: '16px',
    },
  },
  headerTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.125rem',
    color: theme.colors.white,
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    [MAX_WIDTH_1439]: {
      fontSize: '0.975rem',
      overflowWrap: 'break-word',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.6rem',
    },
  },
  likeIcon: {
    width: '21px',
    height: '19px',
    marginLeft: '18px',
    alignSelf: 'baseline',
    [MAX_WIDTH_1439]: {
      width: '18px',
      height: '17px',
    },
    [MAX_WIDTH_1239]: {
      width: '12px',
      height: '11px',
    },
    [MAX_WIDTH_767]: {
      marginLeft: '14px',
    },
  },
  projectImage: {
    width: '280px',
    height: '160px',
    objectFit: 'cover',
    marginBottom: '23px',
    [MAX_WIDTH_1439]: {
      width: '242px',
      height: '140px',
      marginBottom: '20px',
    },
    [MAX_WIDTH_1239]: {
      width: '163px',
      height: '92px',
      marginBottom: '13px',
    },
  },
  projectDescription: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    color: theme.colors.grey,
    marginBottom: '24px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    [MAX_WIDTH_1439]: {
      marginBottom: '20px',
    },
    [MAX_WIDTH_1239]: {
      marginBottom: '13px',
      fontSize: '0.55rem',
      WebkitLineClamp: 2,
    },
    [MAX_WIDTH_767]: {
      marginBottom: '11px',
      fontSize: '0.5rem',
      WebkitLineClamp: 2,
    },
  },
  investments: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  investment: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  investmentDivider: {
    borderLeft: ['1px', 'solid', theme.colors.borderGray],
    maxWidth: '1px',
  },
  investmentButton: {
    '& $button': {
      width: 78,
      height: 22,
      fontSize: '0.75rem',
      padding: 'unset',
    },
    marginBottom: '8px',
    alignSelf: 'flex-start',
  },
  investmentAmount: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.25rem',
    color: theme.colors.white,
    marginBottom: '2px',
    [MAX_WIDTH_1439]: {
      fontSize: '1.05rem',
      marginBottom: '1px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.75rem',
      marginBottom: '2px',
    },
  },
  investmentAmountUSN: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
    marginBottom: '8px',
  },
  investmentTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    color: theme.colors.lightGrey,
    fontSize: '0.875rem',
    display: 'inline-flex',
    justifyContent: 'space-between',
    marginBottom: '7px',
    [MAX_WIDTH_1439]: {
      fontSize: '0.85rem',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '0.5rem',
      marginBottom: '5px',
    },
  },
}));
