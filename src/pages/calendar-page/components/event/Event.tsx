import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LiveIcon } from 'assets/images/icons/live-event-icon.svg';
import { APP_ROUTES } from 'routes';
import { PitchStatusLabel } from 'shared/components/pitch-status-label/PitchStatusLabel';
import { PitchWithProjectData } from 'shared/interfaces';

import { useStyles } from './styles';

export const Event: React.FC<{
  event: PitchWithProjectData;
  isToday: boolean;
}> = ({ event, isToday }) => {
  const navigate = useNavigate();
  const isPitchFinished = event.starts_on + event.duration <= Date.now();
  const isPitchStarted = event.starts_on <= Date.now();
  const classes = useStyles({ isToday, isPitchFinished });

  const redirectToProjectPage = () =>
    navigate(
      `${APP_ROUTES.PROJECTS}/${event.project.project_id}?stage=${event.stage}`
    );

  return (
    <div className={classes.event} onClick={redirectToProjectPage}>
      <div className={classes.eventLeftBorder} />
      <div className={classes.eventInfo}>
        <abbr className={classes.projectName} title={event.project?.name}>
          {event.project?.name}
        </abbr>
        {isPitchStarted && !isPitchFinished && <LiveIcon />}
      </div>
      <div className={classes.eventInfo}>
        <abbr className={classes.eventName} title={event.name}>
          {event.name}
        </abbr>
      </div>
      <div className={classes.eventInfo}>
        <div className={classes.time}>{format(event.starts_on, 'p')}</div>
        <PitchStatusLabel stage={event.stage} />
      </div>
    </div>
  );
};
