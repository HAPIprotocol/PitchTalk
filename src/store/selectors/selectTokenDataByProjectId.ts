import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector } from '@reduxjs/toolkit';

import { DEFAULT_TOKEN, ZERO_BIG } from 'shared/constants';
import { ITokensState, selectTokens } from 'store/slices/tokens';
import { RootState } from 'store/store';

import { ITokenPricesState, selectTokenPrices } from './../slices/tokenPrices';
import { selectProjects } from './projects';

export const selectTokenDataByProjectId = createSelector(
  [
    selectTokens,
    selectTokenPrices,
    selectProjects,
    (_: RootState, projectId?: number) => projectId,
  ],
  (
    tokens: ITokensState,
    prices: ITokenPricesState,
    projects: Project[],
    projectId?: number
  ) => {
    const project = projects.find((p) => p.project_id === projectId);
    if (!projectId || !project) return DEFAULT_TOKEN;
    const { ft_token_id: tokenId } = project;
    return {
      icon: tokens[tokenId].icon,
      price: prices[tokenId] || ZERO_BIG,
      symbol: tokens[tokenId].symbol,
      decimals: tokens[tokenId].decimals,
    };
  }
);
