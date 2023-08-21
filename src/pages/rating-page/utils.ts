import { IGrant } from '@pitchtalk/contract-api-js/dist/core';
import { subDays } from 'date-fns';

import { IRatingItem } from './constants';

export const FILTERS_DAYS_VALUES = { '30': 30, '7': 7, '1': 1 };

export const filterGrantsDates =
  (filterFunc: (date: number) => boolean) => (grant: IGrant) =>
    filterFunc(grant.date);

export const filterByYear = (date: number) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1).valueOf();
  const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1).valueOf();

  return date >= startOfYear && date <= endOfYear;
};

export const filterByMonth = (date: number) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).valueOf();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).valueOf();

  return date >= firstDayOfMonth && date <= lastDayOfMonth;
};

export const filterByWeek = (date: number) => {
  const currentDate = new Date();
  const first = currentDate.getDate() - currentDate.getDay();
  const last = first + 6;

  const firstWeekDay = new Date(currentDate.setDate(first)).valueOf();
  const lastWeekDay = new Date(currentDate.setDate(last)).valueOf();
  return date >= firstWeekDay && date <= lastWeekDay;
};

export const filterByDay = (date: number) => {
  const start = new Date();
  const end = new Date();

  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(23, 59, 59, 999);

  const startOfDay = start.valueOf();
  const endOfDay = end.valueOf();
  return date >= startOfDay && date <= endOfDay;
};

export const filterByCustomDays =
  (customFilterAmount = FILTERS_DAYS_VALUES[1]) =>
  (date: number) => {
    const currentDate = new Date();
    const minDate = subDays(currentDate, customFilterAmount).valueOf();
    const maxDate = currentDate.valueOf();

    return date >= minDate && date <= maxDate;
  };

export const filterProjectsWithoutGrants = (ratingItem: IRatingItem) =>
  [
    ratingItem.ALL,
    ratingItem.YEAR,
    ratingItem.MONTH,
    ratingItem.WEEK,
    ratingItem.DAY,
  ].some((p) => !!p);
