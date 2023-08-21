import { EventTypes } from '@pitchtalk/contract-api-js/dist/interfaces/events';

import { Loader } from 'shared/components/loader/Loader';
import { useEventData } from 'shared/hooks/useEventData';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';

import { EventEcosystem } from './components/EventEcosystem';
import { EventHeader } from './components/EventHeader';
import { EventMainInfo } from './components/EventMainInfo';
import { EventPartners } from './components/EventPartners';
import { EventRating } from './components/EventRating';
import { EventReferee } from './components/EventReferee';
import { EventSchedule } from './components/EventSchedule';
import { EventVideoPlayer } from './components/EventVideoPlayer';
import { HackathonPrizes } from './components/HackathonPrizes';
import { HackathonTasks } from './components/HackathonTasks';
import { useStyles } from './styles';
import { useEventAttention } from './useEventAttention';

const EventPage: React.FC = () => {
  const classes = useStyles();
  const { event, isLoading } = useEventData();

  useScrollToTop();
  useEventAttention(event);

  if (isLoading && !event) return <Loader />;
  if (!event) return null;

  const isHackathon = event?.event_type === EventTypes.HACKATHON;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <EventHeader banner={event?.banner} />
        <EventMainInfo event={event} />
        <div className={classes.eventInfoBlocks}>
          {isHackathon && (
            <>
              <HackathonPrizes />
              <HackathonTasks />
            </>
          )}
          <EventVideoPlayer event={event} />
          <EventEcosystem isHackathon={isHackathon} />
          <EventSchedule />
          <EventRating event={event} />
          <EventReferee />
          <EventPartners />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
