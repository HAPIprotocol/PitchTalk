import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { useEffect } from 'react';
import slug from 'slug';

import { Loader } from 'shared/components/loader/Loader';
import { isOffChainProject } from 'shared/utils/projectUtils';

import { ProjectBanner } from './components/ProjectBanner';
import { ProjectEvents } from './components/ProjectEvents';
import { ProjectFinancialInfo } from './components/ProjectFinancialInfo';
import { ProjectGeneralInfo } from './components/ProjectGeneralInfo';
import { ProjectPitches } from './components/ProjectPitches';
import { ProjectTeam } from './components/ProjectTeam';
import { useStyles } from './styles';
import { useProject } from './useProject';

const ProjectPage: React.FC = () => {
  const classes = useStyles();
  const { project, projectSubmissions } = useProject();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!project) return;

    let correctSlug = '';
    if (isOffChainProject(project)) correctSlug = (project as any).slug
    else correctSlug = slug(project.name, {lower: false, replacement: '_'})

    window.history.replaceState(null, '', `/projects/${correctSlug}`)
  }, [project])

  if (!project) return <Loader />;

  const isOnChainProject = !isOffChainProject(project);
  const projectType = isOnChainProject
    ? EProjectType.OnChain
    : EProjectType.OffChain;
  const projectId = isOnChainProject ? project.project_id : project.id;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <ProjectBanner project={project} projectType={projectType} />
          <ProjectGeneralInfo
            projectId={projectId}
            project={project}
            projectType={projectType}
          />
          {isOnChainProject && (
            <ProjectFinancialInfo
              projectId={Number(projectId)}
              project={project}
            />
          )}
          <ProjectTeam
            team={
              isOnChainProject
                ? project?.team || {}
                : project?.team.reduce(
                    (acc, teamMember) => ({
                      ...acc,
                      [teamMember.email]: teamMember,
                    }),
                    {}
                  )
            }
          />
          <ProjectPitches project={project} projectType={projectType} />
          <ProjectEvents
            projectId={projectId}
            projectSubmissions={projectSubmissions || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
