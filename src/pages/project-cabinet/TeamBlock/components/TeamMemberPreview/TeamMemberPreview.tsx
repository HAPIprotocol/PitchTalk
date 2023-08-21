import {
  ESocialLinksKeys,
  ESocialUserLinksKeys,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  ITeam,
  ITeamMember,
} from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import debounce from 'lodash/debounce';
import { useCallback, useEffect } from 'react';

import { ReactComponent as DeleteIcon } from 'assets/images/icons/close-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useLocation } from 'services/router';
import { EMPTY_STRING } from 'shared/constants';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { classNames } from 'shared/styles/theme';
import { URL_TO_ICON_MAPPING } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';

interface ITeamMemberPreviewProps {
  id: string;
  teamMember: ITeamMember;
  formik: FormikProps<ITeam>;
  onDelete?: () => void;
  isProcessing?: boolean;
  isDeclined?: boolean;
}

const defaultLinks = {
  [ESocialLinksKeys.NEAR_SOCIAL]: ESocialLinksKeys.NEAR_SOCIAL,
  [ESocialLinksKeys.TWITTER]: ESocialLinksKeys.TWITTER,
  [ESocialUserLinksKeys.LINKEDIN]: ESocialUserLinksKeys.LINKEDIN,
};

export const TeamMemberPreview: React.FC<ITeamMemberPreviewProps> = ({
  id,
  teamMember,
  formik: { setFieldError },
  onDelete,
  isProcessing = false,
  isDeclined = false,
}) => {
  const location = useLocation();
  const isProjectPage = location.pathname?.includes('events');
  const { showModal, closeModal } = useModalContext();
  const logo = getCorrectIPFSLinks({ logo: teamMember.logo }).logo;
  const classes = useStyles({ userImg: logo, isProjectPage });

  const socialLinks = Object.values(defaultLinks);

  const deleteUser = () => {
    showModal(EModals.INFO_MODAL, {
      submitAction: async () => {
        closeModal();
        onDelete?.();
      },
      text: t('projectCabinetPage.removeMember'),
      submitButtonText: t('controls.submit'),
    });
  };

  const checkIsValidAccount = useCallback(
    debounce(async (logo: string) => {
      const imgObj = new Image();
      imgObj.onload = () => setFieldError(`['${id}'].logo`, undefined);
      imgObj.onerror = () =>
        setFieldError(
          `['${id}'].logo`,
          t('participantForm.validation.uploadImageError')
        );
      imgObj.src = logo;
    }, 1000),
    []
  );

  useEffect(() => {
    checkIsValidAccount(logo);
  }, [logo]);

  return (
    <div
      className={
        classes.teamMemberContainer + (isProjectPage ? ' project-page' : '')
      }
    >
      <div className={classes.teamMemberContent}>
        <div
          className={classes.memberImg + (isProjectPage ? ' project-page' : '')}
        />
        <h5 className={classes.alias}>
          {teamMember.first_name + ' ' + teamMember.last_name}
        </h5>
        <p className={classes.position}>{teamMember.position}</p>
        <p className={classes.wallet}>{id}</p>
        {!!Object.keys(teamMember?.social_links || {}).length && (
          <div className={classes.teamMemberLinksContainer}>
            {socialLinks.map((l, i) => {
              const link = l as keyof typeof defaultLinks;
              const Icon = URL_TO_ICON_MAPPING[link];
              const linkUrl = teamMember.social_links[link];

              return (
                linkUrl && (
                  <a key={link + i} href={linkUrl} rel="noreferrer noopener">
                    <Icon />
                  </a>
                )
              );
            })}
          </div>
        )}
      </div>
      {isProcessing && (
        <label className={classNames(classes.infoLabel, classes.processing)}>
          {`${t('placeHolders.processing')}`}
        </label>
      )}
      {isDeclined && (
        <label className={classNames(classes.infoLabel, classes.declined)}>
          {`${t('placeHolders.declined')}`}
        </label>
      )}
      {onDelete && (
        <DeleteIcon onClick={deleteUser} className={classes.deleteIcon} />
      )}
    </div>
  );
};
