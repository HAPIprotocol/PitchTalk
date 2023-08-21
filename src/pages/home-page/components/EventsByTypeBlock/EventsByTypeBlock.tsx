import { EventTypes } from '@pitchtalk/contract-api-js/dist/interfaces';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as HackatoneIcon } from 'assets/images/icons/event-hackatone.svg';
import { ReactComponent as LectureIcon } from 'assets/images/icons/event-lecture.svg';
import { ReactComponent as TournamentIcon } from 'assets/images/icons/event-tournament.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectEventsByType } from 'store/selectors/events';

import { useStyles } from './styles';

interface IEventsByTypeProps {
  type: EventTypes;
  onSetupEventBtnClick?: () => void;
}

const MAX_EVENTS_TO_SHOW = 3;

export const EventsByTypeBlock: React.FC<IEventsByTypeProps> = memo(
  ({ type, onSetupEventBtnClick = () => void {} }) => {
    const classes = useStyles();
    const events = useAppSelector((state) => selectEventsByType(state, type));
    const eventsToRender = events?.slice(0, MAX_EVENTS_TO_SHOW);

    const getIcon = () => {
      switch (type) {
        // PITCHES SESSION
        case EventTypes.LECTURE:
          return (
            <LectureIcon
              className={classNames(classes.metaIcon, classes.lectureIcon)}
            />
          );
        // DEMODAY
        case EventTypes.TOURNAMENT:
          return (
            <TournamentIcon
              className={classNames(classes.metaIcon, classes.tournamentIcon)}
            />
          );
        // HACKATHON
        case EventTypes.HACKATHON:
          return (
            <HackatoneIcon
              className={classNames(classes.metaIcon, classes.hackatoneIcon)}
            />
          );
      }
    };

    return (
      <div className={classes.eventsByTypeContainer}>
        <div className={classes.eventsByTypeMeta}>
          <div>
            {getIcon()}
            <h2 className={classes.metaTitle}>
              <Translate value={`mainPage.events.title.${type}`} />
            </h2>
            <p className={classes.metaDescription}>
              <Translate value={`mainPage.events.description.${type}`} />
            </p>
            <ol className={classes.metaList}>
              {[1, 2, 3].map((_, i) => (
                <li key={i}>
                  <Translate value={`mainPage.events.list.${type}.${i}`} />
                </li>
              ))}
            </ol>
            <Button
              extraClass={classes.metaBtn}
              label="mainPage.events.setupEvent"
              handleClick={onSetupEventBtnClick}
            />
          </div>
        </div>
        <div className={classes.eventsByTypeList}>
          {eventsToRender.length ? (
            eventsToRender.map((event) => {
              const img = getCorrectIPFSLinks({ img: event.banner }).img;

              return (
                <NavLink
                  key={event.id}
                  className={classes.eventItem}
                  to={APP_ROUTES.EVENTS + '/' + event.on_chain_id}
                >
                  <h3 className={classes.eventName}>{event.name}</h3>
                  <div className={classes.eventInfoWrapper}>
                    <div
                      className={classes.eventImg}
                      style={{ backgroundImage: `url(${img})` }}
                    />
                    <p className={classes.eventInfo}>
                      <span className={classes.eventInfoLabel}>
                        <Translate value="mainPage.events.participants" />
                      </span>
                      <span className={classes.eventInfoAmount}>
                        {event.participants_count}
                      </span>
                    </p>
                    <p className={classes.eventInfo}>
                      <span className={classes.eventInfoLabel}>
                        <Translate value="mainPage.events.funds" />
                      </span>
                      <span className={classes.eventInfoAmount}>
                        {event.referees_count}
                      </span>
                    </p>
                    <p className={classes.eventInfo}>
                      <span className={classes.eventInfoLabel}>
                        <Translate value="mainPage.events.prizePool" />
                      </span>
                      <span className={classes.eventInfoAmount}>
                        {event.prize_pool}
                      </span>
                    </p>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <span className={classes.noEvents}>
              <Translate value="events.noEventsDefault" />
            </span>
          )}
        </div>
      </div>
    );
  }
);
