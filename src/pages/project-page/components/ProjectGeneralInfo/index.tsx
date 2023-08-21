import {
  Document,
  Documents,
  Project,
  SocialLinks,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  EProjectType,
  IOffChainProject,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { memo } from 'react';

import { ReactComponent as WebIcon } from 'assets/images/web-icon-new.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useWalletSelector } from 'providers/WalletProvider';
import { Likes } from 'shared/components/Likes';
import { Logo } from 'shared/components/Logo';
import { EAuthModalType } from 'shared/components/modals/auth-modal/types';
import { EDimensions } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { DocTypesAttachments } from 'shared/utils/documentUtils';
import { selectProjectLikes } from 'store/selectors/likes';
import { selectUserOffChainId } from 'store/slices/user';
import { likeProject } from 'store/thunks/likes';

import { ProjectDocuments } from './components/ProjectDocuments/ProjectDocuments';
import { ProjectSocial } from './components/ProjectSocial/ProjectSocial';
import { ProjectTags } from './components/ProjectTags/ProjectTags';
import { useStyles } from './styles';

interface IProjectGeneralInfoProps {
  projectId: string | number;
  project: Project | IOffChainProject;
  projectType: EProjectType;
}

export const ProjectGeneralInfo: React.FC<IProjectGeneralInfoProps> = memo(
  ({ projectId, project, projectType }) => {
    const classes = useStyles();
    const dimension = useWindowDimensions();
    const { showModal } = useModalContext();
    const { openModal: signInWithOnChain } = useWalletSelector();
    const isLoggedIn = !!useAppSelector(selectUserOffChainId);
    const dispatch = useAppDispatch();
    const { isLiked, likesAmount } = useAppSelector((state) =>
      selectProjectLikes(state, projectId.toString())
    );

    const showLinks = !!Object.values(project?.social_links || {}).filter(
      Boolean
    ).length;

    const documents =
      projectType === EProjectType.OnChain
        ? project.documents
        : ((project?.documents as Document[]) ?? []).reduce(
            (acc, doc) => ({
              ...acc,
              [DocTypesAttachments[doc.doc_type]]: doc,
            }),
            {}
          );
    const showDocs = !!Object.values(documents || {}).filter(Boolean).length;

    const projectEventTags =
      projectType === EProjectType.OnChain ? (project as Project).events : [];

    const showTags = !!project.tags.length || !!projectEventTags.length;

    const isMobileView = dimension === EDimensions.SMALL;
    const openAuthModal = () =>
      showModal(EModals.AUTH_MODAL, {
        title: EAuthModalType.Like,
        signInWithOnChain,
      });

    const likes = (
      <Likes
        amount={likesAmount}
        isLiked={isLiked}
        onClick={() =>
          isLoggedIn
            ? dispatch(likeProject(projectId.toString(), projectType, isLiked))
            : openAuthModal()
        }
      />
    );

    const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.logoWrapper}>
            <Logo logo={logo} logoContainerStyle={classes.logoContainer} />
            {isMobileView ? likes : null}
          </div>
          <div className={classes.projectInfo}>
            <h2 className={classes.projectTitle}>{project.name}</h2>
            {project.description && (
              <p className={classes.projectDescription}>
                {project.description}
              </p>
            )}
            {showTags && (
              <ProjectTags tags={project.tags} events={projectEventTags} />
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noreferrer noopener"
                className={classes.projectUrl}
              >
                <WebIcon />
                <span>{project.project_url}</span>
              </a>
            )}
            {showLinks && (
              <ProjectSocial links={project.social_links as SocialLinks} />
            )}
            {showDocs && (
              <ProjectDocuments documents={documents as Documents} />
            )}
          </div>
          {!isMobileView ? likes : null}
        </div>
      </div>
    );
  }
);
