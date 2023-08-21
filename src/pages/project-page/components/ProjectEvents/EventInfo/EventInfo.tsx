import { t } from 'i18next';
import { memo } from 'react';

import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import { EMPTY_STRING } from 'shared/constants';
import { IProjectParticipatedEvent } from 'store/types/projects';

import { useStyles } from './styles';

interface IEventInfoProps {
  projectId: string | number;
  event: IProjectParticipatedEvent;
}

export const EventInfo: React.FC<IEventInfoProps> = memo(
  ({ projectId, event }) => {
    const classes = useStyles();
    const banner = getCorrectIPFSLinks({
      banner: event?.eventBanner || EMPTY_STRING,
    }).banner;

    const projectsRating = Object.entries(event.projects).sort(
      ([, { total_votes: votes1 }], [, { total_votes: votes2 }]) =>
        votes2 - votes1
    );

    const placeInd = projectsRating.findIndex(
      ([id]) => id.toString() === projectId.toString()
    );
    const place = placeInd === -1 ? null : placeInd + 1;

    return (
      <NavLink
        to={APP_ROUTES.EVENTS + `/${event.eventId}`}
        className={classes.eventContainer}
      >
        <img className={classes.eventImg} src={banner} />
        <div className={classes.eventInfo}>
          <h4 className={classes.eventName}>{event.eventName}</h4>
          <p className={classes.eventPlace}>
            {event.isEventVoteEnded &&
              place &&
              `${t('events.hackathon.place', { place })}`}
          </p>
          <ArrowRightIcon className={classes.eventOpenIcon} />
        </div>
      </NavLink>
    );
  }
);
