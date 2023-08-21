import { createUseStyles } from 'react-jss';

import {
  EDimensions,
  MAX_WIDTH_1239,
  MAX_WIDTH_1439,
  MAX_WIDTH_767,
} from 'shared/constants';
import { IAppTheme } from 'shared/styles/theme';

const IMAGE_WIDTH_TO_DIMENSION_PX: { [key in EDimensions]: number } = {
  [EDimensions.DESKTOP]: 120,
  [EDimensions.LAPTOP]: 100,
  [EDimensions.MEDIUM]: 80,
  [EDimensions.SMALL]: 70,
  [EDimensions.UNKNOWN]: 80,
};

export const useStyles = createUseStyles((theme: IAppTheme) => ({
  sectionWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.colors.white,
  },
  partnersList: {
    display: 'grid',
    justifyItems: 'center',
    width: '100%',
    gridTemplateColumns: 'repeat(3, 33%)',
  },
  partnerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerItemImg: {
    width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.DESKTOP],
    height: 130,
    marginBlock: '15px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [MAX_WIDTH_1439]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.LAPTOP],
      height: 110,
      marginBlock: '10px',
    },
    [MAX_WIDTH_1239]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.MEDIUM],
      height: 100,
    },
    [MAX_WIDTH_767]: {
      width: IMAGE_WIDTH_TO_DIMENSION_PX[EDimensions.SMALL],
      height: 90,
    },
  },
}));
