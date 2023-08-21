import { ITag } from '@pitchtalk/contract-api-js';
import { ProjectArgs, SocialLinks } from '@pitchtalk/contract-api-js/dist/core';
import { t } from 'i18next';

import { DESCRIPTION_LENGTH } from 'shared/constants';
import {
  DISCORD_REG_EXP,
  MEDIUM_COMBINED_REGEX,
  NEAR_SOCIAL_REG_EXP,
  TELEGRAM_REG_EXP,
  TWITTER_COMBINED_REGEX,
} from 'shared/constants/regex';
import YUP from 'shared/utils/yupUtils';

import { ISubmissionProject, ISubmissionSubProject } from '../interfaces';

export type GeneralInfoBlockState = {
  name: string;
  logo: string;
  banner: string;
  description: string;
  project_url: string;
  social_links: SocialLinks;
  tags: string[];
};

export const getGeneralInfoBlockState = (
  project: ISubmissionProject | ISubmissionSubProject
): GeneralInfoBlockState => ({
  name: project?.name ?? '',
  logo: project?.logo ?? '',
  banner: project?.banner ?? '',
  description: project?.description ?? '',
  project_url: project.project_url ?? '',
  social_links: {
    telegram: project.social_links?.telegram ?? '',
    medium: project.social_links?.medium ?? '',
    discord: project.social_links?.discord ?? '',
    twitter: project.social_links?.twitter ?? '',
    near_social: project.social_links?.near_social ?? '',
  },
  tags: getCorrectTags(project?.tags || []),
});

export const getCorrectTags = (tags: ITag[] | string[]): string[] => {
  return tags.map((tag: ITag | string) => (tag as ITag)?.id || (tag as string));
}

export const getProjectForUpdating = (
  p: GeneralInfoBlockState
): ProjectArgs => ({
  name: p.name,
  description: p.description,
  logo: p.logo,
  banner: p.banner,
  project_url: p.project_url,
  social_links: p?.social_links || ({} as SocialLinks),
  tags: getCorrectTags(p?.tags || []),
});

export const validationSchema = YUP.object({
  name: YUP.string().required(t('validation.project.name.required')),
  description: YUP.string()
    .max(DESCRIPTION_LENGTH, t('validation.project.description.max'))
    .required(t('validation.project.description.required')),
  project_url: YUP.string()
    .startWithHTTP()
    .url(t('participantForm.validation.invalidUrl'))
    .required(t('validation.project.projectURL.required')),
  logo: YUP.string().required(t('participantForm.validation.logoIsRequired')),
  banner: YUP.string().required(
    t('participantForm.validation.bannerIsRequired')
  ),
  social_links: YUP.object({
    telegram: YUP.string()
      .url(t('participantForm.validation.invalidUrl'))
      .matches(TELEGRAM_REG_EXP, t('participantForm.validation.telegram'))
      .optional(),
    medium: YUP.string()
      .url(t('participantForm.validation.invalidUrl'))
      .matches(MEDIUM_COMBINED_REGEX, t('participantForm.validation.medium'))
      .optional(),
    discord: YUP.string()
      .url(t('participantForm.validation.invalidUrl'))
      .matches(DISCORD_REG_EXP, t('participantForm.validation.discord'))
      .optional(),
    twitter: YUP.string()
      .url(t('participantForm.validation.invalidUrl'))
      .matches(TWITTER_COMBINED_REGEX, t('participantForm.validation.twitter'))
      .optional(),
    near_social: YUP.string()
      .url(t('participantForm.validation.invalidUrl'))
      .matches(NEAR_SOCIAL_REG_EXP, t('participantForm.validation.near_social'))
      .optional(),
  }),
});
