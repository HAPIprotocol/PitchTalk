import { createUseStyles } from 'react-jss';

import { MAX_WIDTH_1239, MAX_WIDTH_1439 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  formGroupTitle: {
    marginTop: '53px',
    display: 'block',
    fontSize: '1.125rem',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Light,
    [MAX_WIDTH_1239]: { textAlign: 'center' },
  },
  content: {
    color: theme.colors.white,
    width: '100%',
    marginTop: '40px',
    display: 'flex',
    [MAX_WIDTH_1439]: { marginTop: '32px' },
    [MAX_WIDTH_1239]: { marginTop: '27px' },
  },
  tagsWrapperClass: {
    padding: '8px 30px 8px 8px',
    border: ['1px', 'solid', theme.colors.secondaryDark],
    borderRadius: '5px',
    gap: '10px',
    margin: '0px',
    borderColor: theme.colors.secondaryDark,
    [MAX_WIDTH_1239]: {
      padding: '6px 30px 6px 6px',
      borderRadius: '3px',
      gap: '7px',
    },
  },
  tagClass: {
    display: 'flex',
    fontSize: '0.85rem',
    gap: '8px',
    padding: '8px',
    [MAX_WIDTH_1239]: {
      fontSize: '0.7rem',
      gap: '8px',
      padding: '5px',
    },
  },
  removeTagIconClass: {
    width: '14px',
    height: '14px',
    cursor: 'pointer',
    [MAX_WIDTH_1239]: { width: '12px', height: '12px' },
  },
  noTagMessageClass: {
    padding: '8.75px',
    margin: 0,
    [MAX_WIDTH_1239]: { padding: '6px', fontSize: '0.8rem' },
  },
  tagListItem: {
    padding: '8px',
    [MAX_WIDTH_1239]: { fontSize: '0.85rem' },
  },
  tagListItemDisabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  arrowIcon: {
    position: 'absolute',
    top: '50%',
    right: '15px',
    width: '10px',
    height: '10px',
    transform: 'translateY(-50%)',
    '& path': { fill: theme.colors.white },
  },
  dropDownMenu: {
    width: '100%',
    minWidth: 'fit-content',
    maxHeight: 'calc(35px * 7.75)',
    overflowY: 'auto',
    padding: '5px',
    zIndex: 3,
    [MAX_WIDTH_1239]: {
      maxHeight: 'calc(32.5px * 5.75)',
    },
  },
  infoLabel: {
    position: 'absolute',
    top: 0,
    left: '5px',
    paddingInline: '5px',
    fontSize: '0.75rem',
    transform: 'translate(0, -70%)',
    background: theme.colors.black,
    margin: 0,
    color: theme.colors.white,
  },
}));
