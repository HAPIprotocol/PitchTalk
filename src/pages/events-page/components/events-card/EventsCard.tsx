import format from 'date-fns/format';
import isNull from 'lodash/isNull';
import { MutableRefObject, memo } from 'react';
import { areEqual } from 'react-window';

import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { Link } from 'services/router';
import { Logo } from 'shared/components/Logo';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getEventFee } from 'shared/utils/eventsUtils';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';
import { selectTokens } from 'store/slices/tokens';
import { IEventListItem } from 'store/types/events';

import { useStyles } from './styles';

export const EventCard: React.FC<{
  event: IEventListItem;
  triggerRef?: MutableRefObject<HTMLAnchorElement | null> | null;
}> = memo(({ event, triggerRef }) => {
  const { banner, logo } = getCorrectIPFSLinks({
    banner: event?.banner,
    logo: event?.logo,
  });
  const classes = useStyles({ banner });
  const tokens = useAppSelector(selectTokens);

  const eventFee = !isNull(event.fee)
    ? getEventFee(event.fee, tokens[event.fee.token_id])
    : null;

  const startDate = event && format(event.start_date, 'PP p');
  const endDate = event && format(event.end_date, 'PP p');

  return (
    <Link
      to={`${APP_ROUTES.EVENTS}/${event.event_id}`}
      className={classes.container}
      ref={triggerRef || null}
    >
      <div className={classes.eventTitleContainer}>
        <div className={classes.eventTitle}>
          <div className={classes.eventNameAndLogo}>
            <Logo logo={logo} logoContainerStyle={classes.eventLogo} />
            <abbr className={classes.eventName} title={event.name}>
              {event.name}
            </abbr>
          </div>
          <div className={classes.eventDescription}>{event.description}</div>
        </div>
      </div>
      <div className={classes.eventFooter}>
        <div className={classes.eventDate}>
          <CalendarIcon />
          {startDate} - <br /> {endDate}
        </div>
        <div className={classes.eventToken}>
          {eventFee ? (
            <>
              <span>{eventFee.amount}</span>
              <img src={eventFee.icon} loading="lazy" />
              <span>{eventFee.symbol}</span>
            </>
          ) : (
            <Translate value="events.free" />
          )}
        </div>
        <div className={classes.eventSocials}>
          <SocialLink
            link={['web_url', event.web_url || '']}
            styles={classes.socialLink + ' web-icon'}
          />
          {event?.social_links &&
            Object.entries(normalizeIcons(event.social_links)).map(
              (link: [string, string], ind) => (
                <SocialLink key={ind} link={link} styles={classes.socialLink} />
              )
            )}
        </div>
      </div>
    </Link>
  );
}, areEqual);
