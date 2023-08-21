import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  EActionStatus,
  IProjectRes,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import isNull from 'lodash/isNull';
import { useEffect, useRef } from 'react';

import { useWalletSelector } from 'providers/WalletProvider';
import { Translate } from 'shared/components/translate/Translate';
import { FIFTEEN_SECONDS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useProjectUpdate } from 'shared/hooks/useProjectUpdate';
import { useSubProjectUpdate } from 'shared/hooks/useSubProjectUpdate';
import { EProjectSettingsState } from 'shared/interfaces';
import { isOffChainProjectType } from 'shared/utils/projectUtils';
import { selectIsUserDataLoading } from 'store/slices/user';

import { ResetInfoOverlay, ToolTips } from './components';
import { Loader } from './components/Loader';
import { ProjectCabinetState } from './constants';
import { FinancialInfoBlock } from './FinancialInfoBlock';
import { GeneralInfoBlock } from './GeneralInfoBlock';
import { InformationBlock } from './InformationBlock';
import { PitchesInfoBlock } from './PitchesInfoBlock';
import { useStyles } from './styles';
import { TeamBlock } from './TeamBlock';
import { useEventAttention } from './useEventAttention';
import { useProjects } from './useProjects';

const ProjectCabinet: React.FC = () => {
  const classes = useStyles();

  // TODO: Refactor all actions to thunks and remove isSigning
  const { isSigning } = useWalletSelector();
  const isLoading = useAppSelector(selectIsUserDataLoading);

  const { project, subProject } = useProjects();

  const statesRef = useRef<ProjectCabinetState>({
    generalState: () => ({}),
    pitchesState: () => ({}),
    finState: () => ({}),
    teamState: () => ({}),
  });

  // Projects auto refresh
  useProjectUpdate(project?.project_id, FIFTEEN_SECONDS, project?.type);
  useSubProjectUpdate(FIFTEEN_SECONDS, subProject?.type, [isSigning]);

  useEventAttention(project?.project_id);

  // Reset blocks to view state
  useEffect(() => {
    if (!isSigning && Object.values(statesRef.current).length)
      Object.values(statesRef.current).map((fn) =>
        fn(EProjectSettingsState.VIEW)
      );
  }, [isSigning]);

  const isNew =
    subProject?.status === EActionStatus.New ||
    (subProject &&
      isNull(subProject.id) &&
      subProject.status === EActionStatus.Active);

  return (
    <>
      {(isSigning || isLoading) && <Loader />}
      {isNew && (
        <div className={classes.blurOverlay}>
          <span className={classes.blurText}>
            <Translate value="projectCabinetPage.newProjectReviewing" />
          </span>
        </div>
      )}
      <ResetInfoOverlay userProject={subProject} isSigning={isSigning} />

      {subProject && (
        <div className={classes.container}>
          <InformationBlock
            project={project}
            userProject={subProject}
            logs={subProject.comments}
          />
          <GeneralInfoBlock
            project={project}
            userProject={subProject}
            cabinetState={statesRef}
          />

          {project && (
            <>
              <PitchesInfoBlock
                project={project}
                userProject={subProject}
                cabinetState={statesRef}
              />
              {!isOffChainProjectType(project.type) && (
                <FinancialInfoBlock
                  project={project as Project}
                  userProject={subProject as IProjectRes}
                  cabinetState={statesRef}
                />
              )}
              <TeamBlock
                project={project}
                userProject={subProject}
                cabinetState={statesRef}
              />
            </>
          )}

          <ToolTips />
        </div>
      )}
    </>
  );
};

export default ProjectCabinet;
