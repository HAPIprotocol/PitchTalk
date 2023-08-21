import tabletButton from './tablet-button.png';
import tabletFrame from './tablet-frame.png';

interface IDefaultTablet {
  screenSize: { width: number; height: number };
  classes: Record<string, string>;
}

export const DefaultTablet: React.FC<IDefaultTablet> = ({
  screenSize,
  classes,
}) => (
  <>
    <img
      src={tabletFrame}
      alt=""
      loading="lazy"
      style={{ width: screenSize.width, height: screenSize.height }}
    />
    <img src={tabletButton} alt="" loading="lazy" className={classes.button} />
  </>
);
