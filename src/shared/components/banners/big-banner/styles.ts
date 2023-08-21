import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { MAX_WIDTH_767 } from '../../../constants';

export const bannerStyles = createUseStyles((theme: IAppTheme) => ({
  container: {
    width: '616px',
    height: '100%',
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    transition: '0.3s height',
    top: '-4px',
    [MAX_WIDTH_767]: {
      width: '100%',
      height: 'auto',
    },
  },
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '15px',
    width: '17px',
    height: '17px',
    zIndex: 1000000,
    '& image': {
      width: '17px',
      height: '17px',
    },
  },
  title: {
    fontSize: '16px',
    maxWidth: '300px',
    color: theme.colors.white,
    fontFamily: theme.fonts.Everett.Medium,
    textTransform: 'uppercase',
    display: 'block',
    padding: 0,
    margin: 0,
    position: 'absolute',
    right: '140px',
    top: '-15px',
    [MAX_WIDTH_767]: {
      fontSize: '12px',
      maxWidth: '150px',
    },
  },
  titleLogo: {
    objectFit: 'cover',
    width: '112px',
    height: '9px',
    marginLeft: '60px',
    marginBottom: '10px',
    opacity: '0',
    [MAX_WIDTH_767]: {
      width: '64px',
      height: '5px',
    },
  },
  actionWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'end',
    right: '60px',
    top: '-20px',
    [MAX_WIDTH_767]: {
      top: '-10px',
      right: '30px',
    },
  },
  btn: {
    fontSize: '12px',
    width: '124px',
    height: '48px',
    color: theme.colors.white,
    textTransform: 'uppercase',
    fontFamily: theme.fonts.Everett.Medium,
    background: theme.colors.secondaryDark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3px',
    [MAX_WIDTH_767]: {
      width: '72px',
      height: '24px',
      fontSize: '8px',
    },
  },
}));
