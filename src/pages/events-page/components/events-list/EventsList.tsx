import { useEffect, useRef, useState } from 'react';

import { SearchInput } from 'pages/projects-page/components/search-input/SearchInput';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Loader } from 'shared/components/loader/Loader';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { Translate } from 'shared/components/translate/Translate';
import { SEARCH_TRIGGER_LENGTH } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EEventsByTime, IToggleButtonConfig } from 'shared/interfaces';
import { getPaginationArray } from 'shared/utils/pitchUtils';
import { selectAllEventsLengthData, selectEventsListData } from 'store/selectors/events';
import { getEventsList } from 'store/thunks/events';

import { useStyles } from './styles';
import { EventCard } from '../events-card/EventsCard';

// const TRIGGER_POSITION = 3;

export const EventsList: React.FC = () => {
  const classes = useStyles();
  const [eventsView, setEventsView] = useState<EEventsByTime>(EEventsByTime.UPCOMING);
  const { pitchTalkService } = usePitchTalkServiceContext();
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [query, setQuery] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const eventsList = useAppSelector(selectEventsListData);
  const downloadedEventsListLength = useAppSelector(selectAllEventsLengthData);
  // const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('');

  const now = Date.now()
  const eventsByTime = eventsView === EEventsByTime.ALL_EVENTS ? eventsList : (
    eventsView === EEventsByTime.UPCOMING
      ? eventsList.filter((ev) => ev.vote_end_date > now)
        .sort((a, b) => a.start_date - b.start_date)
      : eventsList.filter((ev) => ev.vote_end_date <= now)
  )

  const eventsToRender = search.length < SEARCH_TRIGGER_LENGTH 
    ? eventsByTime 
    : eventsByTime.filter(({ name }) =>
        name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  // const observer = new IntersectionObserver(
  //   ([entry]) => {
  //     return entry.isIntersecting && downloadedEventsListLength !== eventsCount && setQuery((p) => --p);
  //   }
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (search.length < SEARCH_TRIGGER_LENGTH) return;
    setEventsView(EEventsByTime.ALL_EVENTS);
  }, [search])

  useEffect(() => {
    if (eventsView === EEventsByTime.ALL_EVENTS) return;
    setSearch('');
  }, [eventsView])

  // useEffect(() => {
  //   if (triggerRef?.current) {
  //     observer.observe(triggerRef.current);
  //   }
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [isLoading, eventsList.length]);

  useEffect(() => {
    if (!pitchTalkService) return;
    pitchTalkService
      .getEventsCount()
      .then((count) => count || 0)
      .then(setEventsCount);
  }, [pitchTalkService]);

  useEffect(() => {
    if (!pitchTalkService) return;
    const paginationArray = getPaginationArray(eventsCount);
    const { fromIndex, limit } = paginationArray.at(query) || {
      fromIndex: 0,
      limit: 10,
    };

    if (paginationArray.length < Math.abs(query)) return;

    if (eventsCount && downloadedEventsListLength !== eventsCount) {
      setIsLoading(true);
      dispatch(getEventsList(fromIndex, limit, pitchTalkService))
        .then(() => {
          // Try to get another active events
          // if ()
          if (paginationArray.length > Math.abs(query)) {
            setQuery((p) => --p);
          }
        })
        .catch(() => setQuery(-1))
        .finally(() => setIsLoading(false));
    }
  }, [
    pitchTalkService, eventsCount, query, dispatch, eventsList.length, 
    eventsView, downloadedEventsListLength
  ]);

  if (!eventsList.length && isLoading) return <Loader />;

  return (
    <div
      className={classes.eventsList + (!eventsList.length ? ' noEvents' : '')}
    >
      <div className={classes.panel}>
        <TogglePanel
          buttons={eventsToggleConfig}
          containerStyles={classes.eventsViewToggle}
          buttonStyles={classes.eventsToggleButton}
          handler={setEventsView}
          toggleValue={eventsView}
        />
        <div className={classes.searchWrapper}>
          <SearchInput value={search} changeValue={setSearch} inputStyles={{minWidth: '100%'}}/>
        </div>
      </div>
      
      {!eventsByTime?.length ? (
        <span className={classes.noEvents}>
          <Translate value="events.noEventsDefault" />
        </span>
      ) : (
        <>
          {eventsToRender.map((event, index, arr) => (
            <EventCard
              key={event.event_id}
              event={event}
              // triggerRef={
              //   arr.length - TRIGGER_POSITION <= index ? triggerRef : null
              // }
            />
          ))}
          {isLoading && eventsCount !== downloadedEventsListLength && <Loader />}
        </>
      )}
    </div>
  );
};


const eventsToggleConfig: IToggleButtonConfig<EEventsByTime>[] = [
  {
    label: 'events.upcoming',
    value: EEventsByTime.UPCOMING,
  },
  {
    label: 'events.past',
    value: EEventsByTime.PAST,
  },
  {
    label: 'events.all',
    value: EEventsByTime.ALL_EVENTS,
  },
];
