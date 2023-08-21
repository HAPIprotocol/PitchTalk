import { useRef, useEffect, forwardRef } from 'react';

import { IDayWithEvents } from 'pages/calendar-page/CalendarPage';
import { Translate } from 'shared/components/translate/Translate';
import { PitchWithProjectData } from 'shared/interfaces';

import { EEventsView } from './../../constants';
import { useStyles } from './styles';
import { Event } from '../event/Event';

interface ICalendar {
  view: EEventsView;
  hideDays: boolean;
  days: IDayWithEvents[];
}

type CSSDayClass = 'dayItem' | 'todayDayItem' | 'upcomingDayItem';

export const Calendar = forwardRef<HTMLDivElement, ICalendar>(
  ({ view, hideDays, days }, forwardedRef) => {
    const classes = useStyles();
    const todayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (view === EEventsView.DAY_BY_DAY && !!todayRef.current) {
        todayRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center',
        });
      }
    }, [view, hideDays]);

    const daysToRender = hideDays
      ? days.filter((day) => day.isToday || day.events.length)
      : days;

    return (
      <div className={classes.calendarHolder}>
        <div className={classes.backdrop} />
        <div
          className={
            view === EEventsView.MONTHLY
              ? classes.calendarMonthlyView
              : classes.calendar
          }
          ref={forwardedRef}
        >
          {daysToRender.map((day: IDayWithEvents) => {
            const extraClass: CSSDayClass =
              (day.isToday && 'todayDayItem') ||
              (day.isUpcoming && 'upcomingDayItem') ||
              'dayItem';

            return (
              <div
                className={classes[extraClass]}
                ref={day.isToday ? todayRef : null}
                key={day.date.toISOString()}
              >
                <div className={classes.dayDate}>{day.dateFormatted}</div>
                <div className={classes.eventsHolder}>
                  {day.events.length ? (
                    day.events.map((pitch: PitchWithProjectData) => (
                      <Event
                        key={pitch.project.project_id + pitch.starts_on}
                        event={pitch}
                        isToday={day.isToday}
                      />
                    ))
                  ) : (
                    <span className={classes.noEvents}>
                      <Translate value="noEvents" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
