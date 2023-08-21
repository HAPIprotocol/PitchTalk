import { t } from 'i18next';

import { ReactComponent as ArrowLeftIcon } from 'assets/images/icons/arrow-left-icon.svg';
import { ProjectsList } from 'pages/event-page/components/EventRating/ProjectsList';
import { APP_ROUTES } from 'routes';
import { Link } from 'services/router';
import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { PARAMS } from 'shared/constants';
import { useEventData } from 'shared/hooks/useEventData';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';

import { useStyles } from './styles';

const EventRatingPage: React.FC = () => {
  const classes = useStyles();
  const { event, isLoading } = useEventData();

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
            'events.eventSection.rating'
          )}`}</h3>
        </div>
        <div className={classes.ratingList}>
          <ProjectsList event={event} isFullList />
        </div>
      </div>
    </div>
  );
};

export default EventRatingPage;
