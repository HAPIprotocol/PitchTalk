import { createUseStyles } from 'react-jss';

import { textWithGradient } from 'pages/about-page/styles';
import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1600px',
    flex: 1,
    alignItems: 'center',
    padding: '60px 155px',
    color: theme.colors.white,
    [MAX_WIDTH_1439]: { padding: '40px 118px 60px' },
    [MAX_WIDTH_1239]: { padding: '40px 86px 60px' },
    [MAX_WIDTH_767]: { padding: '24px 40px 32px' },
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  backBtnContainer: {
    position: 'sticky',
    top: 0,
    left: 0,
    color: theme.colors.white,
    width: '100%',
    padding: '20px',
    background: theme.colors.black,
    zIndex: 80,
    [MAX_WIDTH_1239]: { padding: '10px' },
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
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: theme.colors.white,
    fontSize: '1.5rem',
    '& svg': {
      width: '26px',
      height: '26px',
      marginBottom: '2px',
      color: theme.colors.white,
    },
    [MAX_WIDTH_1239]: {
      gap: '10px',
      fontSize: '1.25rem',
      '& svg': {
        width: '20px',
        height: '20px',
        marginBottom: '0',
      },
    },
  },
  titleWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '3.9rem',
    marginBlock: '15px',
    userSelect: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    ...textWithGradient,
    [MAX_WIDTH_1439]: { fontSize: '3.7rem' },
    [MAX_WIDTH_1239]: { fontSize: '3.2rem', marginBlock: '12px' },
    [MAX_WIDTH_767]: { fontSize: '2.4rem', marginBlock: '8px' },
  },
}));
