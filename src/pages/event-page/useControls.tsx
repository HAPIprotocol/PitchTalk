import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { t } from 'i18next';
import isUndefined from 'lodash/isUndefined';
import { useState } from 'react';

import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import {
  selectEventProjectsParticipants,
  selectEventProjectsSubmissions,
  selectEventRefereeParticipants,
  selectEventRefereeSubmissions,
} from 'store/selectors/events';
import { selectFundAccount } from 'store/slices/funds';
import { selectSubFundById } from 'store/slices/submission';
import {
  selectAccountId,
  selectOffChainUserData,
  selectOffChainUserProject,
  selectUserProjectId,
} from 'store/slices/user';
import {
  sendEventSubmissionAsReferee,
  sendEventSubmissionAsProject,
} from 'store/thunks/events';

export const useControls = (eventId: number) => {
  const { openModal: requestSignIn } = useWalletSelector();
  const { showModal } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const projects = useAppSelector((_) =>
    selectEventProjectsParticipants(_, eventId)
  );
  const judges = useAppSelector((_) =>
    selectEventRefereeParticipants(_, eventId)
  );
  const projectsSubmissions = useAppSelector((_) =>
    selectEventProjectsSubmissions(_, eventId)
  );
  const refereeSubmissions = useAppSelector((_) =>
    selectEventRefereeSubmissions(_, eventId)
  );
  const accountId = useAppSelector(selectAccountId);
  const onChainUserProjectId = useAppSelector(selectUserProjectId);
  const offChainUser = useAppSelector(selectOffChainUserData);
  const offChainUserProject = useAppSelector(selectOffChainUserProject);
  const userFund = useAppSelector(selectFundAccount);
  const userSubFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );
  const dispatch = useAppDispatch();

  const isUserParticipantProject =
    (onChainUserProjectId &&
      Object.keys(projects).includes(onChainUserProjectId.toString())) ||
    (offChainUserProject?.id &&
      Object.keys(projects).includes(offChainUserProject?.id.toString()));
  const isUserParticipantReferee =
    userFund && Object.keys(judges).includes(userFund.account_id);

  const isUserHaveProjectSubmission = (projectId: string | null) =>
    projectId && projectsSubmissions.get(projectId);

  const isUserHaveRefereeSubmission =
    userFund && refereeSubmissions.get(accountId);

  const getUserProjectMeta = () => {
    let projectId: string | null = null;
    let projectType = null;
    if (offChainUser && offChainUserProject) {
      projectId = offChainUserProject.id.toString();
      projectType = EProjectType.OffChain;
    } else if (accountId && onChainUserProjectId) {
      projectId = onChainUserProjectId.toString();
      projectType = EProjectType.OnChain;
    } else {
      projectId = null;
      projectType = EProjectType.OnChain;
    }
    return { projectId, projectType };
  };

  const participateAsProject = () => {
    if (
      isUndefined(onChainUserProjectId) &&
      (!offChainUserProject || !offChainUser)
    ) {
      return navigate(APP_ROUTES.PARTICIPANT);
    }
    const { projectId, projectType } = getUserProjectMeta();
    if (isUserHaveProjectSubmission(projectId)) {
      showModal(EModals.INFO_MODAL, {
        text: t('projectCabinetPage.newProjectReviewing'),
      });
      return;
    }

    if (!projectId) {
      showModal(EModals.INFO_MODAL, {
        text: t('error.messageWithContact'),
      });
      return;
    }
    setIsLoading(true);

    // TODO: NON FREE EVENTS
    dispatch(sendEventSubmissionAsProject(eventId, projectId, projectType))
      .then(() =>
        showModal(EModals.INFO_MODAL, {
          text: t('projectCabinetPage.newProjectReviewing'),
        })
      )
      .catch(() =>
        showModal(EModals.INFO_MODAL, { text: t('error.messageWithContact') })
      )
      .finally(() => setIsLoading(false));
  };

  const participateAsReferee = () => {
    if (!accountId) return requestSignIn();
    if (userSubFund?.status === EActionStatus.New)
      return navigate(APP_ROUTES.FUND_CABINET);
    if (!userFund) return navigate(APP_ROUTES.INSTITUTIONAL_SUBMISSION);

    if (isUserHaveRefereeSubmission) {
      showModal(EModals.INFO_MODAL, {
        text: t('projectCabinetPage.newProjectReviewing'),
      });
      return;
    }
    setIsLoading(true);
    dispatch(sendEventSubmissionAsReferee(eventId, accountId))
      .then(() =>
        showModal(EModals.INFO_MODAL, {
          text: t('projectCabinetPage.newProjectReviewing'),
        })
      )
      .catch(() =>
        showModal(EModals.INFO_MODAL, { text: t('error.messageWithContact') })
      )
      .finally(() => setIsLoading(false));
  };

  return {
    participateAsProject,
    participateAsReferee,
    isUserParticipantProject,
    isUserParticipantReferee,
    isLoading,
  };
};
