import { SocialLinks } from '@pitchtalk/contract-api-js/dist/core';
import { memo } from 'react';

import { SocialLink } from 'shared/components/social-link/SocialLink';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';

interface IProjectSocialProps {
  links: SocialLinks | (SocialLinks & { id: string });
}

export const ProjectSocial: React.FC<IProjectSocialProps> = memo(
  ({ links }) => {
    const classes = useStyles();

    return (
      <div className={classes.socialLinks}>
        {Object.entries(normalizeIcons(links)).map(
          (link: [string, string], ind) =>
            link[1] ? (
              <SocialLink
                width={24}
                height={24}
                key={ind}
                link={link}
                styles={classes.socialLink}
              />
            ) : null
        )}
      </div>
    );
  }
);
