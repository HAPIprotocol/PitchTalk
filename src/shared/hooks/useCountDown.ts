import {
  BenefitPlanLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  differenceInSeconds,
  formatDuration,
  getTime,
  intervalToDuration,
} from 'date-fns';
import isUndefined from 'lodash/isUndefined';
import { useEffect, useMemo, useState } from 'react';

import { ONE_SECOND_IN_MS } from 'shared/constants';
import {
  getLinearVestingDuration,
  getNextCheckpointTime,
  getVestingType,
  isCliffPeriod,
} from 'shared/utils/vestingUtils';

export enum ECountDownActions {
  FULL_UNLOCK = 'full-unlock',
  CLIFF_TIME = 'cliff-time',
  NEXT_UNLOCK_TIME = 'next-unlock-time',
}

const updateDuration = (end: number): string =>
  formatDuration(intervalToDuration({ start: getTime(Date.now()), end }));

export const useCountDown = (vesting: Vesting): [string, ECountDownActions] => {
  const vestingType = useMemo(
    () => getVestingType(vesting.benefit_plan),
    [vesting.benefit_plan]
  );
  const [unlock, setUnlock] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState('');
  const [action, setAction] = useState<ECountDownActions>(
    ECountDownActions.NEXT_UNLOCK_TIME
  );

  useEffect(() => {
    // Initial countDown setup
    let nextUnlock;
    if (isCliffPeriod(vesting.start_sec)) {
      nextUnlock = vesting.start_sec;
      setAction(ECountDownActions.CLIFF_TIME);
    } else {
      nextUnlock =
        vestingType === BenefitPlanTypes.NonLinear
          ? getNextCheckpointTime(vesting)
          : getLinearVestingDuration(vesting.benefit_plan as BenefitPlanLinear);

      if (
        isUndefined(nextUnlock) ||
        getTime(Date.now()) >= vesting.start_sec + nextUnlock
      ) {
        setAction(ECountDownActions.FULL_UNLOCK);
        return;
      }
      nextUnlock = vesting.start_sec + nextUnlock;
    }

    setUnlock(nextUnlock);
    setDuration(updateDuration(nextUnlock));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isUndefined(unlock)) {
        stopCountDown();
        return;
      }

      const diff = differenceInSeconds(unlock, getTime(Date.now()));
      if (diff > 0) {
        setDuration(updateDuration(unlock));
      } else {
        const nextUnlock =
          vestingType === BenefitPlanTypes.NonLinear
            ? getNextCheckpointTime(vesting)
            : getLinearVestingDuration(
                vesting.benefit_plan as BenefitPlanLinear
              );

        if (
          isUndefined(nextUnlock) ||
          getTime(Date.now()) >= vesting.start_sec + nextUnlock
        ) {
          stopCountDown();
          return;
        }
        setDuration(updateDuration(vesting.start_sec + nextUnlock));
        setUnlock(vesting.start_sec + nextUnlock);
        setAction(ECountDownActions.NEXT_UNLOCK_TIME);
      }
    }, ONE_SECOND_IN_MS);

    function stopCountDown() {
      setDuration('');
      setAction(ECountDownActions.FULL_UNLOCK);
      interval && clearInterval(interval);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [unlock]);

  return [duration, action];
};
