import Big from 'big.js';
import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent } from 'react';
import { Styles } from 'react-jss';

import { IParticipantFormModel } from 'pages/participant-form/interfaces';
import i18n from 'services/translation';
import {
  EMPTY_STRING,
  MAX_AMOUNT_PRECISION,
  PRECISION_BALANCE,
} from 'shared/constants';

import { roundToLow } from './near';
import InstitutionalSubmission from '../../pages/institutional-submission/InstitutionalSubmission';
import { IInstitutionalSubModel } from '../../pages/institutional-submission/interfaces';

const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$');

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const enforcer = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  const nextUserInput = event.target.value.replace(/,/g, '.');
  if (nextUserInput[0] === '.' || nextUserInput[0] === ',') {
    setValue(`0${nextUserInput}`);
    return;
  }
  if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
    setValue(nextUserInput);
  }
};

export interface IAmountInputError {
  valid: boolean;
  reason: string | null;
  isWarning?: boolean;
}

const validNumberError: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.validNumberError')}`,
};
const smallerThanZeroError: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.smallerThanZeroError')}`,
};
const smallerThanMinValueError: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.smallerThanMinValueError')}`,
};
const greaterThanMaxValueError: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.greaterThanMaxValueError')}`,
};
const greaterThanAvailableAmount: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.greaterThanAvailableAmount')}`,
};
const maxInvestedError: IAmountInputError = {
  valid: false,
  reason: `${i18n.t('inputErrors.maxInvested')}`,
};
const totalInvestmentsLimit = (amount: number): IAmountInputError => ({
  valid: true,
  reason: `${i18n.t('inputErrors.totalInvestmentsLimit', { amount })}`,
  isWarning: true,
});

export interface IAmountValidateArgs {
  value: string;
  availableBalance?: string;
  min?: number;
  max?: number;
  invested?: number;
  investmentsLeft?: number;
}

export const validateValue = ({
  value,
  availableBalance,
  min,
  max,
  invested,
  investmentsLeft,
}: IAmountValidateArgs) => {
  if (!value || !availableBalance) return { valid: false, reason: null };

  const numericBigValue = new Big(value).toNumber();
  const numericAvailableBalance = availableBalance
    ? roundToLow(+availableBalance, MAX_AMOUNT_PRECISION)
    : 0;

  if (max && invested && (invested === max || invested + numericBigValue > max))
    return maxInvestedError;
  if (isNaN(numericBigValue)) return validNumberError;
  if (numericBigValue <= 0) return smallerThanZeroError;
  if (numericBigValue > numericAvailableBalance)
    return greaterThanAvailableAmount;
  if (min && numericBigValue < min) return smallerThanMinValueError;
  if (max && numericBigValue > max) return greaterThanMaxValueError;
  if (investmentsLeft && (invested ?? 0) + numericBigValue > investmentsLeft)
    return totalInvestmentsLimit(
      roundToLow(investmentsLeft, PRECISION_BALANCE)
    );

  return { valid: true, reason: null };
};

export const getErrors = (
  errors: FormikErrors<IParticipantFormModel>,
  touched: FormikTouched<IParticipantFormModel>,
  classes: Styles<string>
) => {
  return {
    contact_information: {
      telegram:
        errors?.contact_information?.telegram &&
        touched?.contact_information?.telegram
          ? classes.errorInput
          : '',
      email:
        errors?.contact_information?.email &&
        touched?.contact_information?.email
          ? classes.errorInput
          : '',
    },
    general_information: {
      project_name:
        errors?.general_information?.project_name &&
        touched?.general_information?.project_name
          ? classes.errorInput
          : '',
      project_banner:
        errors?.general_information?.project_banner &&
        touched?.general_information?.project_banner
          ? classes.errorInput
          : '',
      project_logo:
        errors?.general_information?.project_logo &&
        touched?.general_information?.project_logo
          ? classes.errorInput
          : '',
      project_url:
        errors?.general_information?.project_url &&
        touched?.general_information?.project_url
          ? classes.errorInput
          : '',
      project_description:
        errors?.general_information?.project_description &&
        touched?.general_information?.project_description
          ? classes.errorInput
          : '',
    },
  };
};

export const getInstitutionalSubErrors = (
  errors: FormikErrors<IInstitutionalSubModel>,
  touched: FormikTouched<IInstitutionalSubModel>,
  classes: Styles<string>
) => {
  return {
    name: errors.name && touched.name ? classes.errorInput : EMPTY_STRING,
    site: errors.site && touched.site ? classes.errorInput : EMPTY_STRING,
    logo: errors.logo && touched.logo ? classes.errorInput : EMPTY_STRING,
    wallet: errors.wallet && touched.wallet ? classes.errorInput : EMPTY_STRING,
  };
};
