import { ESocialLinksKeys } from '@pitchtalk/contract-api-js/dist/core';
import { FormikProps } from 'formik';
import { t } from 'i18next';

import DISCORD from 'assets/images/social-icons/discord-icon.svg';
import MEDIUM from 'assets/images/social-icons/medium-icon.svg';
import NEAR_SOCIAL from 'assets/images/social-icons/near_social-icon.svg';
import TELEGRAM from 'assets/images/social-icons/telegram-icon.svg';
import TWITTER from 'assets/images/social-icons/twitter-icon.svg';
import { useStyles } from 'pages/participant-form/styles';
import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';

import { detectSocialValue } from './utils';
import {
  IParticipantFormModel,
  SocialPlaceholdersName,
} from '../../interfaces';
const SOCIAL_INPUTS = [
  {
    label: 'telegram',
    placeholder: t('participantForm.insertLink', {
      placeholder: SocialPlaceholdersName.TELEGRAM,
    }),
    src: TELEGRAM,
    key: ESocialLinksKeys.TELEGRAM,
    name: 'social_media.telegram',
  },
  {
    label: 'medium',
    placeholder: t('participantForm.insertLink', {
      placeholder: SocialPlaceholdersName.MEDIUM,
    }),
    src: MEDIUM,
    key: ESocialLinksKeys.MEDIUM,
    name: 'social_media.medium',
  },
  {
    label: 'discord',
    placeholder: t('participantForm.insertLink', {
      placeholder: SocialPlaceholdersName.DISCORD,
    }),
    src: DISCORD,
    key: ESocialLinksKeys.DISCORD,
    name: 'social_media.discord',
  },
  {
    label: 'twitter',
    placeholder: t('participantForm.insertLink', {
      placeholder: SocialPlaceholdersName.TWITTER,
    }),
    src: TWITTER,
    key: ESocialLinksKeys.TWITTER,
    name: 'social_media.twitter',
  },
  {
    label: 'near social',
    placeholder: t('participantForm.insertLink', {
      placeholder: SocialPlaceholdersName.NEAR_SOCIAL,
    }),
    src: NEAR_SOCIAL,
    key: ESocialLinksKeys.NEAR_SOCIAL,
    name: 'social_media.near_social',
  },
];

interface ISocialModel {
  formik: FormikProps<IParticipantFormModel>;
}

export const Social: React.FC<ISocialModel> = ({
  formik: { values, handleChange, errors, isSubmitting, handleBlur, touched },
}) => {
  const classes = useStyles();
  return (
    <>
      <span className={classes.socialTitle}>Social media</span>
      <div className={classes.socialWrapper}>
        {SOCIAL_INPUTS.map((item) => {
          const key = item.key;
          const hasErrors =
            errors?.social_media?.[key] &&
            (isSubmitting || touched?.social_media?.[key]);
          return (
            <div key={item.key} className={classes.socialBlock}>
              <div className={classes.socialLabelWrapper}>
                <img src={item.src} alt={t('participantForm.socialIcon')} />
                <span className={classes.formInputLabel}>{item.label}</span>
              </div>
              <input
                className={`
                  ${classes.socialInput} ${classes.formInput} 
                  ${(hasErrors && classes.errorInput) || ''}
                `}
                placeholder={item.placeholder}
                value={detectSocialValue(item.label, values)}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name={item.name}
              />
              {hasErrors && (
                <ErrorHandler error={errors?.social_media?.[key] || ''} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
