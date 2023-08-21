import { Fragment, useMemo, useState } from 'react';

import { ReactComponent as TriangleIcon } from 'assets/images/icons/triangle-icon.svg';
import {
  getMonthFormatted,
  getMonthsForPeriod,
  getMonthsForPeriodByYears,
  isDatesEqual,
} from 'shared/utils/dateUtils';

import useStyles from './styles';

interface IMonthSelect {
  classNames: string;
  selectedMonth: Date;
  selectMonth: (date: Date) => void;
}

export const MonthSelect: React.FC<IMonthSelect> = ({
  classNames,
  selectedMonth,
  selectMonth,
}) => {
  const classes = useStyles();

  const months = useMemo(getMonthsForPeriod, []);

  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const monthsByYear = useMemo(
    () => getMonthsForPeriodByYears(months),
    [months]
  );

  const handleSelectMonth = (month: Date) => {
    selectMonth(month);
    setIsDropdownOpened(false);
  };
  return (
    <div className={classes.monthSelect + ' ' + classNames}>
      <span className={classes.monthSelectValue}>
        {getMonthFormatted(selectedMonth, 'LLLL yyyy')}
      </span>
      <div
        className={classes.monthSelectToggle}
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}
      >
        <TriangleIcon
          className={
            isDropdownOpened
              ? classes.monthSelectIconRotate
              : classes.monthSelectIcon
          }
        />
      </div>
      {isDropdownOpened && (
        <div className={classes.dropDownOpened}>
          {Object.keys(monthsByYear).map((year: string) => {
            return (
              <Fragment key={year}>
                <div className={classes.year}>{year}</div>
                <div className={classes.months}>
                  {monthsByYear[year].map((month: Date) => {
                    const disabled = isDatesEqual(month, selectedMonth);
                    return (
                      <button
                        key={month.toUTCString()}
                        disabled={disabled}
                        onClick={() => handleSelectMonth(month)}
                        className={classes.month}
                      >
                        {getMonthFormatted(month, 'LLLL')}
                      </button>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
