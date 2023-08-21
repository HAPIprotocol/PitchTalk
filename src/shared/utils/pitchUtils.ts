import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import {
  Pitch,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import {
  IDonation,
  IInvestment,
} from '@pitchtalk/contract-api-js/dist/pitchtalk';
import { PitchSub } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import Big from 'big.js';
import { isValid } from 'date-fns';
import minToMSec from 'date-fns/minutesToMilliseconds';
import { range } from 'lodash';

import { wrapNearId } from 'services/config';
import i18n from 'services/translation';
import {
  DEFAULT_PAGINATION_REQUEST,
  DEFAULT_NEAR_DECIMALS,
  ZERO_BIG,
  PREVIEW_PITCH_DELAY,
} from 'shared/constants';
import {
  PitchWithProjectData,
  IClosestPitch,
  EClosestItemStatus,
  ParticipationType,
  Participation,
  IParticipatedProjects,
} from 'shared/interfaces';

import { BASE } from './../constants/index';

export function getTheClosestPitch(
  pitchesList: PitchWithProjectData[]
): IClosestPitch {
  if (!pitchesList.length) {
    return {
      pitch: {},
      status: EClosestItemStatus.EMPTY,
    } as IClosestPitch;
  }

  const now = Date.now();
  const livePitch = pitchesList.find(
    (pitch) => pitch.starts_on < now && pitch.starts_on + pitch.duration > now
  );
  if (livePitch)
    return {
      pitch: livePitch,
      status: EClosestItemStatus.LIVE,
    };

  const recentPitch = pitchesList
    .filter((pitch) => pitch.starts_on < now)
    .pop();
  const upcomingPitch = pitchesList
    .filter((pitch) => pitch.starts_on > now)
    .shift();

  if (upcomingPitch && upcomingPitch.starts_on - now < PREVIEW_PITCH_DELAY) {
    return {
      pitch: upcomingPitch,
      status: EClosestItemStatus.CLOSEST_UPCOMING,
    };
  }

  if (recentPitch && upcomingPitch) {
    const recentTimeDifference = recentPitch ? now - recentPitch.starts_on : 0;
    const upcomingTimeDifference = upcomingPitch
      ? upcomingPitch.starts_on - now
      : 0;

    return recentTimeDifference > upcomingTimeDifference
      ? { pitch: upcomingPitch, status: EClosestItemStatus.CLOSEST_UPCOMING }
      : { pitch: recentPitch, status: EClosestItemStatus.CLOSEST_PAST };
  }

  if (!recentPitch && upcomingPitch)
    return {
      pitch: upcomingPitch,
      status: EClosestItemStatus.CLOSEST_UPCOMING,
    };
  if (!upcomingPitch && recentPitch)
    return { pitch: recentPitch, status: EClosestItemStatus.CLOSEST_PAST };

  return {
    pitch: {},
    status: EClosestItemStatus.EMPTY,
  } as IClosestPitch;
}

export function retrievePitchesFromProjects(
  projects: Project[]
): PitchWithProjectData[] {
  return projects.reduce(
    (
      result: PitchWithProjectData[],
      project: Project
    ): PitchWithProjectData[] => {
      const { intro_pitch, update_pitch, investors_pitch } = project;
      const pitches: PitchWithProjectData[] = (
        [intro_pitch, update_pitch, investors_pitch] as Pitch[]
      )
        .filter(
          (pitch) => !!pitch && isValid(pitch.starts_on) && pitch.is_active
        )
        .map((pitch) => ({ ...pitch, project }));

      return [...result, ...pitches];
    },
    []
  );
}

const getSummaryByTokens = (
  list: IDonation[] | IInvestment[]
): { [key: string]: Big } => {
  if (!list.length) return {};
  return list.reduce((acc, current) => {
    const { ft_token_id, amount } = current;
    return {
      ...acc,
      [ft_token_id]: acc?.[ft_token_id]
        ? acc[ft_token_id].add(amount)
        : new Big(amount),
    };
  }, {} as { [key: string]: Big });
};

const getFiatSummary = (
  list: { [key: string]: Big },
  tokens: { [key: string]: ITokenMetadata },
  prices: { [key: string]: Big }
) => {
  const listKeys = Object.keys(list);
  if (!listKeys.length) return ZERO_BIG;
  return listKeys.reduce((acc, tokenId) => {
    const amount = list[tokenId] || ZERO_BIG;
    const decimals = tokens?.[tokenId]?.decimals || DEFAULT_NEAR_DECIMALS;
    const price = prices?.[tokenId] || ZERO_BIG;
    return acc.add(amount.div(BASE ** decimals).mul(price));
  }, ZERO_BIG);
};

export function calculateTotalInvestAmount(
  donations: IDonation[],
  investments: IInvestment[],
  tokenPrices: { [key: string]: Big },
  tokens: { [key: string]: ITokenMetadata }
): { donations: Big; investments: Big } {
  const nearTokenPrice = tokenPrices?.[wrapNearId];
  const nearTokenDecimals = tokens?.[wrapNearId]?.decimals;

  if (!nearTokenPrice || !nearTokenDecimals) {
    return { donations: ZERO_BIG, investments: ZERO_BIG };
  }

  const donationsSummaryByTokens = getSummaryByTokens(donations);
  const investmentsSummaryByTokens = getSummaryByTokens(investments);

  const donationsSummaryInUSN = getFiatSummary(
    donationsSummaryByTokens,
    tokens,
    tokenPrices
  );
  const investmentsSummaryInUSN = getFiatSummary(
    investmentsSummaryByTokens,
    tokens,
    tokenPrices
  );

  return {
    donations: donationsSummaryInUSN
      // .div(nearTokenPrice)
      .mul(BASE ** nearTokenDecimals),
    investments: investmentsSummaryInUSN
      // .div(nearTokenPrice)
      .mul(BASE ** nearTokenDecimals),
  };
}

const mapParticipation: (
  participationList: IDonation[] | IInvestment[],
  type: ParticipationType
) => Participation[] = (participationList, type) => {
  return participationList.map(({ project_id, amount, ft_token_id }) => ({
    project_id,
    amount,
    type,
    tokenId: ft_token_id,
  }));
};

export function calculateTotalByAmountsByProjects(
  donations: IDonation[],
  investments: IInvestment[]
) {
  const participationList = [
    ...mapParticipation(donations, ParticipationType.DONATION),
    ...mapParticipation(investments, ParticipationType.INVESTMENT),
  ];
  return participationList.reduce(
    (
      acc,
      { project_id, amount, type }: Participation
    ): IParticipatedProjects => ({
      ...acc,
      [project_id]: {
        ...acc[project_id],
        [type]: acc?.[project_id]?.[type]
          ? acc[project_id][type].add(amount)
          : new Big(amount),
      },
    }),
    {} as IParticipatedProjects
  );
}

export const isInvestmentsAvailable = (
  project: Project | undefined,
  vestingEnabled: boolean
) => {
  return {
    donationsAvailable: getDonationsDisableAndReason(project),
    investmentsAvailable: getInvestmentIsDisableAndReason(
      project,
      vestingEnabled
    ),
  };
};

const getDonationsDisableAndReason = (project?: Project) => {
  let available = true;
  let reason = '';
  if (!project?.donations_available || !project.ft_token_id) {
    reason = i18n.t('investPanel.donationsDisabled');
    available = false;
  } else if (
    !isStageInvestmentAvailable(
      EPitchType.Intro,
      project.stage,
      project.intro_pitch
    )
  ) {
    reason = i18n.t('investPanel.donationsNotAvailable');
    available = false;
  }

  return {
    reason,
    available,
  };
};

const getInvestmentIsDisableAndReason = (
  project: Project | undefined,
  vestingEnabled: boolean
) => {
  let available = true;
  let reason = '';
  if (!project?.investments_available || !project.ft_token_id) {
    reason = i18n.t('investPanel.investDisabled');
    available = false;
  } else if (
    !!project?.investment_end_date &&
    Date.now() > project?.investment_end_date
  ) {
    reason = i18n.t('investPanel.investFinished');
    available = false;
  } else if (
    !isStageInvestmentAvailable(
      EPitchType.Investment,
      project.stage,
      project.investors_pitch
    ) ||
    !vestingEnabled
  ) {
    reason = i18n.t('investPanel.investNotAvailable');
    available = false;
  }

  return { available, reason };
};

export const isStageInvestmentAvailable = (
  minStage: EPitchType,
  stage?: EPitchType,
  pitch?: Pitch
) => {
  const now = Date.now();

  if (!stage || stage === EPitchType.Initial || !pitch) {
    return false;
  }
  if (stage === EPitchType.Update && minStage === EPitchType.Investment) {
    return false;
  }

  return pitch.starts_on < now;
};

export const getPaginationArray = (
  count: number,
  limit = DEFAULT_PAGINATION_REQUEST
) => {
  return range(Math.ceil(count / limit)).map((_, i) => ({
    fromIndex: i * limit,
    limit: limit,
  }));
};

export const isPitchStarted = (pitch?: Pitch) =>
  pitch ? !!(Date.now() > pitch.starts_on) : false;

export const getPitchEndDate = (pitch: Pitch) =>
  pitch.starts_on + minToMSec(pitch.duration);

export const findPitchByKey = (key: EPitchType) => (pitch: Pitch | PitchSub) =>
  pitch.stage === key;
