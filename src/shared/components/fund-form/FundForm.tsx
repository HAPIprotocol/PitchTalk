import {
  EActionStatus,
  ISubmissionFundModel,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import PreviewLogo from 'pages/institutional-submission/components/preview-logo/Previewlogo';
import WalletsWrapper from 'pages/institutional-submission/components/wallets-wrapper';
import {
  IInstitutionalSubModel,
  InputFieldsName,
} from 'pages/institutional-submission/interfaces';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';

import { useStyles } from './styles';
import { selectFunds } from '../../../store/slices/funds';
import { selectSubmissionFunds } from '../../../store/slices/submission';
import { EMPTY_STRING } from '../../constants';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useFundsUpdate } from '../../hooks/useFundsUpdate';
import { useSubFund } from '../../hooks/useFundWallet';
import { EModals } from '../../interfaces';
import { useModalContext } from '../../providers/ModalsProvider';
import { classNames } from '../../styles/theme';
import { getInstitutionalSubErrors } from '../../utils/inputUtils';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { Loader } from '../loader/Loader';
import { Translate } from '../translate/Translate';

interface IFundFormModel {
  formik: FormikProps<IInstitutionalSubModel>;
  walletError: { [p: string]: boolean };
  setWalletError: Dispatch<SetStateAction<{ [p: string]: boolean }>>;
  walletFields: [] | { value: string }[];
  setWalletField: Dispatch<SetStateAction<[] | { value: string }[]>>;
  fund?: ISubmissionFundModel;
  isSubmitted?: boolean;
}

export const FundForm: React.FC<IFundFormModel> = ({
  formik: {
    values,
    errors,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
    handleSubmit,
    isValid,
  },
  walletError,
  setWalletError,
  walletFields,
  setWalletField,
  fund,
  isSubmitted,
}) => {
  const classes = useStyles();

  const funds = useAppSelector(selectFunds);
  const subFunds = useAppSelector(selectSubmissionFunds);

  const { showModal } = useModalContext();
  const {
    addInputField,
    handleWalletChange,
    removeInputFields,
    isAccountRegistered,
  } = useSubFund({
    setWalletError,
    walletFields,
    setWalletField,
    walletError,
    funds,
    subFunds,
  });

  const [previewImage, setPreviewImage] = useState<string>(EMPTY_STRING);

  const { logo } = getCorrectIPFSLinks({ logo: fund?.logo });

  const errorClasses = getInstitutionalSubErrors(errors, touched, classes);

  const isWaitApprove =
    fund &&
    (fund?.status === EActionStatus.New ||
      fund?.status === EActionStatus.Updated);
  const isFailed = fund && fund?.status === EActionStatus.Failed;

  const classesScope = {
    name: `${classes.formInput}
        ${errorClasses.name}`,
    site: `${classes.formInput}
        ${errorClasses.site}`,
    logo: `${classes.formInput}
        ${errorClasses.logo}`,
    wallet: `${classes.formInput}
        ${errorClasses.wallet}`,
  };

  const openUploadModal = () =>
    showModal(EModals.UPLOAD_LOGO_MODAL, {
      submissionName: values.name,
      projectPicture: {
        logo: values.logo,
      },
      submitPicture: ({ projectLogoCid }) => {
        setPreviewImage(projectLogoCid!);
        setFieldValue(InputFieldsName.LOGO, projectLogoCid);
      },
    });

  useEffect(() => {
    if (!logo) return;
    setPreviewImage(logo);
  }, [logo]);

  useFundsUpdate();

  return (
    <div className={classes.page}>
      {isSubmitted && (
        <div className={classes.blurOverlay}>
          <Loader />
        </div>
      )}
      <div className={classes.container}>
        <span className={classes.formGroupTitle}>
          <Translate value="institutionalSubmission.generalInformation" />
        </span>
        <div className={classes.processingBox}>
          {isWaitApprove && (
            <p className={classes.approveText}>
              <Translate value="institutionalSubmission.waitApprove" />
            </p>
          )}
          {isFailed && (
            <p className={classes.declineText}>
              <Translate value="institutionalSubmission.approveDeclined" />
            </p>
          )}
        </div>
        <div className={classes.inputInformationBox}>
          <div className={classes.generalInputs}>
            <div className={classes.generalColumn}>
              <div className={`${classes.formInputBox}`}>
                <label className={classes.formInputLabel}>
                  <Translate value="institutionalSubmission.fundName" />
                </label>
                <input
                  className={classesScope.name}
                  placeholder={t('institutionalSubmission.typeFundName')}
                  value={values.name}
                  name={InputFieldsName.NAME}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldTouched(InputFieldsName.NAME, true);
                    setFieldValue(InputFieldsName.NAME, e.target.value);
                  }}
                  type="text"
                />
                {!!errors?.name && (isSubmitting || !!touched.name) && (
                  <ErrorHandler error={errors?.name} />
                )}
              </div>
              <WalletsWrapper
                isAccountRegistered={isAccountRegistered}
                walletFields={walletFields}
                walletError={walletError}
                handleWalletChange={handleWalletChange}
                removeInputFields={removeInputFields}
              />
              <div className={classes.flexRow}>
                <button
                  type="button"
                  className={classes.addFieldBtn}
                  onClick={() => addInputField()}
                >
                  <Translate value="institutionalSubmission.addAccount" />
                </button>
              </div>
            </div>
            <div className={classes.generalColumn}>
              <div className={classes.projectUrlBox}>
                <label className={classes.formInputLabel}>
                  <Translate value="institutionalSubmission.fundUrl" />
                </label>
                <input
                  className={classesScope.site}
                  placeholder={t('institutionalSubmission.typeFundUrl')}
                  value={values.site}
                  name={InputFieldsName.SITE}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldTouched(InputFieldsName.SITE, true);
                    setFieldValue(InputFieldsName.SITE, e.target.value.trim());
                  }}
                  type="text"
                />
                {errors?.site && (isSubmitting || touched?.site) && (
                  <ErrorHandler error={errors?.site} />
                )}
              </div>
              <div
                className={`${classes.formInputBox}`}
                style={{ marginTop: '15px' }}
              >
                <label className={classes.formInputLabel}>
                  <Translate value="institutionalSubmission.uploadImagesTitle" />
                </label>
                <div className={classes.formInputFlex}>
                  {!previewImage ? (
                    <button
                      className={classes.formUploadBtn}
                      onClick={() => openUploadModal()}
                    >
                      <Translate value="institutionalSubmission.uploadImages" />
                    </button>
                  ) : (
                    <>
                      <button
                        className={classes.formUploadBtn}
                        onClick={() => openUploadModal()}
                      >
                        <Translate value="institutionalSubmission.uploadLogo" />
                      </button>
                    </>
                  )}
                </div>
                {errors?.logo && <ErrorHandler error={errors?.logo} />}
              </div>
            </div>
          </div>
          <PreviewLogo image={previewImage} />
        </div>
      </div>
      <button
        disabled={!isValid || isWaitApprove}
        className={classNames(classes.formBtn, classes.payBtn)}
        onClick={() => {
          handleSubmit();
        }}
      >
        <Translate value="controls.submit" />
      </button>
      {!isValid && (
        <span className={classes.formInvalid}>
          <Translate value="institutionalSubmission.formInvalid" />
        </span>
      )}
    </div>
  );
};
