import {
  ESocialLinksKeys,
  ESocialUserLinksKeys,
  SocialLinks,
} from '@pitchtalk/contract-api-js/dist/core';

import { ReactComponent as DiscordIcon } from 'assets/images/social-icons/discord-icon.svg';
import { ReactComponent as LinkedinIcon } from 'assets/images/social-icons/linkedin-icon.svg';
import { ReactComponent as MediumIcon } from 'assets/images/social-icons/medium-icon.svg';
import { ReactComponent as NearSocial } from 'assets/images/social-icons/near_social-icon.svg';
import { ReactComponent as TelegramIcon } from 'assets/images/social-icons/telegram-icon.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/social-icons/twitter-icon.svg';
import { ReactComponent as WebIcon } from 'assets/images/web-icon.svg';

export const URL_TO_ICON_MAPPING = {
  [ESocialLinksKeys.TWITTER]: TwitterIcon,
  [ESocialLinksKeys.TELEGRAM]: TelegramIcon,
  [ESocialLinksKeys.DISCORD]: DiscordIcon,
  [ESocialLinksKeys.MEDIUM]: MediumIcon,
  [ESocialLinksKeys.NEAR_SOCIAL]: NearSocial,
  [ESocialUserLinksKeys.LINKEDIN]: LinkedinIcon,
  web_url: WebIcon,
};

export const normalizeIcons = (socialLinks: SocialLinks) => ({
  [ESocialLinksKeys.TWITTER]: socialLinks.twitter,
  [ESocialLinksKeys.TELEGRAM]: socialLinks.telegram,
  [ESocialLinksKeys.DISCORD]: socialLinks.discord,
  [ESocialLinksKeys.MEDIUM]: socialLinks.medium,
  [ESocialLinksKeys.NEAR_SOCIAL]: socialLinks.near_social,
});
