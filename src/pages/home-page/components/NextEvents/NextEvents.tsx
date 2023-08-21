import format from 'date-fns/format';
import { t } from 'i18next';
import { sortBy } from 'lodash';
import { RefObject, memo } from 'react';

import { ReactComponent as ArrowLeftIcon } from 'assets/images/icons/arrow-left-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { selectEventsSlider } from 'store/selectors/events';

import { useStyles } from './styles';
import { SwiperRef, useSwiper } from './useSwiper';

export const NextEvents: React.FC = memo(() => {
  const classes = useStyles();
  const dimension = useWindowDimensions();
  const { nextEvents, events } = useAppSelector(selectEventsSlider);

  const isNext = !!nextEvents.length;

  const eventsToShow = isNext ? nextEvents : events;
  const eventsByDate = sortBy(eventsToShow, 'start_date');

  const eventsToRender = eventsByDate;

  const { swiperRef, setSwiperRef } = useSwiper();

  return (
    <div className={classes.nextEventsContainer}>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>{`/ ${t(
          `mainPage.${isNext ? 'nextEvents' : 'recentEvents'}`
        )}`}</h3>
        <div className={classes.titleSplitter} />
      </div>
      <>
        {eventsToRender.length ? (
          <div className={classes.nextEventsListContainer}>
            <swiper-container
              init={false}
              ref={setSwiperRef as unknown as RefObject<SwiperRef>}
            >
              {eventsToRender.map((event) => {
                const img = getCorrectIPFSLinks({ img: event.banner }).img;

                return (
                  <swiper-slide key={event.id}>
                    <NavLink
                      to={APP_ROUTES.EVENTS + '/' + event.on_chain_id}
                      style={{ color: '#FFFFFF' }}
                    >
                      <div
                        className={classes.nextEventImg}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <div className={classes.nextEventInfo}>
                        <h4 className={classes.nextEventInfoTitle}>
                          {event.name}
                        </h4>
                        <p className={classes.nextEventInfoDescription}>
                          {event.short_description}
                        </p>
                        <p className={classes.nextEventStart}>
                          {format(new Date(event.start_date).valueOf(), 'PP p')}
                        </p>
                      </div>
                    </NavLink>
                  </swiper-slide>
                );
              })}
            </swiper-container>
            {(dimension === EDimensions.DESKTOP ||
              dimension === EDimensions.LAPTOP) && (
              <>
                <button
                  className={classes.prevBtn}
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                >
                  <ArrowLeftIcon width={16} height={16} viewBox="0 0 16 16" />
                </button>
                <button
                  className={classes.nextBtn}
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                >
                  <ArrowLeftIcon width={16} height={16} viewBox="0 0 16 16" />
                </button>
              </>
            )}
          </div>
        ) : (
          <span className={classes.noEvents}>
            <Translate value="events.noEventsDefault" />
          </span>
        )}
      </>
    </div>
  );
});
