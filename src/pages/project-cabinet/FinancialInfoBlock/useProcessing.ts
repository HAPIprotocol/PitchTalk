import { Project } from '@pitchtalk/contract-api-js';
import {
  BenefitPlanLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import { IProjectRes } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import msToSec from 'date-fns/millisecondsToSeconds';

import { EMPTY_STRING, ZERO } from 'shared/constants';
import { getVestingType } from 'shared/utils/vestingUtils';

export const useProcessing = (
  project: Project,
  vesting: Vesting | null,
  userProject: IProjectRes
) => {
  const isProjectTokenProcessing = !!(
    project?.ft_token_id !== userProject?.token_id
  );

  const isVestingTokenProcessing = !!(
    userProject.vesting_and_investment &&
    vesting?.ft_token_id !== userProject.vesting_and_investment.token_id
  );

  const isVestingTypeProcessing = !!(
    userProject.vesting_and_investment?.benefit_plan &&
    (vesting ? getVestingType(vesting?.benefit_plan) : EMPTY_STRING) !==
      getVestingType(userProject.vesting_and_investment?.benefit_plan)
  );

  const isVestingPriceProcessing = !!(
    userProject.vesting_and_investment &&
    vesting?.price !== userProject.vesting_and_investment.price
  );

  const isInvestMinProcessing = !!(
    userProject.vesting_and_investment &&
    project?.investment_min !==
      userProject.vesting_and_investment.investment_min
  );

  const isInvestMaxProcessing = !!(
    userProject.vesting_and_investment &&
    project?.investment_max !==
      userProject.vesting_and_investment?.investment_max
  );

  const isInvestTotalLimitProcessing = !!(
    userProject.vesting_and_investment &&
    project?.total_investments_limit !==
      userProject.vesting_and_investment?.total_investments_limit
  );

  const isInvestEndDateProcessing = !!(
    userProject.vesting_and_investment &&
    project?.investment_end_date !==
      userProject.vesting_and_investment?.investment_end_date
  );

  const isVestingStartProcessing =
    userProject.vesting_and_investment &&
    (vesting ? msToSec(vesting.start_sec) : ZERO) !==
      userProject.vesting_and_investment.start_sec;

  const isLinVestingEndProcessing = !!(
    userProject.vesting_and_investment &&
    (vesting
      ? (vesting.benefit_plan as BenefitPlanLinear)[BenefitPlanTypes.Linear]
          ?.duration
      : ZERO) !==
      (userProject.vesting_and_investment.benefit_plan as BenefitPlanLinear)[
        BenefitPlanTypes.Linear
      ]?.duration
  );

  return {
    isProjectTokenProcessing,
    isVestingTokenProcessing,
    isVestingPriceProcessing,
    isVestingTypeProcessing,
    isInvestMinProcessing,
    isInvestMaxProcessing,
    isInvestTotalLimitProcessing,
    isInvestEndDateProcessing,
    isVestingStartProcessing,
    isLinVestingEndProcessing,
  };
};
