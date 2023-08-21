import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  EProjectType,
  IOffChainProject,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { memo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { LikeCountLabel } from 'shared/components/LikesCountLabel/LikeCountLabel';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectIsGrantUser } from 'store/slices/funds';

import { useStyles } from './styles';

interface IProjectBannerProps {
  project: Project | IOffChainProject;
  projectType: EProjectType;
}

export const ProjectBanner: React.FC<IProjectBannerProps> = memo(
  ({ project, projectType }) => {
    const { like } = usePitchTalkServiceContext();
    const { isGrantUser, isGrantUserActive } =
      useAppSelector(selectIsGrantUser);

    const classes = useStyles(getCorrectIPFSLinks({ banner: project.banner }));

    return (
      <div className={classes.container}>
        <div className={classes.banner} />
        {projectType === EProjectType.OnChain && (
          <LikeCountLabel
            projectId={(project as Project).project_id}
            likes={(project as Project).likes}
            onClick={() =>
              isGrantUser &&
              like(
                (project as Project).project_id,
                !!isGrantUserActive,
                project.is_active
              )
            }
            showLikes={!!(project as Project)?.likes?.length || isGrantUser}
            extraClasses={{
              mainWrapper: classes.likesWrapper,
              likesCountWrapper: classes.countWrapper,
            }}
          />
        )}
      </div>
    );
  }
);
