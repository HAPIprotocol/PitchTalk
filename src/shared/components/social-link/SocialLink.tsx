import { ESocialLinksKeys } from '@pitchtalk/contract-api-js/dist/core';
import { CSSProperties } from 'react';

import { URL_TO_ICON_MAPPING } from 'shared/utils/socialLinkUtils';

interface SocialLinkProps {
  link: [string, string];
  width?: number;
  height?: number;
  styles: string;
  style?: CSSProperties;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  link: [type, url],
  styles,
  style,
  ...props
}) => {
  const Component = URL_TO_ICON_MAPPING[type as ESocialLinksKeys];
  const openSocialLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return Component ? (
    <Component
      {...props}
      className={styles}
      style={
        !url
          ? {
              pointerEvents: 'none',
              cursor: 'pointer',
              opacity: '0.65',
              ...style,
            }
          : { ...style }
      }
      onClick={openSocialLink}
    />
  ) : (
    <></>
  );
};
