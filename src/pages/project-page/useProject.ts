import { IOffChainProject, Project } from '@pitchtalk/contract-api-js';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces/project';
import { useEffect, useState } from 'react';

import { APP_ROUTES } from 'routes';
import { fetchProjectIdBySlug } from 'services/api/projectsAPI';
import { useNavigate, useParams } from 'services/router';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import {
  selectIsProjectsLoading,
  selectProjectByIdOrSlug,
  selectProjectSubmissions,
} from 'store/selectors/projects';
import { getProjectLikes } from 'store/thunks/likes';
import {
  getOffChainProjectById,
  getProjectEventSubmissions,
} from 'store/thunks/projects';

export const useProject = () => {
  const { projectId: projectIdOrSlug } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsProjectsLoading);

  const { project, projectType } = useAppSelector((state) =>
    selectProjectByIdOrSlug(state, projectIdOrSlug || '')
  );

  const projectId: string = (project as IOffChainProject)?.id 
    || (project as Project)?.project_id.toString() || '';
  const projectSubmissions = useAppSelector((state) =>
    selectProjectSubmissions(state, projectId || '')
  );

  useEffect(() => {
    if (!isLoading && !project) navigate(APP_ROUTES.HOME);
  }, [isLoading, project]);

  useEffect(() => {
    if (!projectType) return;
    if (projectType === EProjectType.OffChain) {
      dispatch(getOffChainProjectById(projectId || ''));
    }

    dispatch(getProjectEventSubmissions((projectId || '')?.toString()));
    dispatch(getProjectLikes((projectId || '')?.toString(), projectType));
  }, [projectType]);

  return { project, projectSubmissions };
};
