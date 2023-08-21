import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isGrantUser?: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '130px',
      marginBottom: '79px',
      width: '100%',
      [MAX_WIDTH_1439]: {
        height: '98px',
        marginBottom: '73px',
      },
      [MAX_WIDTH_1239]: {
        height: '76px',
        marginBottom: '41px',
      },
      [MAX_WIDTH_767]: {
        flexDirection: 'column',
        marginBottom: '53px',
        height: 'unset',
      },
    },
    profile: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      marginRight: '46px',
      [MAX_WIDTH_1439]: {
        marginRight: '40px',
      },
      [MAX_WIDTH_1239]: {
        marginRight: '27px',
      },
      [MAX_WIDTH_767]: {
        marginRight: '0px',
        height: '76px',
        marginBottom: '36px',
      },
    },
    accountIcon: {
      marginRight: '34px',
      '& svg': {
        width: '111px',
        height: '111px',
        '& path': {
          fill: theme.colors.white,
        },
        '& circle': {
          fill: ({ isGrantUser }: IStylesProps) =>
            isGrantUser
              ? theme.colors.grantBaseColor
              : theme.colors.secondaryDark,
        },
      },
      [MAX_WIDTH_1439]: {
        '& svg': {
          width: '97px',
          height: '97px',
        },
        marginRight: '30px',
      },
      [MAX_WIDTH_1239]: {
        '& svg': {
          width: '65px',
          height: '65px',
        },
        marginRight: '20px',
      },
    },
    account: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
    accountName: {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '2.25rem',
      color: theme.colors.white,
      maxWidth: 340,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      [MAX_WIDTH_1439]: {
        fontSize: '2rem',
      },
      [MAX_WIDTH_1239]: {
        maxWidth: '160px',
        fontSize: '1.375rem',
      },
      [MAX_WIDTH_767]: {
        maxWidth: '200px',
      },
    },
    accountAddress: {
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '1.5rem',
      color: theme.colors.grey,
      [MAX_WIDTH_1439]: {
        fontSize: '0.875rem',
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.625rem',
      },
    },
    investments: {
      fontFamily: theme.fonts.Everett.Regular,
      display: 'flex',
      borderRight: ['1px', 'solid', theme.colors.lightGrey],
      borderLeft: ['1px', 'solid', theme.colors.lightGrey],
      width: '659px',
      '& > div:first-child, & > div:last-child': {
        marginInline: '46px',
      },
      [MAX_WIDTH_1439]: {
        width: '576px',
        '& > div:first-child, & > div:last-child': {
          marginInline: '40px',
        },
      },
      [MAX_WIDTH_1239]: {
        width: '387px',
        '& > div:first-child, & > div:last-child': {
          marginInline: '27px',
        },
      },
      [MAX_WIDTH_767]: {
        width: '279px',
        border: '0px',
        '& > div:first-child': {
          marginRight: '32px',
          marginLeft: '0px',
        },
        '& > div:last-child': {
          marginLeft: '32px',
          marginRight: '0px',
        },
      },
    },
    verticalLine: {
      width: '0px',
      height: '100%',
      borderRight: ['1px', 'solid', theme.colors.borderGray],
    },
    donationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      '& span': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    investmentContainer: {
      composes: '$donationContainer',
    },
    investment: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '239px',
      [MAX_WIDTH_1439]: {
        width: '210px',
      },
      [MAX_WIDTH_1239]: {
        width: '141px',
      },
      [MAX_WIDTH_767]: {
        width: 'unset',
        flex: 1,
      },
    },
    investmentTitle: {
      color: theme.colors.lightGrey,
      fontSize: '1.375rem',
      marginTop: '6px',
      marginBottom: '2px',
      [MAX_WIDTH_1439]: {
        fontSize: '1.2rem',
        marginTop: '4px',
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.875rem',
        marginTop: '2px',
      },
      [MAX_WIDTH_767]: {
        marginTop: '0px',
      },
    },
    investmentAmount: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.colors.white,
      marginBottom: '5px',
      fontSize: '2rem',
      [MAX_WIDTH_1439]: {
        marginBottom: '4px',
        fontSize: '1.625rem',
      },
      [MAX_WIDTH_1239]: {
        marginBottom: '3px',
        fontSize: '1.1125rem',
      },
      [MAX_WIDTH_767]: {
        marginBottom: '1px',
        fontSize: '1rem',
      },
    },
    investmentAmountUSN: {
      color: theme.colors.lightGrey,
      fontSize: '0.875rem',
      [MAX_WIDTH_1439]: { fontSize: '0.825rem' },
      [MAX_WIDTH_1239]: { fontSize: '0.75rem' },
      [MAX_WIDTH_767]: { fontSize: '0.65rem' },
    },
    amount: { marginBottom: '2px' },
    tokenInfo: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '1rem',
      color: theme.colors.lightGrey,
      '& img': {
        width: '20px',
        height: '20px',
        marginRight: '8px',
      },
      [MAX_WIDTH_1439]: {
        fontSize: '0.9rem',
        '& img': { width: '15px', height: '15px', marginRight: '7px' },
      },
      [MAX_WIDTH_1239]: {
        fontSize: '0.85rem',
        '& img': { width: '14px', height: '14px', marginRight: '6px' },
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.7rem',
        '& img': { width: '12px', height: '12px', marginRight: '5px' },
      },
    },
  })
);
