import { createUseStyles } from 'react-jss';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  sectionWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.colors.white,
  },
  refereeList: {
    maxWidth: '785px',
    marginInline: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    width: '100%',
    [MAX_WIDTH_1239]: { gap: '15px' },
    [MAX_WIDTH_767]: {
      gap: '10px',
      justifyContent: 'center',
    },
  },
  seeAllBtn: {
    marginInline: 'auto',
    marginTop: '24px',
    '& button': {
      '& span': {
        fontFamily: theme.fonts.Everett.Medium,
        textTransform: 'uppercase',
      },
      [MAX_WIDTH_1439]: { '& span': { fontSize: '1.05rem' } },
      [MAX_WIDTH_1239]: { '& span': { fontSize: '1rem' } },
      [MAX_WIDTH_767]: {
        width: '110px',
        height: '30px',
        '& span': { fontSize: '0.95rem' },
      },
    },
  },
}));
