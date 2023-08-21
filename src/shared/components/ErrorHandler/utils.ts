import { t } from 'i18next';

import {
  DISCORD_REG_EXP,
  MEDIUM_COMBINED_REGEX,
  NEAR_SOCIAL_REG_EXP,
  TELEGRAM_REG_EXP,
  TWITTER_COMBINED_REGEX,
} from 'shared/constants/regex';
import yup from 'shared/utils/yupUtils';

import { MAX_LENGTH } from '../../constants';
import { IErrorInstitutionalModel, IErrorModel } from '../../interfaces';

export const getParticipantFormValidation = (
  projectsNames: string[]
): yup.SchemaOf<IErrorModel> =>
  yup.object({
    contact_information: yup.object({
      telegram: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(TELEGRAM_REG_EXP, t('participantForm.validation.telegram'))
        .required(t('participantForm.validation.requiredField')),
      email: yup
        .string()
        .email(t('participantForm.validation.validEmail'))
        .required(t('participantForm.validation.requiredField')),
    }),
    general_information: yup.object({
      project_name: yup
        .string()
        .notOneOf(projectsNames, t('validation.projectExist'))
        .required(t('participantForm.validation.requiredField')),

      project_description: yup
        .string()
        .max(MAX_LENGTH, t('participantForm.validation.maxLength'))
        .required(t('participantForm.validation.requiredField')),
      project_url: yup
        .string()
        .startWithHTTP()
        .url(t('participantForm.validation.invalidUrl'))
        .required(t('participantForm.validation.requiredField')),
      project_logo: yup
        .string()
        .required(t('participantForm.validation.logoIsRequired')),
      project_banner: yup
        .string()
        .required(t('participantForm.validation.bannerIsRequired')),
    }),
    social_media: yup.object({
      telegram: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(TELEGRAM_REG_EXP, t('participantForm.validation.telegram'))
        .optional(),
      medium: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(MEDIUM_COMBINED_REGEX, t('participantForm.validation.medium'))
        .optional(),
      discord: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(DISCORD_REG_EXP, t('participantForm.validation.discord'))
        .optional(),
      twitter: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(
          TWITTER_COMBINED_REGEX,
          t('participantForm.validation.twitter')
        )
        .optional(),
      near_social: yup
        .string()
        .url(t('participantForm.validation.invalidUrl'))
        .matches(
          NEAR_SOCIAL_REG_EXP,
          t('participantForm.validation.near_social')
        )
        .optional(),
    }),
  });

export const getInstitutionalSubValidation =
  (): yup.SchemaOf<IErrorInstitutionalModel> =>
    yup.object({
      name: yup
        .string()
        .required(t('institutionalSubmission.validation.requiredField')),
      logo: yup
        .string()
        .required(t('institutionalSubmission.validation.logoIsRequired')),
      site: yup
        .string()
        .url(t('institutionalSubmission.validation.invalidUrl'))
        .required(t('participantForm.validation.requiredField')),
      wallet: yup.string().optional(),
    });
