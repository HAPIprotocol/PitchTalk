import {
  BenefitPlan,
  BenefitPlanLinear,
  BenefitPlanNonLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import { IProjectRes } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import Big, { BigSource } from 'big.js';
import { differenceInMilliseconds, format } from 'date-fns';
import { isUndefined } from 'lodash';
import { ChartWrapperOptions } from 'react-google-charts';

import {
  BASE,
  DEFAULT_NEAR_DECIMALS,
  ONE_SECOND_IN_MS,
  PRECISION_BALANCE,
  TokenData,
  ZERO,
} from 'shared/constants';

import { getAmountFormatted, getAmountWithDecimals, roundToLow } from './near';

const LINEAR_PERCENT_DEFAULT = 10;

export const getVestingType = (vestingPlan: BenefitPlan) =>
  // eslint-disable-next-line no-prototype-builtins
  vestingPlan.hasOwnProperty(BenefitPlanTypes.NonLinear)
    ? BenefitPlanTypes.NonLinear
    : BenefitPlanTypes.Linear;

const getNextCheckpoint = (vesting: Vesting) =>
  (vesting.benefit_plan as BenefitPlanNonLinear)[
    BenefitPlanTypes.NonLinear
  ].find(
    (checkpoint) =>
      vesting.start_sec + checkpoint.time_since_start * ONE_SECOND_IN_MS >=
      Date.now()
  );

export const getNextCheckpointTime = (vesting: Vesting): number | undefined => {
  const nextTime = getNextCheckpoint(vesting)?.time_since_start;
  return isUndefined(nextTime) ? nextTime : nextTime * ONE_SECOND_IN_MS;
};

export const getLinearVestingDuration = (plan: BenefitPlanLinear) =>
  plan[BenefitPlanTypes.Linear].duration * ONE_SECOND_IN_MS;

export const getNonLinearVestingDuration = (plan: BenefitPlanNonLinear) =>
  (plan[BenefitPlanTypes.NonLinear].at(-1)?.time_since_start ?? 0) *
  ONE_SECOND_IN_MS;

export const getVestingData = (
  vesting: Vesting,
  vestingToken: TokenData,
  investedAmount: number
) => {
  const vestingType = getVestingType(vesting.benefit_plan);
  const defaultData = [
    ['', '', { type: 'string', role: 'tooltip', p: { html: true } }],
  ];

  if (vestingType === BenefitPlanTypes.NonLinear) {
    const vestingData = (vesting.benefit_plan as BenefitPlanNonLinear)[
      BenefitPlanTypes.NonLinear
    ].map(({ time_since_start, percentage }) => {
      const date = vesting.start_sec + time_since_start * ONE_SECOND_IN_MS;
      const tokens = (investedAmount * percentage) / 100;

      return [
        format(date, 'MMM dd, yy'),
        percentage,
        createVestingTooltip(format(date, 'MMM dd, yyyy'), percentage, {
          amount: roundToLow(tokens, PRECISION_BALANCE),
          symbol: vestingToken.symbol,
        }),
      ];
    });
    return [...defaultData, ...vestingData];
  } else {
    const linearPercentage = LINEAR_PERCENT_DEFAULT;
    const durationToUnlock =
      getLinearVestingDuration(vesting.benefit_plan as BenefitPlanLinear) /
      LINEAR_PERCENT_DEFAULT;

    const vestingData = [...Array(LINEAR_PERCENT_DEFAULT + 1)].map((_, i) => {
      const date = vesting.start_sec + durationToUnlock;
      const tokens = (investedAmount * linearPercentage * i) / 100;

      return [
        format(date, 'MMM dd, yy'),
        linearPercentage * i,
        createVestingTooltip(
          format(date, 'MMM dd, yyyy'),
          linearPercentage * i,
          {
            amount: roundToLow(tokens, PRECISION_BALANCE),
            symbol: vestingToken.symbol,
          }
        ),
      ];
    });
    return [...defaultData, ...vestingData];
  }
};

const createVestingTooltip = (
  date: Date | string,
  percent: number,
  tokens: { amount: number; symbol: string }
) =>
  `<div class='tooltip-wrapper'>
    <div class='tooltip-date'>${date}</div>
    <div class='tooltip-percent'>${percent}% unlock</div>
    <div class='tooltip-tokens'>${tokens.amount} ${tokens.symbol}</div>
  </div>`;

export const vestingChartDefaultOptions: ChartWrapperOptions['options'] = {
  tooltip: { isHtml: true, trigger: 'visible' },
  backgroundColor: 'transparent',
  height: 450,
  hAxis: {
    baselineColor: 'transparent',
    minorGridlines: { color: '#28195a' },
    gridlines: { color: '#28195a' },
    textStyle: {
      color: '#C4C4C4',
      fontName: 'Everett-Regular',
      fontSize: 10,
    },
    slantedText: true,
    slantedTextAngle: 45,
  },
  vAxis: {
    baselineColor: 'transparent',
    minorGridlines: { color: '#28195a' },
    gridlines: { color: '#28195a', count: 5 },
    textStyle: {
      color: '#C4C4C4',
      fontName: 'Everett-Regular',
      fontSize: 10,
    },
    // eslint-disable-next-line quotes
    format: "#' %'",
    minValue: 0,
    maxValue: 100,
  },
  pointSize: 7,
  colors: ['#653EE2'],
  legend: { position: 'none' },
};

export const getAvailableTokens = (invested: number, vesting: Vesting) => {
  if (getVestingType(vesting.benefit_plan) === BenefitPlanTypes.NonLinear) {
    const checkpoint = getNextCheckpoint(vesting);
    if (checkpoint) {
      const prevCheckpointIndex =
        (vesting.benefit_plan as BenefitPlanNonLinear)[
          BenefitPlanTypes.NonLinear
        ].findIndex((el) => el.percentage === checkpoint.percentage) - 1;
      const prevPercentage = (vesting.benefit_plan as BenefitPlanNonLinear)[
        BenefitPlanTypes.NonLinear
      ][prevCheckpointIndex <= 0 ? 0 : prevCheckpointIndex].percentage;
      const prevCheckpointDuration = (
        vesting.benefit_plan as BenefitPlanNonLinear
      )[BenefitPlanTypes.NonLinear][
        prevCheckpointIndex <= 0 ? 0 : prevCheckpointIndex
      ].time_since_start;
      const prevPeriodTokens = invested * (prevPercentage / 100);

      const vestingTime = differenceInMilliseconds(
        Date.now(),
        vesting.start_sec + prevCheckpointDuration * ONE_SECOND_IN_MS
      );
      const period =
        checkpoint.percentage /
        100 /
        ((checkpoint?.time_since_start - prevCheckpointDuration) *
          ONE_SECOND_IN_MS);
      const unLockedPercent = vestingTime * period;

      return unLockedPercent > 0 && unLockedPercent < 1
        ? prevPeriodTokens + (invested - prevPeriodTokens) * unLockedPercent
        : invested;
    } else {
      return invested;
    }
  } else {
    const duration = getLinearVestingDuration(
      vesting.benefit_plan as BenefitPlanLinear
    );
    const vestingTime = differenceInMilliseconds(Date.now(), vesting.start_sec);
    const period = 1 / duration;
    const unLockedPercent = vestingTime * period;

    return unLockedPercent > 0 && unLockedPercent < 1
      ? invested * unLockedPercent
      : invested;
  }
};

export const isCliffPeriod = (vestingStart: number) =>
  Date.now() <= vestingStart;

export const isVestingEnded = (vesting: Vesting) => {
  const now = Date.now();
  const vestingType = getVestingType(vesting.benefit_plan);
  const vestingDuration =
    vestingType === BenefitPlanTypes.Linear
      ? getLinearVestingDuration(vesting.benefit_plan as BenefitPlanLinear)
      : getNonLinearVestingDuration(
          vesting.benefit_plan as BenefitPlanNonLinear
        );

  const vestingEnd = vesting.start_sec + vestingDuration;
  return now > vestingEnd;
};

export const getVestingTokenAmountByPrice = (
  invested: BigSource,
  price: BigSource,
  projectTokenDecimals: number
) =>
  Big(invested)
    .div(Big(BASE ** projectTokenDecimals))
    .mul(Big(BASE ** DEFAULT_NEAR_DECIMALS))
    .div(Big(price))
    .toFixed(PRECISION_BALANCE)
    .toString();

export const getVestingAmount = (
  project: IProjectRes,
  projectTokenDecimals: number
) => {
  const decimals = Number(project.vesting_and_investment?.token_decimals);
  const price = Number(
    getAmountFormatted(
      project.vesting_and_investment?.price || ZERO,
      DEFAULT_NEAR_DECIMALS,
      PRECISION_BALANCE
    )
  );
  const totalInvestments = Number(
    getAmountFormatted(
      project.vesting_and_investment?.total_investments_limit || ZERO,
      projectTokenDecimals,
      PRECISION_BALANCE
    )
  );

  const amount = new Big(totalInvestments)
    .div(price || 1)
    .toPrecision(decimals, 3);

  return {
    amountFormatted: roundToLow(Number(amount), PRECISION_BALANCE),
    amountWithDecimals: getAmountWithDecimals(amount, decimals, 0),
  };
};
