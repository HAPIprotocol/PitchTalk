import { EPitchTalkContractChangeMethods } from '@pitchtalk/contract-api-js/dist/core';
import { ESubServiceChangeMethods } from '@pitchtalk/contract-api-js/dist/SubmissionService/methods';

export const METHODS: {
  [key in
    | (
        | keyof typeof EPitchTalkContractChangeMethods
        | keyof typeof ESubServiceChangeMethods
      )
    | 'FT_TRANSFER_CALL'
    | 'CONFIRM'
    | 'DONATE'
    | 'GRANT'
    | 'INVEST'
    | 'CLAIM']: string;
} = {
  ...EPitchTalkContractChangeMethods,
  ...ESubServiceChangeMethods,
  DONATE: 'donate',
  GRANT: 'grant',
  INVEST: 'invest',
  CLAIM: 'claim',
  FT_TRANSFER_CALL: 'ft_transfer_call',
  // Confirm method using for 2FA
  CONFIRM: 'confirm',
};

export enum ToastType {
  Success,
  Error,
  Info,
}

export enum TransactionType {
  None = 0,
  Contribution,
  Donate,
  Invest,
  Grant,
  Claim,
  Like,
  Sub,
}

export enum StatusType {
  None,
  SuccessValue,
  Failure,
}

export enum EContractType {
  MAIN,
  SUB,
}

export const MAIN_CONTRACT_METHODS = [
  METHODS.DONATE,
  METHODS.INVEST,
  METHODS.GRANT,
  METHODS.CLAIM,
  METHODS.LIKE,
  METHODS.CONFIRM,
  METHODS.FT_TRANSFER_CALL,
  METHODS.STORAGE_DEPOSIT,
  METHODS.VOTE_PROJECT_EVENT,
];
