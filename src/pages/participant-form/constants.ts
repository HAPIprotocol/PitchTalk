import { IParticipantFormModel } from './interfaces';

export const initialValues: IParticipantFormModel = {
  contact_information: {
    telegram: '',
    email: '',
  },
  general_information: {
    project_name: '',
    project_banner: '',
    project_description: '',
    project_logo: '',
    project_url: '',
  },
  social_media: {
    telegram: '',
    medium: '',
    discord: '',
    twitter: '',
    near_social: '',
  },
  tags: [],
};
