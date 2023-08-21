import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

const styles = createUseStyles((theme: IAppTheme) => ({
  monthSelect: {
    display: 'flex',
    marginRight: '36px',
    alignItems: 'center',
    position: 'relative',
  },
  monthSelectValue: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.5rem',
    color: theme.colors.white,
    minWidth: '170px',
    order: 1,
    [MAX_WIDTH_1239]: {
      fontSize: '0.95rem',
    },
    [MAX_WIDTH_767]: {
      fontSize: '0.875rem',
      minWidth: '100px',
      marginRight: '10px',
      order: 0,
    },
  },
  monthSelectToggle: {
    backgroundColor: theme.colors.grey,
    border: 'none',
    padding: 'unset',
    width: '18px',
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginInline: '0px 8px',
    borderRadius: '50%',
    order: 0,
  },
  monthSelectIcon: {
    marginLeft: '0.5px',
    marginTop: '1px',
  },
  monthSelectIconRotate: {
    transform: 'scale(-1, -1)',
    marginBottom: '1px',
  },
  monthList: {
    display: 'flex',
  },
  dropDownOpened: {
    zIndex: 5,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    maxHeight: '218px',
    overflow: 'auto',
    backgroundColor: theme.colors.disabledGrey,
    borderRadius: '3px',
    padding: '12px 4px',
    left: 0,
    top: 'calc(100% + 8px)',
  },
  monthsByYear: {},
  year: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.625rem',
    color: theme.colors.grey,
    borderBottom: ['1px', 'solid', theme.colors.grey],
    padding: '0 8px',
  },
  months: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '4px',
  },
  month: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.disabledGrey,
    outline: 'none',
    borderRadius: '3px',
    padding: '3px 4px',
    borderColor: 'unset',
    border: 'none',
    '&:hover': {
      backgroundColor: theme.colors.white,
      color: theme.colors.disabledGrey,
    },
    '&:disabled': {
      backgroundColor: theme.colors.white,
      color: theme.colors.disabledGrey,
    },
  },
}));

export default styles;
