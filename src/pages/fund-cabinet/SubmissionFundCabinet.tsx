import { IFund } from '@pitchtalk/contract-api-js/dist/core';
import { ISubmissionFundModel } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { getInstitutionalSubValidation } from 'shared/components/ErrorHandler/utils';
import { FundForm } from 'shared/components/fund-form/FundForm';
import { EMPTY_STRING, SUB_FUND_INITIAL } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  createInstitutionalProject,
  fundsToObject,
} from 'shared/utils/fundUtils';
import { selectFund } from 'store/slices/funds';
import { selectSubFundById } from 'store/slices/submission';
import { selectAccountId } from 'store/slices/user';

import { IInstitutionalSubModel } from '../institutional-submission/interfaces';

const INITIAL_FUND = {
  account_id: EMPTY_STRING,
  name: EMPTY_STRING,
  logo: EMPTY_STRING,
  web_url: EMPTY_STRING,
  participants: [],
};

const SubmissionFundCabinet: React.FC = () => {
  const { subServiceActions } = usePitchTalkServiceContext();
  const navigate = useNavigate();

  const accountId = useAppSelector(selectAccountId);
  const mainFund = useAppSelector(selectFund);
  const subFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );

  const [fund, setFund] = useState<IFund | ISubmissionFundModel>(INITIAL_FUND);
  const [walletError, setWalletError] = useState<{ [key: string]: boolean }>({
    key_0: true,
  });
  const [walletFields, setWalletField] = useState<{ value: string }[] | []>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    values,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    handleBlur,
    isValid,
    handleSubmit,
    validateForm,
    setErrors,
    setSubmitting,
    isSubmitting,
    setValues,
    ...formik
  } = useFormik<IInstitutionalSubModel>({
    initialValues: SUB_FUND_INITIAL,
    validateOnBlur: true,
    validationSchema: () => getInstitutionalSubValidation(),
    onSubmit: async () => {
      try {
        const submitData = createInstitutionalProject(
          fund.account_id,
          walletError,
          walletFields,
          values
        );

        if (!subFund) {
          setIsSubmitted(true);
          await subServiceActions.registerSubmissionFund(submitData, true);
          navigate(APP_ROUTES.PROFILE);
          return;
        }
        setIsSubmitted(true);
        await subServiceActions.updateSubmissionFund(submitData);
        navigate(APP_ROUTES.PROFILE);
        setIsSubmitted(false);
      } catch (e) {
        console.warn(e);
      }
    },
  });

  useEffect(() => {
    if (subFund) {
      setFund(subFund);
    } else {
      setFund(mainFund);
    }
  }, [subFund, mainFund]);

  useEffect(() => {
    if (!fund) return;
    setValues({
      ...values,
      name: fund.name,
      logo: fund.logo,
      wallet: fund.name,
      site: fund.web_url,
      participants: fund.participants,
    });
    const wallets = fund.participants
      ? fund.participants.map((participant) => ({
          value: participant,
        }))
      : [];
    setWalletField(wallets);
    setWalletError(fundsToObject(wallets));
  }, [fund]);

  return (
    <FundForm
      formik={{
        values,
        errors,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        touched,
        isValid,
        handleSubmit,
        validateForm,
        setErrors,
        setSubmitting,
        isSubmitting,
        setValues,
        ...formik,
      }}
      walletError={walletError}
      walletFields={walletFields}
      setWalletError={setWalletError}
      setWalletField={setWalletField}
      isSubmitted={isSubmitted}
      fund={fund}
    />
  );
};

export default SubmissionFundCabinet;
