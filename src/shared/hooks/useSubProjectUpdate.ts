import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { DependencyList, useEffect } from 'react';
import { toast } from 'react-toastify';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import i18n from 'services/translation';
import {
  errorToastOptions,
  successToastOptions,
} from 'shared/components/toast-link/ToastLink';
import { FIFTEEN_SECONDS } from 'shared/constants';
import {
  selectAccountId,
  selectOffChainUserSubProject,
  selectUserProject,
  setUserProject,
} from 'store/slices/user';
import { getUserProjects } from 'store/thunks/user';

import { useAppDispatch, useAppSelector } from './redux-hooks';

export const useSubProjectUpdate = (
  timeout = FIFTEEN_SECONDS,
  projectType = EProjectType.OnChain,
  updateDeps: DependencyList = []
) => {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector(selectAccountId);
  const { submissionService } = usePitchTalkServiceContext();
  const prevOnChainProject = useAppSelector(selectUserProject);
  const prevOffChainProject = useAppSelector(selectOffChainUserSubProject);

  const prevProject =
    projectType === EProjectType.OnChain
      ? prevOnChainProject
      : prevOffChainProject;

  useEffect(() => {
    const fetchOnChainSubProjectData = async () => {
      if (!accountId || !submissionService) return;

      const project = await submissionService.getProject(accountId);

      const isProjectFailed =
        prevProject &&
        (prevProject.status === EActionStatus.Updated ||
          prevProject.status === EActionStatus.New) &&
        project.status === EActionStatus.Failed;

      const isProjectSuccess =
        prevOnChainProject &&
        prevOnChainProject.status === EActionStatus.Updated &&
        project.status === EActionStatus.Active;

      if (isProjectFailed) {
        toast.error(
          `${i18n.t('projectCabinetPage.declinedChanges')}`,
          errorToastOptions
        );
      }
      if (isProjectSuccess) {
        toast.success(
          `${i18n.t('projectCabinetPage.approvedChanges')}`,
          successToastOptions
        );
      }

      project && dispatch(setUserProject(project));
    };

    const fetchOffChainSubProjectData = async () => dispatch(getUserProjects());

    const fetchData =
      projectType === EProjectType.OnChain
        ? fetchOnChainSubProjectData
        : fetchOffChainSubProjectData;

    fetchData();
    const intervalId = setInterval(fetchData, timeout);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    accountId,
    submissionService,
    dispatch,
    prevProject?.status,
    projectType,
    ...updateDeps,
  ]);
};
