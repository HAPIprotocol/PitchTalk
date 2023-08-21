import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';

import { DefaultTablet } from './DefaultTablet';
import { useStyles } from './styles';
import tabletContent1 from './tablet-content-right-1.png';
import tabletContent2 from './tablet-content-right-2.png';

const getScreenSize = {
  [EDimensions.DESKTOP]: { width: 728, height: 506 },
  [EDimensions.LAPTOP]: { width: 563, height: 392 },
  [EDimensions.MEDIUM]: { width: 407, height: 282 },
  [EDimensions.SMALL]: { width: 330, height: 228 },
  [EDimensions.UNKNOWN]: { width: 506, height: 728 },
};

export const TabletRight: React.FC = () => {
  const classes = useStyles();
  const dimension = useWindowDimensions();

  return (
    <div className={classes.tablet}>
      <DefaultTablet screenSize={getScreenSize[dimension]} classes={classes} />
      <div className={classes.tabletContent}>
        <div className={classes.tabletRightImages}>
          <img src={tabletContent1} alt="" loading="lazy" />
          <img src={tabletContent2} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};
