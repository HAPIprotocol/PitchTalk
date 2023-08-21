import { t } from 'i18next';
import { memo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { NavLink, useParams } from 'services/router';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  selectEventProjectsParticipants,
  selectEventProjectsSubmissions,
} from 'store/selectors/events';
import { selectProjectsMap } from 'store/selectors/projects';

import { useStyles } from './styles';
import { HackathonParticipant } from '../HackathonParticipant';
import { SectionTitle } from '../SectionTitle';

interface IEventEcosystemProps {
  isHackathon: boolean;
}

export const EventEcosystem: React.FC<IEventEcosystemProps> = memo(
  ({ isHackathon }) => {
    const { eventId } = useParams();
    const classes = useStyles();
    const projects = useAppSelector(selectProjectsMap);
    // TODO: Save weburl and repourl in event participants, need backend
    const participantProjects = useAppSelector((_) =>
      selectEventProjectsParticipants(_, Number(eventId))
    );
    const submissions = useAppSelector((_) =>
      selectEventProjectsSubmissions(_, Number(eventId))
    );
    const isProjects = !!Object.keys(participantProjects).length;

    if (!isProjects || !submissions.size) return null;

    return (
      <div className={classes.ecoSystemSectionWrapper}>
        <SectionTitle title={t('events.eventSection.participants')} />
        <div className={classes.ecoSystemParticipants}>
          {Object.entries(participantProjects).map(([id]) => {
            const project = projects.get(id);
            const projectSubmission = submissions.get(id);

            const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;

            return (
              project && (
                <NavLink
                  to={APP_ROUTES.PROJECTS + `/${id}`}
                  className={classes.participant}
                  key={id}
                >
                  <div
                    className={classes.participantImg}
                    style={{ backgroundImage: `url(${logo})` }}
                  />
                  <p className={classes.participantName}>{project.name}</p>
                  <p className={classes.participantDescription}>
                    {project.description}
                  </p>
                  {isHackathon && (
                    <HackathonParticipant
                      videoUrl={projectSubmission?.video_url}
                      repoUrl={projectSubmission?.repo_url}
                    />
                  )}
                </NavLink>
              )
            );
          })}
        </div>
      </div>
    );
  }
);
