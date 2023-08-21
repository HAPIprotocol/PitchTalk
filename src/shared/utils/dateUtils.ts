import Big from 'big.js';
import {
  endOfYear,
  addYears,
  eachMonthOfInterval,
  startOfMonth,
  isEqual,
  getYear,
  addDays,
  endOfMonth,
  format,
  subMonths,
  isValid,
} from 'date-fns';
import { enGB } from 'date-fns/locale';

import i18n from 'services/translation';
import { NANO_SEC_IN_MS } from 'shared/constants';

export const getMonthFormatted = (
  date: number | Date,
  formatType: 'LLLL' | 'LLLL yyyy'
): string => {
  return format(date, formatType, { locale: enGB });
};

export const getMonthsForPeriod = (
  startDate: Date | number = new Date(),
  endDate: Date | number = endOfYear(addYears(new Date(), 1))
): Date[] => {
  return eachMonthOfInterval({
    start: subMonths(startDate, 1),
    end: endDate,
  });
};

export const getCurrentMonth = (): Date => startOfMonth(new Date());
export const isDatesEqual = (a: Date, b: Date): boolean => isEqual(a, b);
export const getMonthsForPeriodByYears = (
  months: Date[],
  differenceInYears = 1
) => {
  const currentYear = getYear(new Date());
  const currentYearIndex = months.findIndex(
    (month: Date) => getYear(month) !== currentYear
  );

  if (differenceInYears === 1) {
    return {
      [`${currentYear}`]: months.slice(0, currentYearIndex),
      [`${currentYear + 1}`]: months.slice(currentYearIndex, months.length),
    };
  }

  const diffArray = Array.from(
    new Array(differenceInYears),
    (_, i) => currentYear + i
  );
  return diffArray.reduce((result, current) => {
    return {
      ...result,
      [`${current}`]: months.filter(
        (month: Date) => getYear(month) === current
      ),
    };
  }, {});
};

const getDaysArray = (startDate: Date, stopDate: Date) =>
  Array.from(
    { length: stopDate.getDate() - startDate.getDate() + 1 },
    (_, ind) => addDays(startDate, ind)
  );

export const getMonthDays = (month: Date) => {
  const firstDay = startOfMonth(month);
  const lastDay = endOfMonth(month);

  return getDaysArray(firstDay, lastDay);
};

export const formatDuration = (start: number, duration: number) => {
  return `${format(start, 'MMM d p')} - ${format(start + duration, 'p')}`;
};

export const formatCreatedAt = (date: Date | number) => {
  return `${format(date, 'MM.dd.y | p')}`;
};

export const getValidCreatedAt = (date: number | Date) => {
  if (isValid(date)) return formatCreatedAt(date);
  if (
    typeof date === 'number' &&
    isValid(new Big(date).div(NANO_SEC_IN_MS).toNumber())
  ) {
    return formatCreatedAt(new Big(date).div(NANO_SEC_IN_MS).toNumber());
  }
  return i18n.t('unknownDate');
};

export const sleep = async (time: number) =>
  await new Promise((resolve) => setTimeout(resolve, time));

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const DIVISIONS: Array<{ amount: number; name: Intl.RelativeTimeFormatUnit }> =
  [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' },
  ];

export function formatTimeAgo(date: number) {
  let duration = (date - Date.now()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
