import { Project } from '@pitchtalk/contract-api-js';
import {
  BenefitPlanLinear,
  BenefitPlanNonLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import msToSec from 'date-fns/millisecondsToSeconds';
import secToMs from 'date-fns/secondsToMilliseconds';
import { t } from 'i18next';
import * as YUP from 'yup';

import {
  DEFAULT_NEAR_DECIMALS,
  EMPTY_STRING,
  MAX_PERCENT,
  MIN_PERCENT,
  ONE_SECOND_IN_MS,
  PRECISION_BALANCE,
  TEN_MINUTES,
  TIME_PERIOD,
  ZERO,
} from 'shared/constants';
import {
  getAmountFormatted,
  getAmountWithDecimals,
  roundToLow,
} from 'shared/utils/near';
import { getVestingType } from 'shared/utils/vestingUtils';

type VestingState = {
  vestingType: BenefitPlanTypes;
  start_date: number;
  price: number;
  ft_token_id: string;
  [BenefitPlanTypes.Linear]: { endDate: number };
  [BenefitPlanTypes.NonLinear]: { endDate: number; percentage: number }[];
};

export type FinancialInfoBlockState = {
  comment: string;
  finData: {
    ft_token_id: string;
    investment_min: number;
    investment_max: number;
    investment_end_date: number;
    total_investments_limit: number;
  };
  vesting: VestingState;
};

export const getFinInfoBlockState = (
  (now: number) =>
  (
    project: Project,
    vesting: Vesting | null,
    tokens: { [key: string]: ITokenMetadata }
  ): FinancialInfoBlockState => {
    const pMeta = tokens[project?.ft_token_id] || DEFAULT_NEAR_DECIMALS;

    return {
      comment: EMPTY_STRING,
      finData: {
        ft_token_id: project?.ft_token_id ?? Object.keys(tokens)[0],
        investment_min: roundToLow(
          +getAmountFormatted(
            project?.investment_min ?? ZERO,
            pMeta.decimals,
            PRECISION_BALANCE
          ),
          PRECISION_BALANCE
        ),
        investment_max: roundToLow(
          +getAmountFormatted(
            project?.investment_max ?? ZERO,
            pMeta.decimals,
            PRECISION_BALANCE
          ),
          PRECISION_BALANCE
        ),
        investment_end_date: project?.investment_end_date ?? now,
        total_investments_limit: roundToLow(
          +getAmountFormatted(
            project?.total_investments_limit ?? ZERO,
            pMeta.decimals,
            PRECISION_BALANCE
          ),
          PRECISION_BALANCE
        ),
      },
      vesting: {
        vestingType: getVestingType(
          vesting?.benefit_plan ?? {
            [BenefitPlanTypes.Linear]: { duration: TIME_PERIOD * 10 },
          }
        ),
        ft_token_id: vesting?.ft_token_id ?? Object.keys(tokens)[0],
        start_date: vesting?.start_sec ?? now,
        price: roundToLow(
          +getAmountFormatted(
            vesting?.price || ZERO,
            DEFAULT_NEAR_DECIMALS,
            PRECISION_BALANCE
          ),
          PRECISION_BALANCE
        ),
        [BenefitPlanTypes.Linear]: {
          endDate:
            vesting &&
            getVestingType(vesting.benefit_plan) === BenefitPlanTypes.Linear
              ? vesting.start_sec +
                secToMs(
                  (vesting.benefit_plan as BenefitPlanLinear)[
                    BenefitPlanTypes.Linear
                  ].duration
                )
              : now + TEN_MINUTES,
        },
        [BenefitPlanTypes.NonLinear]:
          vesting &&
          getVestingType(vesting.benefit_plan) === BenefitPlanTypes.NonLinear
            ? (vesting.benefit_plan as BenefitPlanNonLinear)[
                BenefitPlanTypes.NonLinear
              ].map(({ percentage, time_since_start }) => ({
                endDate: vesting.start_sec + secToMs(time_since_start),
                percentage,
              }))
            : [
                { endDate: 0, percentage: MIN_PERCENT },
                { endDate: now + TEN_MINUTES, percentage: MAX_PERCENT },
              ],
      },
    };
  }
)(Date.now());

export const getVestingPlan = (vesting: VestingState) =>
  vesting.vestingType === BenefitPlanTypes.Linear
    ? getLinearVestingPlan(
        vesting[BenefitPlanTypes.Linear].endDate,
        vesting.start_date
      )
    : getNonLinearVestingPlan(
        vesting[BenefitPlanTypes.NonLinear],
        vesting.start_date
      );

const getLinearVestingPlan = (endDate: number, startDate: number) => ({
  [BenefitPlanTypes.Linear]: { duration: msToSec(endDate - startDate) },
});

const getNonLinearVestingPlan = (
  vesting: { endDate: number; percentage: number }[],
  startDate: number
) => ({
  [BenefitPlanTypes.NonLinear]: vesting.map(({ endDate, percentage }, i) => ({
    time_since_start: i === 0 ? 0 : msToSec(endDate - startDate),
    percentage,
  })),
});

export const getVestingDataForSaving = (
  { vesting }: FinancialInfoBlockState,
  decimals: number
) => ({
  price: getAmountWithDecimals(+vesting.price, DEFAULT_NEAR_DECIMALS, 0),
  benefit_plan: getVestingPlan(vesting),
  start_date: msToSec(vesting.start_date),
  token_id: vesting.ft_token_id,
  token_decimals: decimals,
});

export const getInvestmentDataForSaving = (
  { finData }: FinancialInfoBlockState,
  decimals: number
) => ({
  investment_min: getAmountWithDecimals(+finData.investment_min, decimals, 0),
  investment_max: getAmountWithDecimals(+finData.investment_max, decimals, 0),
  total_investments_limit: getAmountWithDecimals(
    finData.total_investments_limit,
    decimals,
    0
  ),
  investment_end_date: msToSec(finData.investment_end_date),
});

const required = t('validation.requiredField');
const incorrectDate = t('validation.incorrectDate');
const incorrectAmount = t('validation.incorrectAmount');

export const validationSchema = (pitchEndDate: number) =>
  YUP.object({
    comment: YUP.string(),
    finData: YUP.object({
      ft_token_id: YUP.string(),
      investment_min: YUP.number()
        .min(0, incorrectAmount)
        .required(required)
        .typeError(incorrectAmount),
      investment_max: YUP.number().when('investment_min', (investMin) =>
        YUP.number()
          .moreThan(investMin, incorrectAmount)
          .required(required)
          .typeError(incorrectAmount)
      ),
      total_investments_limit: YUP.number().when(
        'investment_max',
        (investMax) =>
          YUP.number()
            .moreThan(investMax, incorrectAmount)
            .required(required)
            .typeError(incorrectAmount)
      ),
      investment_end_date: YUP.number()
        .min(
          pitchEndDate + ONE_SECOND_IN_MS,
          t('validation.finSettings.investEndData.min')
        )
        .required(required)
        .typeError(incorrectDate),
    }),
    vesting: YUP.object().when('finData.investment_end_date', (investEndDate) =>
      YUP.object({
        vestingType: YUP.string().required(required),
      }).when('vesting.vestingType', (vestingType) =>
        YUP.object({
          price: YUP.number()
            .moreThan(0, incorrectAmount)
            .required(required)
            .typeError(incorrectDate),
          start_date: YUP.number()
            .min(
              investEndDate + ONE_SECOND_IN_MS,
              t('validation.finSettings.vestingStart.min')
            )
            .required(required)
            .typeError(incorrectDate),
          ft_token_id: YUP.string(),
          [BenefitPlanTypes.Linear]:
            vestingType !== BenefitPlanTypes.Linear
              ? YUP.object()
              : YUP.object().when('start_date', (vestingStart) =>
                  YUP.object({
                    endDate: YUP.number()
                      .min(vestingStart + ONE_SECOND_IN_MS, incorrectDate)
                      .required(required)
                      .typeError(incorrectDate),
                  })
                ),
          [BenefitPlanTypes.NonLinear]:
            vestingType !== BenefitPlanTypes.NonLinear
              ? YUP.array()
              : YUP.array().when('start_date', (vestingStart) =>
                  YUP.array().of(
                    YUP.object({
                      endDate: YUP.number()
                        .required(required)
                        .typeError(incorrectDate),
                      percentage: YUP.number().required(required),
                    }).test(
                      'validate endDate and percentage',
                      ({ endDate, percentage }, context) => {
                        const ind = (
                          context as YUP.TestContext & {
                            options: { index: number };
                          }
                        ).options.index;
                        const arr = context.parent;
                        const now = Date.now();
                        if (ind === 0) return true;

                        const prevDate =
                          ind === 1 ? vestingStart : arr[ind - 1]?.endDate;
                        const nextDate = arr[ind + 1]?.endDate || undefined;
                        const isDateInValid =
                          !endDate ||
                          (nextDate && endDate >= nextDate) ||
                          prevDate >= endDate ||
                          now >= endDate ||
                          !endDate;

                        const prevPercent = arr[ind - 1]?.percentage || 0;
                        const nextPercent = arr[ind + 1]?.percentage || 100;

                        const isPercentInValid =
                          !percentage ||
                          percentage > nextPercent ||
                          (ind !== 1 && prevPercent >= percentage) ||
                          (ind === arr.length - 1 && percentage !== 100);

                        const errors: YUP.ValidationError[] = [];
                        if (isDateInValid) {
                          errors.push(
                            new YUP.ValidationError(
                              incorrectDate,
                              '',
                              `vesting.NonLinear.[${ind}].endDate`
                            )
                          );
                        }
                        if (isPercentInValid) {
                          errors.push(
                            new YUP.ValidationError(
                              incorrectAmount,
                              '',
                              `vesting.NonLinear.[${ind}].percentage`
                            )
                          );
                        }

                        return context.createError({ message: () => errors });
                      }
                    )
                  )
                ),
        })
      )
    ),
  });
