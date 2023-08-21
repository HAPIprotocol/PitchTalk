import { isSameDay, format } from 'date-fns';
import { forwardRef, useEffect, useRef } from 'react';

import { IDayWithEvents } from 'pages/calendar-page/CalendarPage';
import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';
import { MobileEvent } from '../mobile-event/MobileEvent';

interface IMobileCalendar {
  selectedDate: Date;
  selectedDay?: IDayWithEvents;
  daysWithEvents: IDayWithEvents[];
  selectDay: (date: Date) => void;
  hideDays: boolean
}

type CSSDayClass = 'mobileDayMonthDay' | 'mobileDaySelected' | 'mobileDayToday';

export const MobileCalendar = forwardRef<HTMLDivElement, IMobileCalendar>(
  ({ selectedDate, selectedDay, daysWithEvents, selectDay, hideDays }, forwardedRef) => {
    const classes = useStyles();
    const todayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      todayRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      });
    }, [todayRef, hideDays]);

    const daysToRender = hideDays
      ? daysWithEvents.filter((day) => day.isToday || day.events.length)
      : daysWithEvents;
    return (
      <div className={classes.mobileCalendarHolder}>
        <div className={classes.mobileDaySelect} ref={forwardedRef}>
          {daysToRender.map((day: IDayWithEvents) => {
            const { date, isToday } = day;
            const extraClass: CSSDayClass =
              (isSameDay(date, selectedDate) && 'mobileDaySelected') ||
              (isToday && 'mobileDayToday') ||
              'mobileDayMonthDay';
            return (
              <div
                className={classes.mobileDayButton}
                key={day.date.toISOString()}
                onClick={() => selectDay(date)}
                ref={isToday ? todayRef : null}
              >
                <span className={classes.mobileDayWeekDay}>
                  {format(date, 'ccc')}
                </span>
                <span className={classes[extraClass]}>{format(date, 'd')}</span>
              </div>
            );
          })}
        </div>
        {selectedDay?.events?.length ? (
          <div className={classes.mobileEventsHolder}>
            {selectedDay.events.map(({ project, ...pitch }) => (
              <MobileEvent
                project={project}
                pitch={pitch}
                key={pitch.starts_on}
              />
            ))}
          </div>
        ) : (
          <span className={classes.noEvents}>
            <Translate value="noEvents" />
          </span>
        )}
      </div>
    );
  }
);
