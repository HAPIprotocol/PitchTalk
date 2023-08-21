import {
  ESocialLinksKeys,
  ESocialUserLinksKeys,
} from '@pitchtalk/contract-api-js/dist/core';
import { ITeam } from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { FormikProps } from 'formik';
import { t } from 'i18next';

import {
  ISubmissionProject,
  ISubmissionSubProject,
} from 'pages/project-cabinet/interfaces';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { TextInput } from 'shared/components/inputs/TextInput';
import { EMPTY_STRING } from 'shared/constants';
import { classNames } from 'shared/styles/theme';
import { URL_TO_ICON_MAPPING } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';

interface ISocialLinksProps {
  id: string;
  isEdit: boolean;
  formik: FormikProps<ITeam>;
  project?: ISubmissionProject;
  userProject?: ISubmissionSubProject;
  isUpdated: boolean;
  isFailed: boolean;
}

const linksLabels = {
  [ESocialLinksKeys.TWITTER]: 'twitter',
  [ESocialLinksKeys.NEAR_SOCIAL]: 'near social',
  [ESocialUserLinksKeys.LINKEDIN]: 'linkedin',
};

export const SocialLinks: React.FC<ISocialLinksProps> = ({
  id,
  formik: { values, errors, setFieldValue },
  isEdit,
  project,
  userProject,
  isUpdated,
  isFailed,
}) => {
  const classes = useStyles();

  const isDiff = (link: keyof typeof linksLabels) =>
    project?.team?.[id]?.social_links?.[link] !==
    userProject?.team?.[id]?.social_links?.[link];

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  return (
    <div className={classes.content}>
      {[
        ESocialLinksKeys.TWITTER,
        ESocialLinksKeys.NEAR_SOCIAL,
        ESocialUserLinksKeys.LINKEDIN,
      ].map((l) => {
        const link = l as keyof typeof linksLabels;
        const Icon = URL_TO_ICON_MAPPING[link];

        return (
          <div className={classes.controlInput} key={link}>
            <label>
              <Icon />
              <span>{linksLabels[link]}</span>
            </label>
            <TextInput
              inputExtraClass={classes.input}
              containerExtraClass={classNames(
                classes.inputContainer,
                isDiff(link) && getInputLabelStyles('border')
              )}
              infoLabelExtraClass={classNames(
                isDiff(link) && getInputLabelStyles('color')
              )}
              value={values[id]?.social_links?.[link] || ''}
              onChange={(e) =>
                setFieldValue(
                  `['${id}'].social_links.${link}`,
                  e.target.value.trim()
                )
              }
              error={errors[id]?.social_links?.[link] ?? null}
              errorExtraClass={classes.positionAbsolute}
              readOnly={!isEdit}
              placeHolder={t('placeHolders.insertSocialLink')}
              infoLabel={isDiff(link) ? getInputInfoLabel() : EMPTY_STRING}
            />
          </div>
        );
      })}
    </div>
  );
};
