import { createUseStyles } from 'react-jss';

import noImageBackground from 'assets/images/no-image-background.png';
import { IAppTheme } from 'shared/styles/theme';

import {
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from '../../../../shared/constants';

export const useStyles = createUseStyles<
  string,
  { previewImage: string },
  IAppTheme
>((theme: IAppTheme) => ({
  previewImage: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: ({ previewImage }) =>
      previewImage ? `url(${previewImage})` : `url(${noImageBackground})`,
    overflow: 'hidden',
  },
  projectLogo: {
    height: '229px',
    aspectRatio: '1.77',
    border: `1px solid ${theme.colors.secondaryDark}`,
    borderRadius: '3px',
    backgroundImage: `url(${noImageBackground})`,
    display: ({ previewImage }) => (previewImage ? 'block' : 'flex'),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    [MAX_WIDTH_1239]: {
      marginTop: '20px',
    },
    [MAX_WIDTH_767]: {
      marginTop: '50px',
      height: '180px',
    },
  },
  previewTitle: {
    fontFamily: theme.fonts.Everett.Regular,
    fontSize: '1.625rem',
    color: theme.colors.white,
    padding: 0,
    margin: 0,
    maxWidth: '50%',
    display: 'block',
    overflowWrap: 'break-word',
    [MAX_WIDTH_1439]: {
      fontSize: '1.625rem',
      maxWidth: '50%',
    },
    [MAX_WIDTH_767]: {
      fontSize: '1.375rem',
      maxWidth: '50%',
    },
  },
  previewTitlesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5px',
    position: 'absolute',
    gap: '10px',
    top: '15%',
    left: 0,
    right: 0,
    marginInline: '18px',
    [MAX_WIDTH_767]: {
      padding: '0',
      top: '18px',
      justifyContent: 'flex-start',
      marginInline: '16px',
    },
  },
  imageLogo: {
    width: '75px',
    height: '75px',
    maxWidth: '75px',
    maxHeight: '75px',
    padding: '2px',
    [MAX_WIDTH_767]: {
      width: '60px',
      height: '60px',
      maxWidth: '60px',
      maxHeight: '60px',
    },
  },
  emptyImageText: {
    fontSize: '0.875rem',
    fontFamily: theme.fonts.Everett.Light,
    lineHeight: '20px',
    color: theme.colors.grey,
    textAlign: 'center',
  },
  previewName: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
}));
