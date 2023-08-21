import { IEvent } from '@pitchtalk/contract-api-js/dist/interfaces';
import { t } from 'i18next';

import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { EMPTY_STRING, PARAMS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { isEventStarted } from 'shared/utils/eventsUtils';
import { selectEventProjectsParticipants } from 'store/selectors/events';

import { ProjectsList } from './ProjectsList';
import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

interface IEventRatingProps {
  event: IEvent;
}

const maxParticipantsBlocks = 4;

export const EventRating: React.FC<IEventRatingProps> = ({ event }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const participantProjects = useAppSelector((_) =>
    selectEventProjectsParticipants(_, event.event_id)
  );
  const isProjects = !!Object.keys(participantProjects).length;

  if (!isProjects || !isEventStarted(event)) return null;

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.rating')} />
      <div className={classes.ratingList}>
        <ProjectsList
          event={event}
          maxParticipantsBlocks={maxParticipantsBlocks}
        />
      </div>
      {Object.keys(event.projects).length > maxParticipantsBlocks && (
        <Button
          extraClass={classes.seeAllBtn}
          label="events.seeAll"
          handleClick={() =>
            navigate(
              APP_ROUTES.EVENTS_RATING_BY_ID.replace(
                PARAMS.EVENT_ID,
                event?.event_id?.toString() || EMPTY_STRING
              )
            )
          }
        />
      )}
    </div>
  );
};
