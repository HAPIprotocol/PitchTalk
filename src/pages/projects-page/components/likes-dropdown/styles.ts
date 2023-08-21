import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1439, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isGrant?: boolean;
  isLikes?: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    likesDropDownWrapper: {
      width: 'fit-content',
      marginInline: 'auto 0px',
      display: ({ isLikes, isGrant }) =>
        !isLikes && !isGrant ? 'none' : 'block',
    },
    likesDropDownMenu: {
      width: '146px',
      maxHeight: '100px',
      overflowY: 'auto',
      padding: '10px 13px',
      cursor: 'default',
    },
    likesDropDownItem: {
      display: 'grid',
      gridTemplateColumns: '0.2fr 0.8fr',
      alignItems: 'center',
      fontSize: '0.625rem',
      lineHeight: '0.75rem',
      fontFamily: theme.fonts.Everett.Regular,
      color: theme.colors.lightGrey,
      pointerEvents: 'none',
      '& img': { width: '20px', height: '18px' },
      '&:not(:last-child)': { marginBottom: '7px' },
    },
    likesLabelWrapper: {
      width: 'unset',
      height: '31px',
      '& > :first-child': {
        padding: '6px',
        '& svg': { width: '16px', height: '15px' },
      },
      [MAX_WIDTH_1439]: {
        // width: ({ isLikes }) => (isLikes ? '112px' : 'unset'),
        height: '27px',
        '& > :first-child': {
          padding: '5px',
          '& svg': { width: '15px', height: '15px' },
        },
      },
      [MAX_WIDTH_767]: {
        // width: ({ isLikes }) => (isLikes ? '80px' : 'unset'),
        height: '21px',
        '& > div:first-child': {
          padding: '4px',
          '& > svg': { width: '12px', height: '12px' },
        },
      },
    },
    likesCountWrapper: {
      '& > svg': { width: '16px', height: '15px' },
      [MAX_WIDTH_767]: {
        '& > svg': { width: '11px', height: '11px' },
        '& span': { fontSize: '0.6rem' },
      },
    },
  })
);
