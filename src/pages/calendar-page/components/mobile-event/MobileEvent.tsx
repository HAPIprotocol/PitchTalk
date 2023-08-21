import { Pitch, Project } from '@pitchtalk/contract-api-js';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LiveIcon } from 'assets/images/icons/live-event-icon.svg';
import { APP_ROUTES } from 'routes';
import { PitchStatusLabel } from 'shared/components/pitch-status-label/PitchStatusLabel';

import { useStyles } from './styles';
interface IMobileEventProps {
  project: Project;
  pitch: Pitch;
}

export const MobileEvent: React.FC<IMobileEventProps> = ({
  project,
  pitch,
}) => {
  const navigate = useNavigate();
  const isPitchFinished = pitch.starts_on + pitch.duration <= Date.now();
  const isPitchStarted = pitch.starts_on <= Date.now();
  const classes = useStyles({ isPitchFinished, isPitchStarted });

  const redirectToProjectPage = () =>
    navigate(`${APP_ROUTES.PROJECTS}/${project.project_id}`, {
      state: pitch.stage,
    });

  return (
    <>
      <div
        onClick={redirectToProjectPage}
        key={project.project_id + pitch.starts_on}
        className={classes.container}
      >
        <div className={classes.content}>
          <div className={classes.head}>
            <div className={classes.projectName}>{project.name}</div>
            <PitchStatusLabel stage={pitch.stage} />
          </div>
          <div className={classes.info}>
            <div className={classes.pitchName}>{pitch.name}</div>
            <label className={classes.time}>
              {format(pitch.starts_on, 'hh:mm a')}
              {isPitchStarted && !isPitchFinished && <LiveIcon />}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
