import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectOnChainProjectById } from 'store/selectors/projects';
import {
  selectOffChainUserData,
  selectOffChainUserProject,
  selectOffChainUserSubProject,
  selectUserProject,
} from 'store/slices/user';

import { ISubmissionProject, ISubmissionSubProject } from './interfaces';
import {
  getProjectFromOffChainProject,
  getSubProjectFromOffChainProject,
} from './utils';

export const useProjects = (): {
  project?: ISubmissionProject;
  subProject?: ISubmissionSubProject;
} => {
  const offChainUserData = useAppSelector(selectOffChainUserData);

  const offChainSubProject = useAppSelector(selectOffChainUserSubProject);
  const offChainProject = useAppSelector(selectOffChainUserProject);
  const onChainSubProject = useAppSelector(selectUserProject);
  const onChainProject = useAppSelector((s) =>
    selectOnChainProjectById(s, onChainSubProject?.id ?? -1)
  );

  const project = offChainUserData
    ? getProjectFromOffChainProject(offChainProject)
    : onChainProject
    ? { ...onChainProject, type: EProjectType.OnChain }
    : undefined;

  const subProject = offChainUserData
    ? offChainSubProject
      ? getSubProjectFromOffChainProject(offChainSubProject)
      : undefined
    : onChainSubProject
    ? { ...onChainSubProject, type: EProjectType.OnChain }
    : undefined;

  return { project, subProject };
};
