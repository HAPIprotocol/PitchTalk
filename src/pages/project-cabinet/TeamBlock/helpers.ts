/* eslint-disable no-console */
import {
  ESocialLinksKeys,
  ESocialUserLinksKeys,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  ITeam,
  ITeamMember,
} from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { FormikErrors } from 'formik';
import { t } from 'i18next';
import { ValidationError } from 'yup';

import { ipfsService } from 'services/ipfs';
import {
  LINKEDIN_REG_EXP,
  NEAR_SOCIAL_REG_EXP,
  TWITTER_COMBINED_REGEX,
} from 'shared/constants/regex';
import YUP from 'shared/utils/yupUtils';

export const saveImgToIPFS = async (
  img: File | null,
  id: string,
  firstName: string,
  userProjectName: string
) => {
  try {
    if (!img) return;
    const cid = await ipfsService.uploadFile([img], {
      name: `${userProjectName}-team-${firstName}-${id}`,
    });
    return cid;
  } catch (error) {
    console.error(error);
    return;
  }
};

const removeEmptyString = (value: string) => value || undefined;

export const newTeamMember: ITeamMember = {
  position: '',
  first_name: '',
  last_name: '',
  logo: '',
  social_links: {
    [ESocialUserLinksKeys.LINKEDIN]: '',
    [ESocialLinksKeys.TWITTER]: '',
    [ESocialLinksKeys.NEAR_SOCIAL]: '',
  },
};

const validationSchema = YUP.object({
  first_name: YUP.string().required(t('validation.requiredField')),
  last_name: YUP.string().required(t('validation.requiredField')),
  position: YUP.string().required(t('validation.requiredField')),
  logo: YUP.string().required(t('validation.requiredField')),
  social_links: YUP.object({
    [ESocialUserLinksKeys.LINKEDIN]: YUP.string()
      .transform(removeEmptyString)
      .url(t('participantForm.validation.invalidUrl'))
      .matches(LINKEDIN_REG_EXP, t('participantForm.validation.linkedin'))
      .optional(),
    [ESocialLinksKeys.TWITTER]: YUP.string()
      .transform(removeEmptyString)
      .url(t('participantForm.validation.invalidUrl'))
      .matches(TWITTER_COMBINED_REGEX, t('participantForm.validation.twitter'))
      .optional(),
    [ESocialLinksKeys.NEAR_SOCIAL]: YUP.string()
      .transform(removeEmptyString)
      .url(t('participantForm.validation.invalidUrl'))
      .matches(NEAR_SOCIAL_REG_EXP, t('participantForm.validation.near_social'))
      .optional(),
  }),
});

export const validateSchema = (values: ITeam) =>
  Object.entries(values).reduce<FormikErrors<ITeam>>((acc, [id, tm]) => {
    try {
      validationSchema.validateSync(tm, { abortEarly: false });
    } catch (errors: unknown) {
      (errors as ValidationError)?.inner?.forEach((validationError) => {
        if (validationError.path?.includes('social_links')) {
          acc[id] = {
            ...acc[id],
            social_links: {
              ...acc[id]?.social_links,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              [validationError.path!.split('.')[1]]: validationError.message,
            },
          };
        } else {
          acc[id] = {
            ...acc[id],
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [validationError.path!]: validationError.message,
          };
        }
      });
    }
    return acc;
  }, {});
