import { createUseStyles } from 'react-jss';

import projectFrame from 'assets/images/project-frame.png';
import { IAppTheme } from 'shared/styles/theme';

export const useStyles = createUseStyles<
  string,
  { banner?: string },
  IAppTheme
>(() => ({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: '24px',
  },
  banner: {
    width: '100%',
    aspectRatio: 1.77,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: (props) =>
      props?.banner ? `url(${props?.banner})` : `url(${projectFrame})`,
    borderRadius: '3px',
  },

  likesWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: '3px',
  },
  countWrapper: {
    borderRadius: '3px',
  },
}));
