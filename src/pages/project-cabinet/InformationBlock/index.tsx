import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import {
  Comment,
  EActionStatus,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { t } from 'i18next';

import projectFrame from 'assets/images/project-frame.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { Button } from 'shared/components/button/Button';
import { Logo } from 'shared/components/Logo';
import { Translate } from 'shared/components/translate/Translate';

import { BalancesBox } from './components/BalancesBox';
import { LogBox } from './components/LogBox';
import { TransfersBox } from './components/TransfersBox';
import { useStyles } from './styles';
import { useControls } from './useControls';
import { Title } from '../components/Title';
import { ISubmissionProject, ISubmissionSubProject } from '../interfaces';

type InformationBlockProps = {
  project?: ISubmissionProject;
  userProject: ISubmissionSubProject;
  logs: Comment[];
};

export const InformationBlock: React.FC<InformationBlockProps> = ({
  project,
  userProject,
  logs,
}) => {
  const isOnChainProject = userProject.type === EProjectType.OnChain;
  const classes = useStyles({
    isProjectActive: userProject.is_active,
    isOnChainProject,
  });
  const { activateProject, deactivateProject, resetProject } =
    useControls(userProject);

  const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;
  const isResetting = userProject.status === EActionStatus.Resetting;

  return (
    <div className={classes.container}>
      {isResetting && (
        <div className={classes.resetInfoContainer}>
          <p className={classes.resetInfo}>
            <Translate value={'projectCabinetPage.projectResettingInfo3'} />
          </p>
          <Button
            label={t('actions.reset')}
            handleClick={() => resetProject()}
          />
        </div>
      )}
      <header className={classes.infoHeader}>
        <div className={classes.projectLogoWrapper}>
          <Logo
            logo={logo || projectFrame}
            logoContainerStyle={classes.projectLogo}
          />
          <h3>{userProject.name}</h3>
        </div>
        {project && !isResetting && (
          <Button
            label={
              userProject.is_active
                ? 'projectCabinetPage.deactivateProject'
                : 'projectCabinetPage.activateProject'
            }
            handleClick={() =>
              userProject.is_active ? deactivateProject() : activateProject()
            }
            extraClass={classes.activationBtn}
          />
        )}
      </header>
      <div className={classes.blocksContainer}>
        {isOnChainProject && (
          <div className={classes.balancesBoxWrapper}>
            <Title
              label="projectCabinetPage.currentBalanceTitle"
              tooltipId="currentBalances"
            />
            <BalancesBox project={project as Project} />
          </div>
        )}
        <div className={classes.logBoxWrapper}>
          <Title label="projectCabinetPage.logBoxTitle" tooltipId="logBox" />
          <LogBox logs={logs} isOnChainProject={isOnChainProject} />
        </div>
      </div>
      {isOnChainProject && (
        <div className={classes.transfersBoxWrapper}>
          <Title
            label="projectCabinetPage.listOfTransfersTitle"
            tooltipId="listOfTransfers"
          />
          <TransfersBox />
        </div>
      )}
    </div>
  );
};
