import { ESocialLinksKeys } from '@pitchtalk/contract-api-js/dist/core';
import { IProjectArgs } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';

import { ipfsHostEnd, ipfsHostStart } from 'services/config';

import { IParticipantFormModel } from './interfaces';

export const createSubmissionProject = (values: IParticipantFormModel) => {
  const contact_links = {
    telegram: values.contact_information.telegram,
    email: values.contact_information.email,
  };
  const project: IProjectArgs = {
    name: values.general_information.project_name,
    description: values.general_information.project_description,
    logo: values.general_information.project_logo,
    banner: values.general_information.project_banner,
    project_url: values.general_information.project_url,
    social_links: {
      [ESocialLinksKeys.TELEGRAM]: values.social_media.telegram,
      [ESocialLinksKeys.TWITTER]: values.social_media.twitter,
      [ESocialLinksKeys.DISCORD]: values.social_media.discord,
      [ESocialLinksKeys.MEDIUM]: values.social_media.medium,
      [ESocialLinksKeys.NEAR_SOCIAL]: values.social_media.near_social,
    },
    tags: values.tags,
  };
  return {
    contact_links,
    project,
  };
};

export const getCorrectIPFSLinks = <T>(linksMap: T): T => {
  const result: T = {} as T;
  for (const key in linksMap) {
    let value = '';
    if (
      (linksMap[key] && (linksMap[key] as string)?.startsWith('http')) ||
      (linksMap[key] as string)?.startsWith('blob')
    ) {
      value = (linksMap[key] as string) || '';
    } else if (linksMap[key]) {
      value = `${ipfsHostStart}${linksMap[key]}${ipfsHostEnd}`;
    }
    result[key] = value as T[Extract<keyof T, string>];
  }
  return result;
};
