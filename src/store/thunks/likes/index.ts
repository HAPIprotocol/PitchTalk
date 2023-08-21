import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';

import * as likesAPI from 'services/api/likesAPI';
import { updateProjectLikes } from 'store/slices/likes';
import { AppDispatch } from 'store/store';

import { getEventProjectSubmissionById } from '../events';

export const likeProject =
  (
    projectId: string,
    projectType: EProjectType,
    isLiked: boolean,
    submissionId?: string,
    eventId?: number
  ) =>
  (dispatch: AppDispatch) => {
    return likesAPI
      .fetchLikeProject(projectId, projectType, isLiked)
      .then(() => {
        dispatch(getProjectLikes(projectId, projectType));
        if (submissionId && eventId) {
          dispatch(getEventProjectSubmissionById({ eventId, submissionId }));
        }
      });
  };

export const getProjectLikes =
  (projectId: string, projectType: EProjectType) => (dispatch: AppDispatch) =>
    (projectType === EProjectType.OffChain
      ? likesAPI
          .fetchOffChainProjectLikes(projectId)
          .then((likes) => dispatch(updateProjectLikes({ projectId, likes })))
      : likesAPI
          .fetchOnChainProjectLikes(projectId)
          .then((likes) => dispatch(updateProjectLikes({ projectId, likes })))
    ).catch(console.error);
