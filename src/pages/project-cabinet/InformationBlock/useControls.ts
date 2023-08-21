/* eslint-disable no-console */
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { updateProjectSubmission } from 'store/thunks/user/project';

import {
  getProjectForUpdating,
  GeneralInfoBlockState,
} from '../GeneralInfoBlock/helpers';
import { ISubmissionSubProject } from '../interfaces';
import { handleSubInfoModal } from '../utils';

export const useControls = (project: ISubmissionSubProject) => {
  const dispatch = useAppDispatch();
  const { showModal } = useModalContext();
  const { subServiceActions } = usePitchTalkServiceContext();

  const isOnChainProject = project.type === EProjectType.OnChain;

  const activateProject = () => {
    if (isOnChainProject) {
      subServiceActions.activateProject();
    } else {
      dispatch(
        updateProjectSubmission({
          projectId: project.id.toString(),
          project: getProjectForUpdating(project as GeneralInfoBlockState),
        })
      ).then(handleSubInfoModal(showModal));
    }
  };

  const deactivateProject = () => {
    if (isOnChainProject) {
      subServiceActions.deactivateProject();
    } else {
      dispatch(
        updateProjectSubmission({
          projectId: project.id.toString(),
          project: getProjectForUpdating(project as GeneralInfoBlockState),
        })
      ).then(handleSubInfoModal(showModal));
    }
  };

  const resetProject = () => {
    if (isOnChainProject) {
      subServiceActions.resetProject();
    } else {
      () => void {};
    }
  };

  return { activateProject, deactivateProject, resetProject };
};
