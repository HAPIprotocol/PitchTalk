import {
  IParticipantFormModel,
  SocialPlaceholdersName,
} from '../../interfaces';

export const detectSocialValue = (
  label: string,
  values: IParticipantFormModel
) => {
  switch (label) {
    case SocialPlaceholdersName.TELEGRAM:
      return values.social_media.telegram;
    case SocialPlaceholdersName.MEDIUM:
      return values.social_media.medium;
    case SocialPlaceholdersName.DISCORD:
      return values.social_media.discord;
    case SocialPlaceholdersName.TWITTER:
      return values.social_media.twitter;
    case SocialPlaceholdersName.NEAR_SOCIAL:
      return values.social_media.near_social;
    //  NO DEFAULT
    default:
      return;
  }
};
