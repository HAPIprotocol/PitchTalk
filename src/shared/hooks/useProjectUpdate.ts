import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { useEffect } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { FIFTEEN_SECONDS } from 'shared/constants';
import { isOffChainProjectType } from 'shared/utils/projectUtils';
import { updateOnChainProject } from 'store/slices/projects';
import { getUserProjects } from 'store/thunks/user';

import { useAppDispatch } from './redux-hooks';

export const useProjectUpdate = (
  projectId?: number | string,
  timeout = FIFTEEN_SECONDS,
  projectType = EProjectType.OnChain
) => {
  const dispatch = useAppDispatch();
  const { pitchTalkService } = usePitchTalkServiceContext();

  useEffect(() => {
    if (!pitchTalkService) return;

    const fetchOnChainProjectData = async () => {
      if (!projectId) return;

      const id = Number(projectId);
      const project = await pitchTalkService.getProjectById(id);
      const grants = await pitchTalkService.totalGrantsForProject(id);
      const vesting = await pitchTalkService.getVesting(id);
      if (project) dispatch(updateOnChainProject({ project, grants, vesting }));
    };

    const fetchOffChainProjectData = () => dispatch(getUserProjects());

    const fetchData = isOffChainProjectType(projectType)
      ? fetchOffChainProjectData
      : fetchOnChainProjectData;

    fetchData();
    const intervalId = setInterval(fetchData, timeout);

    return () => {
      clearInterval(intervalId);
    };
  }, [projectId, pitchTalkService, dispatch, timeout, projectType]);
};
