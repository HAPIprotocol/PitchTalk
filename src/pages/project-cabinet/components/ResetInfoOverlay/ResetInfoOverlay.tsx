import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import { ReactComponent as CloseIcon } from 'assets/images/icons/close-icon.svg';
import { ISubmissionSubProject } from 'pages/project-cabinet/interfaces';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

interface IRejectInfoOverlayProps {
  userProject?: ISubmissionSubProject | null;
  isSigning: boolean;
}

export const ResetInfoOverlay: React.FC<IRejectInfoOverlayProps> = ({
  userProject,
  isSigning,
}) => {
  const classes = useStyles();
  const { subServiceActions } = usePitchTalkServiceContext();

  const [showRejectInfo, setShowRejectInfo] = useState(
    userProject?.status === EActionStatus.Resetting
  );

  useEffect(() => {
    userProject?.status === EActionStatus.Resetting && setShowRejectInfo(true);
  }, [userProject?.status]);

  return showRejectInfo && !isSigning ? (
    <div className={classes.rejectBlurOverlay}>
      <CloseIcon
        className={classes.rejectInfoCloseIcon}
        onClick={() => setShowRejectInfo(false)}
      />
      <div className={classes.blurContent}>
        <p className={classes.rejectInfoText}>
          <Translate value="projectCabinetPage.projectResettingInfo1" />
        </p>
        <p className={classes.rejectInfoText}>
          <Translate value="projectCabinetPage.projectResettingInfo2" />
        </p>
        <Button
          label={t('actions.reset')}
          handleClick={() => subServiceActions.resetProject()}
        />
      </div>
    </div>
  ) : null;
};
