import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { IFund, IGrant } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector } from '@reduxjs/toolkit';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import {
  ERatingBy,
  ERatingToken,
  IRatingItem,
} from 'pages/rating-page/constants';
import {
  filterGrantsDates,
  filterByYear,
  filterProjectsWithoutGrants,
  FILTERS_DAYS_VALUES,
  filterByCustomDays,
} from 'pages/rating-page/utils';
import { wrapNearId } from 'services/config';
import { ZERO_BIG } from 'shared/constants';
import { getAmountFormatted, getFiatAmount } from 'shared/utils/near';
import { selectFunds } from 'store/slices/funds';
import { IGrantsState, selectGrants } from 'store/slices/grants';
import { ITokenPricesState, selectTokenPrices } from 'store/slices/tokenPrices';
import { ITokensState, selectTokens } from 'store/slices/tokens';
import { RootState } from 'store/store';

import { selectProjects } from './projects';

type RatingByToken = {
  [key in ERatingBy]: {
    [ERatingToken.USDT]: number;
    [ERatingToken.NEAR]: number;
  };
};

const getRatingByToken = (token: ERatingToken, rating: RatingByToken) => ({
  [ERatingBy.ALL]: rating[ERatingBy.ALL][token],
  [ERatingBy.YEAR]: rating[ERatingBy.YEAR][token],
  [ERatingBy.MONTH]: rating[ERatingBy.MONTH][token],
  [ERatingBy.WEEK]: rating[ERatingBy.WEEK][token],
  [ERatingBy.DAY]: rating[ERatingBy.DAY][token],
});

const getGrantsAmount = (
  grants: IGrant[],
  prices: ITokenPricesState,
  tokens: ITokensState
): { USDT: number; NEAR: number } =>
  grants.reduce(
    (acc, grant) => {
      const grantAmountFormatted = getAmountFormatted(
        grant.amount,
        tokens[grant.ft_token_id].decimals
      );
      const grantAmountInFiat = getFiatAmount(
        grantAmountFormatted,
        prices?.[grant.ft_token_id] || ZERO_BIG
      );
      const amountInNear = prices[wrapNearId]
        ? Number(grantAmountInFiat) / prices[wrapNearId].toNumber()
        : 0;

      return {
        USDT: acc.USDT + Number(grantAmountInFiat),
        NEAR: acc.NEAR + Number(amountInNear),
      };
    },
    { USDT: 0, NEAR: 0 }
  );

export const selectProjectsRating = createSelector(
  selectProjects,
  selectGrants,
  selectTokenPrices,
  selectTokens,
  (_: RootState, token: ERatingToken) => token,
  (
    projects: Project[],
    grants: IGrantsState,
    prices: ITokenPricesState,
    tokens: ITokensState,
    token
  ): IRatingItem[] =>
    projects
      .map((project) => {
        const projectGrants = grants[project.project_id];
        const grantsByYear = projectGrants.filter(
          filterGrantsDates(filterByYear)
        );
        const grantsByMonth = projectGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[30]))
        );
        const grantsByWeek = projectGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[7]))
        );
        const grantsByDay = projectGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[1]))
        );

        const rating = {
          [ERatingBy.ALL]: getGrantsAmount(projectGrants, prices, tokens),
          [ERatingBy.YEAR]: getGrantsAmount(grantsByYear, prices, tokens),
          [ERatingBy.MONTH]: getGrantsAmount(grantsByMonth, prices, tokens),
          [ERatingBy.WEEK]: getGrantsAmount(grantsByWeek, prices, tokens),
          [ERatingBy.DAY]: getGrantsAmount(grantsByDay, prices, tokens),
        };
        const { logo, banner } = getCorrectIPFSLinks({
          logo: project?.logo,
          banner: project?.banner,
        });

        return {
          name: project.name,
          logo: logo || '',
          banner: banner || '',
          id: project.project_id,
          url: project.project_url || '',
          ...getRatingByToken(token, rating),
        };
      })
      .filter(filterProjectsWithoutGrants)
);

export const selectFundsRating = createSelector(
  selectFunds,
  selectGrants,
  selectTokenPrices,
  selectTokens,
  (_: RootState, token: ERatingToken) => token,
  (
    funds: IFund[],
    grants: IGrantsState,
    prices: ITokenPricesState,
    tokens: ITokensState,
    token
  ): IRatingItem[] =>
    funds
      .map((fund) => {
        const grantsFormatted = Object.values(grants)
          .filter((grant) => grant.length)
          .flat();

        const fundGrants = grantsFormatted.filter(
          (grants) => grants.fund_id === fund.account_id
        );
        const grantsByYear = fundGrants.filter(filterGrantsDates(filterByYear));
        const grantsByMonth = fundGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[30]))
        );
        const grantsByWeek = fundGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[7]))
        );
        const grantsByDay = fundGrants.filter(
          filterGrantsDates(filterByCustomDays(FILTERS_DAYS_VALUES[1]))
        );

        const rating = {
          [ERatingBy.ALL]: getGrantsAmount(fundGrants, prices, tokens),
          [ERatingBy.YEAR]: getGrantsAmount(grantsByYear, prices, tokens),
          [ERatingBy.MONTH]: getGrantsAmount(grantsByMonth, prices, tokens),
          [ERatingBy.WEEK]: getGrantsAmount(grantsByWeek, prices, tokens),
          [ERatingBy.DAY]: getGrantsAmount(grantsByDay, prices, tokens),
        };

        return {
          name: fund.name,
          logo: fund.logo,
          id: fund.account_id,
          url: fund.web_url,
          ...getRatingByToken(token, rating),
        };
      })
      .filter(filterProjectsWithoutGrants)
);
