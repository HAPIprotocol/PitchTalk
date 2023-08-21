import { useFormik } from 'formik';
import { useState } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { useWalletSelector } from 'providers/WalletProvider';
import { useNavigate } from 'services/router';
import { getInstitutionalSubValidation } from 'shared/components/ErrorHandler/utils';
import { FundForm } from 'shared/components/fund-form/FundForm';
import { SUB_FUND_INITIAL } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { createInstitutionalProject } from 'shared/utils/fundUtils';
import { selectSubFundById } from 'store/slices/submission';
import { selectAccountId } from 'store/slices/user';

import { IInstitutionalSubModel } from './interfaces';
import { APP_ROUTES } from '../../routes';

const InstitutionalSubmission = () => {
  const { subServiceActions } = usePitchTalkServiceContext();
  const navigate = useNavigate();
  const { isSignedIn, openModal: requestSignIn } = useWalletSelector();
  const accountId = useAppSelector(selectAccountId);
  const subFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );
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
    ...formik
  } = useFormik<IInstitutionalSubModel>({
    initialValues: SUB_FUND_INITIAL,
    validateOnBlur: true,
    validationSchema: () => getInstitutionalSubValidation(),
    onSubmit: async () => {
      try {
        if (!isSignedIn()) {
          requestSignIn();
          return;
        }
        const submitData = createInstitutionalProject(
          accountId,
          walletError,
          walletFields,
          values
        );
        setIsSubmitted(true);
        await subServiceActions.registerSubmissionFund(submitData);
        navigate(APP_ROUTES.PROFILE);
        setIsSubmitted(false);
      } catch (e) {
        console.warn(e);
      }
    },
  });

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
        ...formik,
      }}
      walletError={walletError}
      walletFields={walletFields}
      setWalletError={setWalletError}
      setWalletField={setWalletField}
      fund={subFund}
      isSubmitted={isSubmitted}
    />
  );
};

export default InstitutionalSubmission;
