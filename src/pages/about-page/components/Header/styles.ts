import { createUseStyles } from 'react-jss';

import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  aboutPageHeader: {
    fontSize: '6rem',
    lineHeight: '5.625rem',
    fontWeight: '500',
    fontFamily: theme.fonts.Everett.Regular,
    textTransform: 'uppercase',
    marginInline: '75px',
    marginBlock: '97.5px 81px',
    maxWidth: '1291px',
    textAlign: 'center',
    userSelect: 'none',
    ...textWithGradient,
    [MAX_WIDTH_1439]: {
      fontSize: '4.631rem',
      lineHeight: '4.313rem',
      marginInline: '120px',
      marginBlock: '73px 65px',
      maxWidth: '996px',
    },
    [MAX_WIDTH_1239]: {
      fontSize: '2.747rem',
      lineHeight: '2.575rem',
      marginInline: '87.5px',
      marginBlock: '65px 32px',
      maxWidth: '590px',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.25rem',
      lineHeight: '1.25rem',
      margin: '20px',
      maxWidth: '280px',
    },
  },
}));
