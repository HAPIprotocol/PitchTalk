import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

const styles = createUseStyles((theme: IAppTheme) => ({
  select: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '2px',
    color: theme.colors.white,
    height: '36px',
    '&.readOnly': {
      color: theme.colors.inputReadOnly,
      '& svg, img': { opacity: 0.5 },
    },
  },
  selectWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    width: '100%',
    padding: '11px 17px',
  },
  selectValue: {
    cursor: 'pointer',
    fontFamily: theme.fonts.Everett.Regular,
    display: 'flex',
    alignItems: 'center',
    '& img': { width: '21px', height: '21px', marginLeft: '5px' },
  },
  selectIcon: {
    width: '11px',
    height: '14px',
    '& path': { fill: theme.colors.lightGrey },
  },
  selectIconRotate: {
    composes: '$selectIcon',
    transform: 'scale(-1, -1)',
  },
  dropDownOpened: {
    zIndex: 5,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '218px',
    overflow: 'auto',
    backgroundColor: theme.colors.disabledGrey,
    borderRadius: '3px',
    padding: '12px 4px',
    left: 0,
    top: 'calc(100% + 8px)',
    rowGap: '2px',
  },
  vestingTypeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.875rem',
    color: theme.colors.white,
    backgroundColor: theme.colors.disabledGrey,
    outline: 'none',
    borderRadius: '3px',
    padding: '3px 14px',
    cursor: 'pointer',
    border: ['1px', 'solid', theme.colors.disabledGrey],
    '&:hover': {
      borderColor: theme.colors.white,
    },
    '&:disabled': {
      backgroundColor: theme.colors.white,
      color: theme.colors.disabledGrey,
      borderColor: theme.colors.white,
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
}));

export default styles;
