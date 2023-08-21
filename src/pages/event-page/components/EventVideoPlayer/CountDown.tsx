import intervalToDuration from 'date-fns/intervalToDuration';
import { t } from 'i18next';
import omit from 'lodash/omit';
import { useEffect, useState } from 'react';

import { ONE_SECOND_IN_MS } from 'shared/constants';

import { useStyles } from './countDownStyles';

const calculateTime = (endDate: number) => {
  const now = new Date();
  const end = new Date(endDate);
  return intervalToDuration({ start: now, end: end });
};

const isCountDownEnded = (countDown: Duration) =>
  countDown.seconds === 0 &&
  countDown.minutes === 0 &&
  countDown.hours === 0 &&
  countDown.days === 0 &&
  countDown.months === 0;

export const CountDown: React.FC<{
  endDate: number;
  onCountDownEnd: () => void;
}> = ({ endDate, onCountDownEnd }) => {
  const classes = useStyles();
  const [countDown, setCountDown] = useState<Duration>(calculateTime(endDate));

  useEffect(() => {
    if (!endDate) return;
    const interval = setInterval(() => {
      setCountDown(calculateTime(endDate));
    }, ONE_SECOND_IN_MS);

    if (isCountDownEnded(countDown)) {
      clearInterval(interval);
      onCountDownEnd();
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, countDown]);

  return (
    <div className={classes.countDown}>
      {Object.entries(omit(countDown, ['years'])).map(([timeKey, time], i) => {
        if (timeKey === 'months' && time === 0) return null;
        return (
          <div className={classes.countDownItem} key={time + i + timeKey}>
            <p className={classes.countDownTime}>
              {time.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
            </p>
            <p className={classes.countDownTimeKey}>{`${t(
              `countDown.${timeKey}`
            )}`}</p>
          </div>
        );
      })}
    </div>
  );
};
