import {
  ESocialLinksKeys,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  EActionStatus,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';

import { GeneralInfoBlockState } from 'pages/project-cabinet/GeneralInfoBlock/helpers';
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

type SocialInfoProps = {
  isEdit: boolean;
  formik: FormikProps<GeneralInfoBlockState>;
  project: ISubmissionProject | undefined;
  userProject: ISubmissionSubProject;
};

const linksLabels = {
  [ESocialLinksKeys.DISCORD]: 'discord',
  [ESocialLinksKeys.MEDIUM]: 'medium',
  [ESocialLinksKeys.TELEGRAM]: 'telegram',
  [ESocialLinksKeys.TWITTER]: 'twitter',
  [ESocialLinksKeys.NEAR_SOCIAL]: 'near social',
};

export const SocialInfo: React.FC<SocialInfoProps> = ({
  formik: {
    values: { social_links },
    errors: { social_links: social_links_errors },
    setFieldValue,
  },
  isEdit,
  project,
  userProject,
}) => {
  const classes = useStyles();
  const socialLinks = Object.values(ESocialLinksKeys);

  const isDiff = (link: ESocialLinksKeys) =>
    project?.social_links?.[link] !== userProject.social_links?.[link];

  const isUpdated =
    userProject.status === EActionStatus.Updated ||
    userProject.status === EActionStatus.New;
  const isFailed = userProject.status === EActionStatus.Failed;

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  return (
    <div className={classes.content}>
      {socialLinks.map((link) => {
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
              value={social_links[link]}
              onChange={(e) =>
                setFieldValue(`social_links.${link}`, e.target.value.trim())
              }
              error={social_links_errors?.[link] ?? null}
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
