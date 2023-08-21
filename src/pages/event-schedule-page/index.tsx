import format from 'date-fns/format';
import { t } from 'i18next';
import groupBy from 'lodash/groupBy';

import { ReactComponent as ArrowLeftIcon } from 'assets/images/icons/arrow-left-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { ReactComponent as LiveIcon } from 'assets/images/icons/live-event-icon.svg';
import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import { ReactComponent as TimeIcon } from 'assets/images/icons/time-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { Link } from 'services/router';
import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING, PARAMS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useEventData } from 'shared/hooks/useEventData';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';
import { formatCheckpointDate } from 'shared/utils/eventsUtils';
import { selectEventSchedule } from 'store/selectors/events';
import { selectProjectsMap } from 'store/selectors/projects';

import { useStyles } from './styles';

const EventSchedulePage: React.FC = () => {
  const classes = useStyles();
  const projects = useAppSelector(selectProjectsMap);
  const { event, isLoading, eventId } = useEventData();
  const scheduleRaw = useAppSelector((_) => selectEventSchedule(_, eventId));
  const schedule = groupBy(scheduleRaw, ({ start_date }) =>
    format(start_date, 'MMM d')
  );

  useScrollToTop();

  if (isLoading && !event) return <Loader />;
  if (!event) return null;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.backBtnContainer}>
          <Link
            className={classes.backBtn}
            to={APP_ROUTES.EVENTS_BY_ID.replace(
              PARAMS.EVENT_ID,
              event.event_id.toString()
            )}
          >
            <ArrowLeftIcon />
            <span>
              <Translate value="events.backToEvent" />
            </span>
          </Link>
        </div>
        <div className={classes.titleWrapper}>
          <h3 className={classes.title}>{event.name}</h3>
        </div>
        <div className={classes.titleWrapper}>
          <h3 className={classes.title}>{`${t(
            'events.eventSection.schedule'
          )}`}</h3>
        </div>

        <div className={classes.scheduleCheckpoints}>
          {Object.entries(schedule).map(([day, checkpoints], i) => (
            <div className={classes.scheduleCheckpointsList} key={day + i}>
              <div className={classes.scheduleCheckpointsDaysWrapper}>
                <CalendarIcon className={classes.scheduleCheckpointsDaysIcon} />
                <span>{day}</span>
              </div>
              {checkpoints.map((checkpoint, i) => {
                const { project_id } = checkpoint;
                const project = projects.get(project_id || EMPTY_STRING);

                const logo = getCorrectIPFSLinks({ logo: project?.logo }).logo;
                const now = Date.now();
                const isCheckpointEnded =
                  now > checkpoint.start_date + checkpoint.duration;
                const isCheckpointNow =
                  now > checkpoint.start_date &&
                  now < checkpoint.start_date + checkpoint.duration;

                return (
                  <Link
                    className={
                      classes.scheduleCheckpoint +
                      (isCheckpointEnded ? ' ended' : '') +
                      (isCheckpointNow ? ' now' : '') +
                      (!project_id ? ' noProject' : '')
                    }
                    key={checkpoint.start_date.toString() + i}
                    to={`${APP_ROUTES.PROJECTS}/${project_id}`}
                  >
                    {isCheckpointNow && (
                      <LiveIcon
                        className={classes.scheduleCheckpointLiveIcon}
                      />
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
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSchedulePage;
