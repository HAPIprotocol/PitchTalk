import { IEvent } from '@pitchtalk/contract-api-js/dist/interfaces';
import format from 'date-fns/format';

import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { Logo } from 'shared/components/Logo';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { Tags } from 'shared/components/tags/Tags';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';

import { Description } from './Description';
import { useStyles } from './styles';
import { ParticipateButtons } from '../ParticipateButtons';

interface IEventHeaderProps {
  event: IEvent;
}

export const EventMainInfo: React.FC<IEventHeaderProps> = ({ event }) => {
  const classes = useStyles();

  const logo = getCorrectIPFSLinks({ logo: event?.logo }).logo;

  return (
    <div className={classes.mainInfoSectionWrapper}>
      <div className={classes.eventTitleWrapper}>
        <Logo logo={logo} logoContainerStyle={classes.eventLogo} />
        <div className={classes.eventTitleInfo}>
          <p className={classes.eventName}>{event.name}</p>
          <div className={classes.eventDates}>
            <CalendarIcon className={classes.eventDatesIcon} />
            {format(event.start_date, 'LLL')} {format(event.start_date, 'd')}-
            {format(event.end_date, 'd')}, {format(event.start_date, 'yyyy')}
          </div>
        </div>
        <ParticipateButtons />
      </div>
      <Description />
      <div className={classes.eventSocials}>
        {Object.entries(normalizeIcons(event.social_links)).map(
          (link: [string, string], ind) => (
            <p
              className={classes.socialLinkContainer}
              key={link[0] + ind}
              style={{ pointerEvents: !link[1] ? 'none' : 'auto' }}
            >
              <SocialLink link={link} styles={classes.socialLink} />
            </p>
          )
        )}
      </div>
      {event.web_url && (
        <a
          className={classes.eventWebUrl}
          href={event.web_url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>{event.web_url}</span>
          <ArrowRightIcon className={classes.eventWebUrlIcon} />
        </a>
      )}
      <Tags tags={event.tags} eventsTags={[event.event_id]} />
    </div>
  );
};
