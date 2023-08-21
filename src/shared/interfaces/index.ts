import { Pitch, Project } from '@pitchtalk/contract-api-js';
import {
  IDonation,
  IInvestment,
} from '@pitchtalk/contract-api-js/dist/pitchtalk';
import Big from 'big.js';

import { ITranslationKeys } from 'services/translation';

export interface IToggleButtonConfig<T> {
  label: ITranslationKeys;
  value: T;
}

type Only<T, U> = { [P in keyof T]: T[P] } & Omit<
  { [P in keyof U]?: never },
  keyof T
>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type PitchWithProjectData = Pitch & {
  project: Project;
};

export enum EClosestItemStatus {
  CLOSEST_PAST = 'CLOSEST_PAST',
  LIVE = 'LIVE',
  CLOSEST_UPCOMING = 'CLOSEST_UPCOMING',
  EMPTY = 'EMPTY',
}

export interface IClosestPitch {
  pitch: PitchWithProjectData;
  status: EClosestItemStatus;
}

export interface IDonateInvestMap<T> {
  donations: T;
  investments: T;
}
export interface IUserInvestments {
  donationList: IDonation[];
  investmentsList: IInvestment[];
  totalSpent: IDonateInvestMap<Big>;
  totalSpentByProjects: IParticipatedProjects;
}

export enum ParticipationType {
  DONATION = 'donated',
  INVESTMENT = 'invested',
}

export type Participation = {
  project_id: number;
  amount: string;
  type: ParticipationType;
  tokenId: string;
};
export interface IParticipatedProjects {
  [key: string]: {
    [ParticipationType.DONATION]: Big;
    [ParticipationType.INVESTMENT]: Big;
  };
}

export type ParticipatedProject = Project & {
  donatedByUser: Big;
  investedByUser: Big;
};

export enum EInvestmentsView {
  TOTAL = 'TOTAL',
  BY_USER = 'BY_USER',
}

export enum EPitchesType {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
}

export enum EProjectSettingsState {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

export enum EEventsByTime {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
  ALL_EVENTS = 'ALL_EVENTS',
}

export interface ITransaction {
  receiverId: string;
  functionCalls: {
    gas?: string;
    amount?: string;
    methodName: string;
    args?: Record<string, unknown>;
  }[];
}

export enum EClaimAndVestingView {
  CLAIM = 'Claim',
  VESTING = 'Vesting Info',
}

export * from './modals';

export type Question = {
  question: string;
  url: string;
  answer: Promise<string>;
  answerImages: { url: string; position: string }[];
};

export type TokenData = {
  decimals: number;
  symbol: string;
  price: Big;
  icon: string;
};

export interface IErrorModel {
  contact_information: {
    telegram: string;
    email: string;
  };
  general_information: {
    project_name: string;
    project_banner: string;
    project_description: string;
    project_url: string;
    project_logo: string;
  };
  social_media: {
    telegram: string | null | undefined;
    medium: string | null | undefined;
    discord: string | null | undefined;
    twitter: string | null | undefined;
  };
  // acceptTerms: boolean | undefined;
}

export interface IErrorInstitutionalModel {
  name: string;
  logo: string;
  site: string;
  wallet: string | undefined;
}

export enum EPreviewType {
  EVENT = 'EVENT',
  PITCH = 'PITCH',
}
