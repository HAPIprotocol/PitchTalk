import {
  endOfDay,
  format,
  isAfter,
  isSameDay,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { isBefore, isSameMonth } from 'date-fns/esm';
import { useEffect, useMemo, useRef, useState } from 'react';

import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import i18n from 'services/translation';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { MonthSelect } from 'shared/components/select';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { IToggleButtonConfig, PitchWithProjectData } from 'shared/interfaces';
import { getCurrentMonth, getMonthDays } from 'shared/utils/dateUtils';
import { selectPitches } from 'store/slices/pitches';

import { Calendar } from './components/calendar/Calendar';
import { MobileCalendar } from './components/mobile-calendar/MobileCalendar';
import { EEventsView } from './constants';
import { useStyles } from './styles';

export interface IDayWithEvents {
  dateFormatted: string;
  date: Date;
  isToday: boolean;
  isBefore: boolean;
  isUpcoming: boolean;
  events: PitchWithProjectData[];
}

const CalendarPage: React.FC = () => {
  const classes = useStyles();
  const currentMonth = useMemo(getCurrentMonth, []);
  const today = useMemo(() => new Date(), []);

  const [month, setMonth] = useState<Date>(currentMonth);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentView, setCurrentView] = useState<EEventsView>(
    EEventsView.DAY_BY_DAY
  );
  const [hideEmptyDays, setHideEmptyDays] = useState<boolean>(true);

  const dimension = useWindowDimensions();
  const pitchesList = useAppSelector(selectPitches);
  const days = useMemo(() => getMonthDays(month), [month]);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSameMonth(currentMonth, month)) setSelectedDate(today);
    else setSelectedDate(startOfMonth(month));
  }, [month, currentMonth, today]);

  const preparedDays: IDayWithEvents[] = useMemo(
    () =>
      days.map((day) => {
        const dayPitches = pitchesList.filter((pitch) =>
          isSameDay(pitch.starts_on, day)
        );
        const now = new Date();
        return {
          dateFormatted: format(day, 'EEE d'),
          date: day,
          isToday: isSameDay(day, now),
          isBefore: isBefore(day, startOfDay(now)),
          isUpcoming: isAfter(day, endOfDay(now)),
          events: dayPitches,
        };
      }),
    [days, pitchesList]
  );

  const selectedDayEvents = useMemo(
    () => preparedDays.find((day) => isSameDay(day.date, selectedDate)),
    [preparedDays, selectedDate]
  );

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.pageHeader}>
          <TogglePanel
            buttons={calendarViewToggleConfig}
            containerStyles={classes.calendarViewToggle}
            buttonStyles={classes.calendarViewToggleButton}
            handler={setCurrentView}
            toggleValue={currentView}
          />
          <MonthSelect
            classNames={classes.monthSelect}
            selectedMonth={month}
            selectMonth={setMonth}
          />
          <div className={classes.hideDaysContainer}>
            <Checkbox
              checked={hideEmptyDays}
              onChange={() => setHideEmptyDays((hide) => !hide)}
            />
            <div className={classes.hideDaysText}>
              <Translate value="events.hideEmptyDays" />
            </div>
          </div>
          <NavLink className={classes.allEventsLink} to={APP_ROUTES.EVENTS}>
            {`${i18n.t('links.viewAllEvents')}`}
          </NavLink>
        </div>
        {dimension !== EDimensions.SMALL && (
          <Calendar
            view={currentView}
            days={preparedDays}
            ref={calendarRef}
            hideDays={hideEmptyDays}
          />
        )}
        {dimension === EDimensions.SMALL && (
          <MobileCalendar
            ref={calendarRef}
            selectedDate={selectedDate}
            selectDay={setSelectedDate}
            selectedDay={selectedDayEvents}
            daysWithEvents={preparedDays}
            hideDays={hideEmptyDays}
          />
        )}
      </div>
    </div>
  );
};

const calendarViewToggleConfig: IToggleButtonConfig<EEventsView>[] = [
  {
    label: 'events.dayByDayView',
    value: EEventsView.DAY_BY_DAY,
  },
  {
    label: 'events.monthlyView',
    value: EEventsView.MONTHLY,
  },
];

export default CalendarPage;
