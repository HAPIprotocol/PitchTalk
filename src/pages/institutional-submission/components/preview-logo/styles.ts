import { createUseStyles } from 'react-jss';

import { IAppTheme } from 'shared/styles/theme';

import { MAX_WIDTH_1239, MAX_WIDTH_767 } from '../../../../shared/constants';

export const useStyles = createUseStyles<
  string,
  { previewImage: string },
  IAppTheme
>((theme: IAppTheme) => ({
  container: {
    height: '229px',
    aspectRatio: '1.5',
    border: `1px solid ${theme.colors.secondaryDark}`,
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [MAX_WIDTH_1239]: {
      margin: '0 auto',
    },
    [MAX_WIDTH_767]: {
      height: '180px',
    },
  },
  logo: {
    width: '55%',
    display: ({ previewImage }) => (previewImage ? 'block' : 'none'),
  },
  emptyImageText: {
    fontSize: '0.875rem',
    fontFamily: theme.fonts.Everett.Light,
    lineHeight: '20px',
    color: theme.colors.grey,
    textAlign: 'center',
    display: ({ previewImage }) => (previewImage ? 'none' : 'block'),
  },
}));
