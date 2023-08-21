import { useState } from 'react';
import { Trans } from 'react-i18next';

import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import i18n from 'services/translation';
import { investmentsToggleConfig } from 'shared/components/invest-summary/constants';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { ParticipatedProject } from 'shared/interfaces';
import { EInvestmentsView } from 'shared/interfaces';

import { useStyles } from './styles';
import { ProjectCard } from '../project-card/ProjectCard';

interface IParticipatedEvents {
  projects: ParticipatedProject[];
}

export const ParticipatedEvents: React.FC<IParticipatedEvents> = ({
  projects,
}) => {
  const classes = useStyles();
  const [viewToggle, setViewToggle] = useState<EInvestmentsView>(
    EInvestmentsView.BY_USER
  );
  if (!projects.length)
    return (
      <div className={classes.noEventsContainer}>
        <Trans i18nKey="events.noEventsJoined">
          <NavLink to={APP_ROUTES.PROJECTS}>Projects Page</NavLink>
        </Trans>
      </div>
    );

  return (
    <>
      <div className={classes.togglePanelWrapper}>
        <TogglePanel
          buttons={investmentsToggleConfig}
          buttonStyles={classes.investmentToggleButton}
          containerStyles={classes.investmentToggle}
          handler={setViewToggle}
          toggleValue={viewToggle}
        />
        <NavLink to={APP_ROUTES.PROJECTS + '?joined=true'}>{`${i18n.t(
          'links.viewAllPortfolio'
        )}`}</NavLink>
      </div>
      <div className={classes.container}>
        {projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.project_id}
            view={viewToggle}
          />
        ))}
      </div>
    </>
  );
};
