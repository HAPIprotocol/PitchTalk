import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isActive: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    filterWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    filter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '155px',
      height: '32px',
      fontFamily: theme.fonts.Everett.Regular,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      color: theme.colors.filterColor,
      border: ['1px', 'solid', theme.colors.filterColor],
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'ease all 0.3s',
      '& label': { cursor: 'pointer' },
      '& svg': { marginRight: '10px' },
      '& svg path': { fill: theme.colors.filterColor },
      [MAX_WIDTH_767]: {
        width: '120px',
        height: '25px',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        '& svg': { marginRight: '7px', width: '15px', height: '15px' },
      },
    },
    sortDirectionWrapper: {
      display: 'flex',
      fontSize: '0.625rem',
      lineHeight: '0.75rem',
      marginTop: '16px',
      '& label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:first-child': { marginRight: '16px' },
      },
      '& input': {
        marginRight: '8px',
        borderRadius: '1px',
        borderWidth: '1px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        height: '0.75rem',
        width: '0.75rem',
        '&:checked': {
          backgroundColor: theme.colors.lightGrey,
        },
      },
      [MAX_WIDTH_767]: {
        fontSize: '0.55rem',
        lineHeight: '0.625rem',
        marginTop: '8px',
        '& label': {
          '&:first-child': { marginRight: '8px' },
        },
      },
    },
    enabled: {
      background: theme.colors.filterColor,
      color: theme.colors.lightDark,
      transition: 'ease all 0.3s',
      '& svg path': { fill: theme.colors.lightDark },
    },
  })
);
