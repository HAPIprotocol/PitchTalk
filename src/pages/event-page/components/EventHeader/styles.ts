import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import { MAX_WIDTH_767 } from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { banner?: string },
  IAppTheme
>((theme: IAppTheme) => ({
  eventHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.colors.white,
    userSelect: 'none',
  },
  eventBanner: {
    width: '100%',
    aspectRatio: 3,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: (props) =>
      props?.banner ? `url(${props?.banner})` : `url(${projectFrame})`,
    [MAX_WIDTH_767]: { minHeight: '109.5px' },
  },
}));
