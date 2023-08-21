import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isGrant: boolean;
  isLikes: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    likesCountWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: ({ isGrant, isLikes }) =>
        isGrant && isLikes ? '193px' : 'fit-content',
      height: '43px',
      background: theme.colors.secondaryDark,
      borderRadius: '4px',
      cursor: 'pointer',
      maxWidth: 'fit-content',
      [MAX_WIDTH_1439]: {
        width: ({ isGrant, isLikes }) =>
          isGrant && isLikes ? '179px' : 'fit-content',
        height: '37px',
      },
      [MAX_WIDTH_1239]: {
        width: ({ isGrant, isLikes }) =>
          isGrant && isLikes ? '185px' : 'fit-content',
        height: '40px',
      },
      [MAX_WIDTH_767]: {
        width: ({ isGrant, isLikes }) =>
          isGrant && isLikes ? '130px' : 'fit-content',
        height: '25px',
      },
    },
    starWrapper: {
      display: ({ isGrant }) => (isGrant ? 'flex' : 'none'),
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: '12px',
      '& svg': { width: '22px', height: '22px' },
      [MAX_WIDTH_1439]: {
        paddingInline: '10px',
        '& svg': { width: '20px', height: '20px' },
      },
      [MAX_WIDTH_1239]: {
        paddingInline: '8px',
        '& svg': { width: '22px', height: '22px' },
      },
      [MAX_WIDTH_767]: {
        paddingInline: '7px',
        '& svg': { width: '14px', height: '14px' },
      },
    },
    countWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '150px',
      height: '100%',
      background: theme.colors.likesBg,
      borderRadius: '4px',
      '& svg path': { fill: theme.colors.secondaryDark },
      '& svg': { width: '21px', height: '18px' },
      [MAX_WIDTH_1439]: {
        '& svg': { width: '18px', height: '16px' },
      },
      [MAX_WIDTH_1239]: {
        '& svg': { width: '19px', height: '19px' },
      },
      [MAX_WIDTH_767]: {
        width: '108px',
        '& svg': { width: '13px', height: '11px' },
      },
    },
    likesCount: {
      color: theme.colors.white,
      fontFamily: theme.fonts.Everett.Regular,
      paddingLeft: '11px',
      fontSize: '1.045rem',
      lineHeight: '1.255rem',
      [MAX_WIDTH_1439]: {
        paddingLeft: '8px',
        fontSize: '0.91rem',
        lineHeight: '1.095rem',
      },
      [MAX_WIDTH_1239]: {
        paddingLeft: '9px',
        fontSize: '1rem',
        lineHeight: '1.2rem',
      },
      [MAX_WIDTH_767]: {
        paddingLeft: '5px',
        fontSize: '0.75rem',
        lineHeight: '1rem',
      },
    },
  })
);
