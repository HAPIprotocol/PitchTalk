import { createUseStyles } from 'react-jss';

import filterCheckIcon from 'assets/images/icons/filter-check-icon.svg';
import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

interface IStylesProps {
  isActive: boolean;
}

export const useStyles = createUseStyles<string, IStylesProps, IAppTheme>(
  (theme: IAppTheme) => ({
    filtersWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      width: '324px',
      height: '120px',
      [MAX_WIDTH_767]: { width: '252px' },
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
      '& label': {
        cursor: 'pointer',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
      },
      [MAX_WIDTH_767]: {
        width: '120px',
        height: '25px',
        fontSize: '0.75rem',
        lineHeight: '1rem',
      },
    },
    enabled: {
      background: theme.colors.filterColor,
      color: theme.colors.lightDark,
      transition: 'ease all 0.3s',
      '& label:before': {
        content: '""',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${filterCheckIcon})`,
        width: '13px',
        height: '10px',
        marginRight: '10px',
      },
      '& label:after': {
        content: '""',
        width: '23px',
        flex: 1,
      },
    },
  })
);
