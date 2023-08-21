import { createUseStyles } from 'react-jss';

import { getInputInfoLabelStyles } from 'pages/project-cabinet/utils';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '56px',
    gap: '20px',
    [MAX_WIDTH_1239]: { flexDirection: 'column' },
    [MAX_WIDTH_767]: {
      gap: '0px',
      width: '100%',
      maxWidth: '300px',
      marginInline: 'auto',
    },
  },
  controlInput: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& > label': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '11px',
      '& svg': {
        width: '14px',
        height: '14px',
        marginRight: '10px',
        '& path': { fill: theme.colors.white },
      },
      '& span': {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.05rem',
        [MAX_WIDTH_1439]: { fontSize: '0.71rem', lineHeight: '0.85rem' },
      },
    },
    [MAX_WIDTH_1439]: {
      '& label': { marginBottom: '10px' },
      '& svg': { width: '12px', height: '12px', marginRight: '8px' },
    },
    [MAX_WIDTH_767]: {
      width: '100%',
      marginBottom: '25px',
    },
  },
  inputContainer: {
    width: '100%',
    margin: 0,
  },
  input: {
    height: 'unset',
    padding: '10px 0px 10px 16px',
    fontSize: '0.75rem',
    lineHeight: '0.9rem',
    fontWeight: 400,
    [MAX_WIDTH_1439]: { padding: '7px 0px 7px 12px' },
  },
  positionAbsolute: {
    position: 'absolute',
    top: '100%',
    marginTop: '4px',
  },
  ...getInputInfoLabelStyles(theme),
}));
