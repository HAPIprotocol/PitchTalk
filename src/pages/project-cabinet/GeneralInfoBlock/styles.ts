import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    color: theme.colors.white,
    marginBottom: '100px',
    [MAX_WIDTH_1439]: { marginBottom: '47px' },
  },
  projectInfoWrapper: {
    marginBottom: '50px',
    [MAX_WIDTH_1439]: { marginBottom: '43px' },
    [MAX_WIDTH_767]: { marginBottom: '40px' },
  },
  socialInfoWrapper: {
    marginBottom: '77px',
    [MAX_WIDTH_1439]: { marginBottom: '60px' },
    [MAX_WIDTH_1239]: { marginBottom: '50px' },
    [MAX_WIDTH_767]: { marginBottom: '40px' },
  },
  documentationWrapper: {
    marginTop: '77px',
    [MAX_WIDTH_1439]: { marginTop: '62px' },
    [MAX_WIDTH_1239]: { marginTop: '50px' },
    [MAX_WIDTH_767]: { marginTop: '40px' },
  },
  tagsWrapper: {
    marginBottom: '77px',
    [MAX_WIDTH_1439]: { marginBottom: '60px' },
    [MAX_WIDTH_1239]: { marginBottom: '50px' },
    [MAX_WIDTH_767]: { marginBottom: '40px' },
  },
  controlsWrapper: {},
  controls: {
    display: 'flex',
    flexDirection: 'column',
    width: '325px',
    rowGap: '15px',
    [MAX_WIDTH_1439]: { width: '263px', rowGap: '12px' },
    [MAX_WIDTH_1239]: {
      alignSelf: 'center',
      marginInline: 'auto',
    },
  },
  saveBtn: {
    width: '100%',
    '& button': {
      width: '100%',
      height: '77px',
      fontSize: '1.25rem',
    },
    [MAX_WIDTH_1439]: { '& button': { height: '62px', fontSize: '1.015rem' } },
  },
  comment: {
    width: '100%',
    color: theme.colors.grey,
    backgroundColor: 'unset',
    border: ['1px', 'solid', theme.colors.lightGrey],
    borderRadius: '3px',
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    padding: '10px 0px 10px 12px',
    outline: 'none',
    resize: 'none',
    [MAX_WIDTH_1439]: { padding: '6px 0px 6px 10px' },
  },
}));
