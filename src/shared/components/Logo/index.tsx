import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';

interface ILogoProps {
  logo?: string;
  alt?: string;
  logoContainerStyle?: string;
  logoStyle?: string;
}

export const Logo: React.FC<ILogoProps> = memo(
  ({ logo, alt = 'Logo', logoContainerStyle, logoStyle }) => {
    const classes = useStyles();
    if (!logo) return null;
    return (
      <div className={classNames(logoContainerStyle, classes.logoContainer)}>
        <LazyLoadImage
          src={logo}
          className={classNames(logoStyle, classes.logo)}
          alt={alt}
          loading="lazy"
        />
      </div>
    );
  }
);
