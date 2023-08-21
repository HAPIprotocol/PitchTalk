import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import {
  EventAccessFeeTypePayed,
  IEvent,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import format from 'date-fns/format';

import { IEventScheduleCheckpointData } from 'store/types/events';

import { getAmountFormatted } from './near';

export const isEventStarted = (event?: IEvent) =>
  !!(event && Date.now() > event.start_date);

export const isEventEnded = (event?: IEvent) =>
  !!(event && Date.now() > event.end_date);

export const isEventVoteEnded = (event?: IEvent) =>
  !!(event && Date.now() > event.vote_end_date);

export const getEventFee = (
  fee: EventAccessFeeTypePayed,
  tokenMeta: ITokenMetadata
) => ({
  amount: getAmountFormatted(fee.amount, tokenMeta.decimals, 0),
  icon: tokenMeta.icon,
  symbol: tokenMeta.symbol,
});

export const formatCheckpointDate = (start: number, duration: number) => {
  const endDate = start + duration;
  const isOneDay = new Date(start).getDate() === new Date(endDate).getDate();

  const startFormatType = isOneDay ? 'p' : 'd MMM p';
  const endFormatType = isOneDay ? 'p' : 'd MMM p';

  return `${format(start, startFormatType)} - ${format(
    endDate,
    endFormatType
  )}`;
};

const findClosestDateInd = (schedule: IEventScheduleCheckpointData[]) => {
  const targetDate = Date.now();
  let ind = 0;

  let closestDate = schedule[0].start_date;
  let closestDiff = Math.abs(targetDate - closestDate);

  for (let i = 1; i < schedule.length; i++) {
    const currentDate = schedule[i].start_date;
    const currentDiff = Math.abs(targetDate - currentDate);
    if (currentDiff < closestDiff) {
      closestDate = currentDate;
      closestDiff = currentDiff;
      ind = i;
    }
  }

  return ind;
};

export const SCHEDULE_RANGE = 4;
const SCHEDULE_PREV_SHIFT = 1;
const SCHEDULE_NEXT_SHIFT = 2;

export const getEventScheduleSlice = (
  scheduleRaw: IEventScheduleCheckpointData[],
  isEventOff: boolean
) => {
  const scheduleLength = scheduleRaw.length;
  const closestInd =
    !isEventOff && scheduleRaw.length ? findClosestDateInd(scheduleRaw) : 0;

  const minInd = closestInd - SCHEDULE_PREV_SHIFT;
  const maxInd = closestInd + SCHEDULE_NEXT_SHIFT;

  return isEventOff
    ? scheduleRaw.slice(0, SCHEDULE_RANGE)
    : scheduleRaw.slice(
        minInd < SCHEDULE_PREV_SHIFT
          ? 0
          : minInd + SCHEDULE_RANGE > scheduleLength
          ? scheduleLength - SCHEDULE_RANGE
          : minInd,
        maxInd < SCHEDULE_RANGE
          ? SCHEDULE_RANGE
          : maxInd > scheduleLength
          ? scheduleLength
          : maxInd + 1
      );
};
