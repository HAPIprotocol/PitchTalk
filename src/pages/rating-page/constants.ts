import { IToggleButtonConfig } from 'shared/interfaces';

export enum ERatingTableType {
  PROJECTS = 'PROJECTS',
  FUNDS = 'FUNDS',
}

export enum ERatingBy {
  ALL = 'ALL',
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  DAY = 'DAY',
}
export enum ERatingToken {
  USDT = 'USDT',
  NEAR = 'NEAR',
}

export interface IRatingItem {
  id: number | string;
  logo: string;
  banner?: string;
  name: string;
  url: string;
  [ERatingBy.ALL]: number;
  [ERatingBy.YEAR]: number;
  [ERatingBy.MONTH]: number;
  [ERatingBy.WEEK]: number;
  [ERatingBy.DAY]: number;
}

export const tokensViewToggleConfig: IToggleButtonConfig<ERatingToken>[] = [
  {
    label: 'ratings.token.USDT',
    value: ERatingToken.USDT,
  },
  {
    label: 'ratings.token.NEAR',
    value: ERatingToken.NEAR,
  },
];

export const timeViewToggleConfig: IToggleButtonConfig<ERatingBy>[] = [
  {
    label: 'ratings.time.ALL',
    value: ERatingBy.ALL,
  },
  {
    label: 'ratings.time.MONTH',
    value: ERatingBy.MONTH,
  },
  {
    label: 'ratings.time.WEEK',
    value: ERatingBy.WEEK,
  },
  {
    label: 'ratings.time.DAY',
    value: ERatingBy.DAY,
  },
];
