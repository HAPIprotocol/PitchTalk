import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';

import { DefaultTablet } from './DefaultTablet';
import { useStyles } from './styles';

const getScreenSize = {
  [EDimensions.DESKTOP]: { width: 728, height: 506 },
  [EDimensions.LAPTOP]: { width: 563, height: 392 },
  [EDimensions.MEDIUM]: { width: 407, height: 282 },
  [EDimensions.SMALL]: { width: 361, height: 250 },
  [EDimensions.UNKNOWN]: { width: 506, height: 728 },
};

interface ITabletLeftProps {
  children?: JSX.Element;
}

export const TabletLeft: React.FC<ITabletLeftProps> = ({ children }) => {
  const classes = useStyles();
  const dimension = useWindowDimensions();

  return (
    <div className={classes.tabletLeft}>
      <DefaultTablet screenSize={getScreenSize[dimension]} classes={classes} />
      <div className={classes.tabletContentLeft}>{children}</div>
    </div>
  );
};
