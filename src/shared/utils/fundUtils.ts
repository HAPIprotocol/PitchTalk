import { IFund } from '@pitchtalk/contract-api-js/dist/core';
import { ISubmissionFundModel } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';

import { IInstitutionalSubModel } from 'pages/institutional-submission/interfaces';

export const createInstitutionalProject = (
  accountId: string,
  walletError: { [p: string]: boolean },
  walletFields: { value: string }[],
  values: IInstitutionalSubModel
) => {
  const canCreateElement = Object.values(walletError).every((error) => error);
  const inputEmptyValue = walletFields.slice(1).length
    ? walletFields[walletFields.length - 1].value === ''
    : false;
  const walletsArray =
    !inputEmptyValue && canCreateElement
      ? walletFields.map((item) => item.value)
      : [];

  return {
    account_id: accountId,
    name: values.name,
    logo: values.logo,
    web_url: values.site,
    participants: walletsArray,
  };
};

export const getFundParticipant = (
  funds: ISubmissionFundModel[] | IFund[],
  accountId: string
): ISubmissionFundModel | IFund | undefined => {
  let account;
  funds.some((fund) => {
    if (fund.account_id === accountId) {
      account = fund;
      return true;
    }
    if (fund.participants.includes(accountId)) {
      account = fund;
      return true;
    }
    return false;
  });
  return account;
};

export const isAccountInFunds = (
  mainFunds: IFund[],
  subFunds: ISubmissionFundModel[],
  wallet: string
): {
  isRegistered: boolean;
  fund: IFund | ISubmissionFundModel | undefined;
} => {
  const accountSubmission = getFundParticipant(subFunds, wallet);
  const accountMain = getFundParticipant(mainFunds, wallet);

  return {
    isRegistered: !!accountSubmission || !!accountMain,
    fund: accountSubmission ? accountSubmission : accountMain,
  };
};

export const fundsToObject = (array: { value: string }[]) => {
  const result: { [key: string]: boolean } = {};

  array.forEach((value, index) => {
    result[`key_${index}`] = true;
  });

  return result;
};
