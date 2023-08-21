export enum SocialPlaceholdersName {
  TELEGRAM = 'telegram',
  MEDIUM = 'medium',
  DISCORD = 'discord',
  TWITTER = 'twitter',
  NEAR_SOCIAL = 'near social',
  EMAIL = 'email',
  BANNER = 'banner',
  LOGO = 'logo',
  URL = 'url',
}

export enum InputFieldsName {
  TELEGRAM = 'contact_information.telegram',
  EMAIL = 'contact_information.email',
  PROJECT_NAME = 'general_information.project_name',
  PROJECT_DESCRIPTION = 'general_information.project_description',
  PROJECT_BANNER = 'general_information.project_banner',
  PROJECT_LOGO = 'general_information.project_logo',
  PROJECT_URL = 'general_information.project_url',
}

export interface IParticipantFormModel {
  contact_information: {
    telegram: string;
    email: string;
  };
  general_information: {
    project_name: string;
    project_banner: string;
    project_description: string;
    project_logo: string;
    project_url: string;
  };
  social_media: {
    telegram: string;
    medium: string;
    discord: string;
    twitter: string;
    near_social: string;
  };
  tags: string[];
}
export interface IPreviewImageModel {
  banner: string;
  logo: string;
}

export interface IPreviewLogoModel {
  logo: string;
}

export interface general_information {
  project_name: string;
  project_banner: string;
  project_description: string;
  project_logo: string;
  project_url: string;
}
