import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  BenefitPlanLinear,
  BenefitPlanNonLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import {
  EPitchType,
  EProjectType,
  IOffChainProject,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import Big from 'big.js';

import { IFilteredProject } from 'pages/projects-page/interface';
import {
  BASE,
  DEFAULT_NEAR_DECIMALS,
  EMPTY_STRING,
  ONE_DAY,
  PRECISION_BALANCE,
  ZERO,
} from 'shared/constants';

import { getAmountFormatted } from './near';
import {
  getLinearVestingDuration,
  getNonLinearVestingDuration,
  getVestingTokenAmountByPrice,
  getVestingType,
  isVestingEnded,
} from './vestingUtils';

export enum EProjectStatus {
  SOON = 'SOON',
  NEW = 'NEW',
  LIVE = 'LIVE',
  HOT = 'HOT',
  VESTING = 'VESTING',
  COMPLETED = 'COMPLETED',
  UNKNOWN = 'UNKNOWN',
}

export const isSoonProject = (project: Project) => {
  const now = Date.now();

  return [
    project.intro_pitch,
    project.update_pitch,
    project.investors_pitch,
  ].some(
    (pitch) =>
      pitch && pitch.starts_on - now < ONE_DAY && pitch.starts_on - now > 0
  );
};

export const isNewProject = (project: Project) =>
  project.stage === EPitchType.Initial && !project.intro_pitch;

export const isLiveProject = (project: Project) => {
  const now = Date.now();
  return [
    project.intro_pitch,
    project.update_pitch,
    project.investors_pitch,
  ].some(
    (pitch) =>
      pitch && pitch.starts_on < now && pitch.starts_on + pitch.duration > now
  );
};

export const isHotProject = (
  project: Project,
  _: Vesting | null,
  tokenDecimals = DEFAULT_NEAR_DECIMALS
) => {
  if (project.stage !== EPitchType.Investment || !project.investment_end_date)
    return false;
  const now = Date.now();
  return (
    +getAmountFormatted(project.total_investments, tokenDecimals) <
      +getAmountFormatted(project.total_investments_limit, tokenDecimals) &&
    now < project.investment_end_date
  );
};

export const isVestingProject = (_: Project, vesting: Vesting | null) => {
  const now = Date.now();
  if (vesting) {
    const vestingType = getVestingType(vesting.benefit_plan);
    const vestingDuration =
      vestingType === BenefitPlanTypes.Linear
        ? getLinearVestingDuration(vesting.benefit_plan as BenefitPlanLinear)
        : getNonLinearVestingDuration(
            vesting.benefit_plan as BenefitPlanNonLinear
          );

    const vestingEnd = vesting.start_sec + vestingDuration;
    return now > vesting.start_sec && now < vestingEnd;
  } else {
    return false;
  }
};

export const isCompletedProject = (_: Project, vesting: Vesting | null) =>
  vesting ? isVestingEnded(vesting) : false;

export const getProjectStatus = (
  project: Project,
  vesting: Vesting | null,
  decimals?: number
): EProjectStatus => {
  if (isNewProject(project)) {
    return EProjectStatus.NEW;
  } else if (isLiveProject(project)) {
    return EProjectStatus.LIVE;
  } else if (isSoonProject(project)) {
    return EProjectStatus.SOON;
  } else if (isHotProject(project, null, decimals)) {
    return EProjectStatus.HOT;
  } else if (isVestingProject(project, vesting)) {
    return EProjectStatus.VESTING;
  } else if (isCompletedProject(project, vesting)) {
    return EProjectStatus.COMPLETED;
  } else {
    return EProjectStatus.UNKNOWN;
  }
};

// TODO: just in case I let it after changes in rules for grants.
//       delete if not need this.
// export const isGrantsAvailable = (project: Project) =>
//   isStageInvestmentAvailable(
//     EPitchType.Intro,
//     project.stage,
//     project.intro_pitch
//   ) && Object.values(project?.documents || {}).some(Boolean);

export const isGrantsAvailable = true;

export const getProjectInvestsAndDonatesInUSN = (project: IFilteredProject) =>
  Number(project.donations.donatesInUSN) +
  Number(project.donations.investmentsInUSN);

// WITHDRAW
export const getVestingTokensAvailableWithdraw = (
  project?: Project,
  vesting?: Vesting | null,
  projectTokenDecimals?: number
) => {
  if (!project || !vesting || !projectTokenDecimals) return ZERO;

  const vestingTokens = +getAmountFormatted(
    vesting.amount,
    vesting.ft_token_decimals
  );
  const totalInvestedMultByPrice = +getAmountFormatted(
    +getVestingTokenAmountByPrice(
      project.total_investments,
      +getAmountFormatted(
        vesting.price,
        DEFAULT_NEAR_DECIMALS,
        PRECISION_BALANCE
      ),
      projectTokenDecimals
    ),
    DEFAULT_NEAR_DECIMALS
  );
  const vestingWithdrawn = +getAmountFormatted(
    vesting.withdrawn_amount,
    vesting.ft_token_decimals
  );

  return (
    vestingTokens -
    totalInvestedMultByPrice -
    vestingWithdrawn
  ).toString();
};

export const getDonationsAvailableToWithdraw = (
  project: Project,
  decimals: number
) =>
  getAmountFormatted(
    +(project?.total_donations ?? 0) -
      +(project?.total_withdrawn_donations ?? 0),
    decimals
  );

export const getInvestmentsAvailableToWithdraw = (
  project: Project,
  decimals: number
) =>
  getAmountFormatted(
    +(project?.total_investments ?? 0) -
      +(project?.total_withdrawn_investments ?? 0),
    decimals
  );

export const getGrantsAvailableToWithdraw = (
  project: Project,
  tokenId: string,
  decimals: number
) =>
  getAmountFormatted(
    +(project?.total_grants?.[tokenId || EMPTY_STRING] ?? 0) -
      +(project?.total_withdrawn_grants?.[tokenId || EMPTY_STRING] ?? 0),
    decimals
  );

export const getProjectInvestmentInfo = (
  project: Project,
  projectTokenMeta: ITokenMetadata
) => {
  const min = new Big(project.investment_min)
    .div(BASE ** projectTokenMeta.decimals)
    .toNumber();
  const max = new Big(project.investment_max)
    .div(BASE ** projectTokenMeta.decimals)
    .toNumber();
  const totalInvestmentsLimit = new Big(project.total_investments_limit)
    .div(BASE ** projectTokenMeta.decimals)
    .toNumber();
  const usersInvestments = new Big(project.total_investments)
    .div(BASE ** projectTokenMeta.decimals)
    .toNumber();

  return { min, max, totalInvestmentsLimit, usersInvestments };
};

export const isProjectCanCollectInvests = (
  project: Project,
  projectTokenMeta: ITokenMetadata
) => {
  const { totalInvestmentsLimit, usersInvestments } = getProjectInvestmentInfo(
    project,
    projectTokenMeta
  );

  return totalInvestmentsLimit !== usersInvestments;
};

export const replaceKey = (str: string, oldKey = '.', newKey = '-') =>
  str.replaceAll(oldKey, newKey);

export const isOffChainProject = (
  project: Project | IOffChainProject
): project is IOffChainProject => !!(project as IOffChainProject)?.id;

export const isOffChainProjectType = (type: EProjectType) =>
  type === EProjectType.OffChain;
