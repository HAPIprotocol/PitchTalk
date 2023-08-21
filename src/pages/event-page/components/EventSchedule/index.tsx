import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import format from 'date-fns/format';
import { t } from 'i18next';
import groupBy from 'lodash/groupBy';
import { memo, useEffect, useState } from 'react';

import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { ReactComponent as LiveIcon } from 'assets/images/icons/live-event-icon.svg';
import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import { ReactComponent as TimeIcon } from 'assets/images/icons/time-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { useNavigate, useParams } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { PARAMS, ONE_MINUTE_IN_MS, EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  isEventVoteEnded as checkIsEventVoteEnded,
  isEventStarted as checkIsEventStarted,
  formatCheckpointDate,
  getEventScheduleSlice,
  SCHEDULE_RANGE,
} from 'shared/utils/eventsUtils';
import { selectEventById, selectEventSchedule } from 'store/selectors/events';
import {
  selectOffChainProjects,
  selectProjects,
} from 'store/selectors/projects';
import { IEventScheduleCheckpointData } from 'store/types/events';

import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

export const EventSchedule: React.FC = memo(() => {
  const { eventId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const event = useAppSelector((_) => selectEventById(_, Number(eventId)));
  const scheduleRaw = useAppSelector((_) =>
    selectEventSchedule(_, Number(eventId))
  );
  const offChainProjects = useAppSelector(selectOffChainProjects);
  const onChainProjects = useAppSelector(selectProjects);

  const isEventVoteEnded = checkIsEventVoteEnded(event);
  const isEventStarted = checkIsEventStarted(event);

  const [eventScheduleSlice, setEventScheduleSlice] = useState<
    IEventScheduleCheckpointData[]
  >([]);

  useEffect(() => {
    const id = setInterval(() => {
      setEventScheduleSlice(
        getEventScheduleSlice(scheduleRaw, !isEventStarted || isEventVoteEnded)
      );
    }, ONE_MINUTE_IN_MS);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    setEventScheduleSlice(
      getEventScheduleSlice(scheduleRaw, !isEventStarted || isEventVoteEnded)
    );
  }, [scheduleRaw, isEventStarted, isEventVoteEnded]);

  const schedule = groupBy(eventScheduleSlice, ({ start_date }) =>
    format(start_date, 'MMM d')
  );

  if (!scheduleRaw?.length) return null;

  const redirectToProject = (projectId: string | null) => () => {
    if (!projectId) return;
    navigate(`${APP_ROUTES.PROJECTS}/${projectId}`);
  };

  return (
    <div className={classes.eventScheduleSectionWrapper}>
      <SectionTitle title={t('events.eventSection.schedule')} />
      <div className={classes.scheduleCheckpoints}>
        {Object.entries(schedule).map(([day, checkpoints], i) => (
          <div className={classes.scheduleCheckpointsList} key={day + i}>
            <div className={classes.scheduleCheckpointsDaysWrapper}>
              <CalendarIcon className={classes.scheduleCheckpointsDaysIcon} />
              <span>{day}</span>
            </div>
            {checkpoints.map((checkpoint, i) => {
              const { project_id, project_type } = checkpoint;
              const project =
                project_type === EProjectType.OnChain
                  ? onChainProjects.find(
                      (p) => p.project_id.toString() === project_id
                    )
                  : offChainProjects.find((p) => p.id === project_id);

              const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;
              const now = Date.now();
              const isCheckpointEnded =
                now > checkpoint.start_date + checkpoint.duration;
              const isCheckpointNow =
                now > checkpoint.start_date &&
                now < checkpoint.start_date + checkpoint.duration;

              return (
                <div
                  className={
                    classes.scheduleCheckpoint +
                    (isCheckpointEnded ? ' ended' : '') +
                    (isCheckpointNow ? ' now' : '') +
                    (!project_id ? ' noProject' : '')
                  }
                  key={checkpoint.start_date.toString() + i}
                  onClick={redirectToProject(project_id)}
                >
                  {isCheckpointNow && (
                    <LiveIcon className={classes.scheduleCheckpointLiveIcon} />
                  )}
                  {logo && (
                    <div
                      className={classes.scheduleCheckpointLogo}
                      style={{ backgroundImage: `url(${logo})` }}
                    />
                  )}
                  <div className={classes.scheduleCheckpointContent}>
                    <h4 className={classes.scheduleCheckpointTitle}>
                      {checkpoint.title}
                    </h4>
                    <p className={classes.scheduleCheckpointDescription}>
                      {checkpoint.description}
                    </p>
                    <p className={classes.scheduleCheckpointTime}>
                      <TimeIcon />
                      <span>
                        {formatCheckpointDate(
                          checkpoint.start_date,
                          checkpoint.duration
                        )}
                      </span>
                    </p>
                  </div>
                  {checkpoint.video_url && (
                    <a
                      className={classes.watchBtn}
                      href={checkpoint?.video_url || ''}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Translate value="events.watch" />
                      <PlayIcon className={classes.watchBtnIcon} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {scheduleRaw.length > SCHEDULE_RANGE && (
          <Button
            extraClass={classes.seeAllBtn}
            label="events.seeAll"
            handleClick={() =>
              navigate(
                APP_ROUTES.EVENTS_SCHEDULE_BY_ID.replace(
                  PARAMS.EVENT_ID,
                  event?.event_id?.toString() || EMPTY_STRING
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
});
