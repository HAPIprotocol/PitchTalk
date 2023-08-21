import { ZERO_AMOUNT } from '@pitchtalk/contract-api-js/dist/pitchtalk';
import Big from 'big.js';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import WARN_ICON from 'assets/images/icons/warn.svg';
import { Loader } from 'pages/project-cabinet/components/Loader';
import { useFungibleTokensContext } from 'providers/FTProvider';
import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { Link, useNavigate } from 'services/router';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { getParticipantFormValidation } from 'shared/components/ErrorHandler/utils';
import { NEAR_TOKEN_ID, ONE_SECOND_IN_MS } from 'shared/constants';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { getAmountFormatted } from 'shared/utils/near';
import { selectProjectsName } from 'store/selectors/projects';
import {
  selectSubmissionFormData,
  setSubmissionFormData,
} from 'store/slices/submissionForm';
import {
  selectAccountId,
  selectOffChainUserData,
  setUserProject,
} from 'store/slices/user';
import { newProjectSubmission } from 'store/thunks/user/project';

import { ContactInformation } from './components/contact-information/ContactInformation';
import { GeneralInformation } from './components/general-information/GeneralInformation';
import { Social } from './components/social/Social';
import { TagsInformation } from './components/tags-information/TagsInformation';
import { Tooltips } from './components/tooltips/Tooltips';
import { initialValues } from './constants';
import { createSubmissionProject } from './helpers';
import { IParticipantFormModel } from './interfaces';
import { useStyles } from './styles';
import { usePitchTalkServiceContext } from '../../providers/PitchTalkServiceProvider';
import { wrapNearId } from '../../services/config';
import { Translate } from '../../shared/components/translate/Translate';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux-hooks';
import { getErrors } from '../../shared/utils/inputUtils';
import {
  selectSubmissionMetadata,
  selectSubmissionProjectsName,
} from '../../store/slices/submission';
import { selectTokens } from '../../store/slices/tokens';

const ParticipantForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAvailableTokens, setIsAvailableTokens] = useState<boolean>(false);
  const { subServiceActions, submissionService, pitchTalkService } =
    usePitchTalkServiceContext();
  const { getBalance } = useFungibleTokensContext();
  const { isSignedIn, openModal: requestSignIn } = useWalletSelector();
  const { showModal } = useModalContext();
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectSubmissionFormData);
  const accountId = useAppSelector(selectAccountId);
  const tokenMetadata = useAppSelector(selectTokens);
  const submissionMetadata = useAppSelector(selectSubmissionMetadata);
  const offChainUser = useAppSelector(selectOffChainUserData);
  const [isLoading, setIsLoading] = useState(false);
  const currentToken = submissionMetadata
    ? tokenMetadata[submissionMetadata.fee_token]
    : null;
  const tokenAmount = getAmountFormatted(
    submissionMetadata?.join_fee || 0,
    currentToken?.decimals
  );
  const projectsNames = useAppSelector(selectProjectsName);
  const subProjectsNames = useAppSelector(selectSubmissionProjectsName);

  const {
    values,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    validateForm,
    setErrors,
    ...formik
  } = useFormik<IParticipantFormModel>({
    initialValues,
    validateOnBlur: true,
    validationSchema: () =>
      getParticipantFormValidation([...projectsNames, ...subProjectsNames]),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        dispatch(setSubmissionFormData(values));
        const { contact_links, project } = createSubmissionProject(values);
        if (isSignedIn()) {
          const res = await subServiceActions.registerProjectAndAccount(
            project,
            contact_links
          );
          setTimeout(async () => {
            if (!res) return;
            const userProject = await submissionService?.getProject(accountId);
            dispatch(setUserProject(userProject || null));
            setIsLoading(false);
            navigate(APP_ROUTES.PROJECT_CABINET);
          });
        } else if (offChainUser) {
          dispatch(newProjectSubmission({ ...project, contact_links }))
            .then(() => {
              setIsLoading(false);
              navigate(APP_ROUTES.PROJECT_CABINET);
            })
            .catch(console.error);
        } else {
          showModal(EModals.AUTH_MODAL, { signInWithOnChain: requestSignIn });
        }
      } catch (e) {
        console.warn(e);
      }
    },
  });

  useEffect(() => {
    if (Object.values(formData).length) {
      formik.setValues(formData);
    } else {
      formik.setValues(initialValues);
    }
  }, [formData]);

  useEffect(() => {
    let updateInterval: NodeJS.Timer | null = null;
    const fetchUserBalance = async () => {
      if (!pitchTalkService) throw new Error('Cannot get account data');
      if (isSignedIn()) {
        updateInterval = setInterval(async () => {
          if (submissionMetadata?.fee_token === wrapNearId) {
            const accountData = await pitchTalkService.getAccountData(
              accountId
            );
            const balance = getAmountFormatted(
              accountData?.amount || ZERO_AMOUNT
            );
            setIsAvailableTokens(Big(balance).cmp(tokenAmount) === 1);
          } else {
            const { balance } = await getBalance(
              submissionMetadata?.fee_token || ZERO_AMOUNT
            );
            setIsAvailableTokens(Big(balance).cmp(tokenAmount) === 1);
          }
        }, 10 * ONE_SECOND_IN_MS);
      } else {
        setIsAvailableTokens(false);
      }
    };
    fetchUserBalance();
    return () => {
      updateInterval && clearInterval(updateInterval);
    };
  }, [isSignedIn, accountId, getBalance]);

  const errorClasses = getErrors(errors, touched, classes);
  const btnClasses = `${classes.formBtn} ${classes.payBtn}`;

  const isUserHaveNoTokens = isSignedIn() && !isAvailableTokens;

  useScrollToTop();

  useEffect(() => {
    if (!accountId && !offChainUser) {
      showModal(EModals.AUTH_MODAL, { signInWithOnChain: requestSignIn });
    }
  }, [accountId, offChainUser]);

  return (
    <div className={classes.container}>
      {isLoading && <Loader />}
      <div className={classes.headWrapper}>
        <div className={classes.titleWrapper}>
          <span className={classes.title}>
            <Translate value="participantForm.title" />
          </span>
          <Link
            className={classes.howToForProjects}
            to={APP_ROUTES.HOW_TO_PROJECTS}
          >
            <Translate value="participantForm.howToForProjects" />
          </Link>
        </div>
        <div className={classes.description}>
          <span>
            <Translate value="participantForm.firstDescription" />
          </span>
          <span>
            <Translate value="participantForm.secondDescription" />
          </span>
        </div>
      </div>
      <div className={classes.formWrapper}>
        <h2 className={classes.stepTitle}>
          <span>
            <Trans i18nKey="participantForm.step" values={{ step: 1 }} />
          </span>
        </h2>
        <div className={classes.formGroup}>
          <ContactInformation
            errorClasses={errorClasses}
            formik={{
              values,
              errors,
              setFieldValue,
              setFieldTouched,
              handleBlur,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              validateForm,
              setErrors,
              ...formik,
            }}
          />
        </div>
        <h2 className={classes.stepTitle}>
          <span>
            <Trans i18nKey="participantForm.step" values={{ step: 2 }} />
          </span>
        </h2>
        <div className={classes.formGroup}>
          <GeneralInformation
            errorClasses={errorClasses}
            formik={{
              values,
              errors,
              setFieldValue,
              handleBlur,
              setFieldTouched,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              validateForm,
              setErrors,
              ...formik,
            }}
          />
          <Social
            formik={{
              values,
              errors,
              setFieldValue,
              handleBlur,
              setFieldTouched,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              validateForm,
              setErrors,
              ...formik,
            }}
          />
          <TagsInformation
            formik={{
              values,
              errors,
              setFieldValue,
              handleBlur,
              setFieldTouched,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              validateForm,
              setErrors,
              ...formik,
            }}
          />
        </div>
        <h2 className={classes.stepTitle}>
          <span>
            <Trans i18nKey="participantForm.step" values={{ step: 3 }} />
          </span>
        </h2>
        <div className={classes.formGroup}>
          {isSignedIn() && (
            <span className={classes.payment}>
              <Translate value="participantForm.payment" />
            </span>
          )}
          <div className={classes.paymantWrapper}>
            <div>
              {isSignedIn() && (
                <span className={classes.totalFee}>
                  <Trans
                    i18nKey="participantForm.totalFee"
                    values={{
                      totalFee:
                        tokenAmount +
                        ` ${
                          submissionMetadata?.fee_token === wrapNearId
                            ? NEAR_TOKEN_ID
                            : currentToken?.symbol
                        }`,
                    }}
                  />
                </span>
              )}
              <button
                disabled={!isValid || !isChecked || isUserHaveNoTokens}
                className={btnClasses}
                onClick={() => handleSubmit()}
              >
                {isSignedIn() ? (
                  <Translate value="participantForm.pay" />
                ) : (
                  <Translate value="controls.submit" />
                )}
              </button>
              {isUserHaveNoTokens ? (
                <span className={classes.formInvalid}>
                  <Translate value={'participantForm.notEnoughTokens'} />
                </span>
              ) : (
                !isValid &&
                isChecked && (
                  <span className={classes.formInvalid}>
                    <Translate value="participantForm.formInvalid" />
                  </span>
                )
              )}
              <div className={classes.formAgree}>
                <Checkbox
                  checked={isChecked}
                  onChange={async () => {
                    const validate = await validateForm(values);
                    setErrors(validate);
                    setIsChecked(!isChecked);
                  }}
                />
                {/*TODO: add link */}
                <div className={classes.textAgree}>
                  <Translate value="participantForm.agreeWith" />
                  <Link to="#">
                    <Translate value="participantForm.termsAndConditions" />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.disclamer}>
                <img src={WARN_ICON} alt={t('participantForm.warn')} />
                <Translate value="participantForm.disclaimer" />
              </div>
              <span className={classes.disclamerDescription}>
                <Translate value="participantForm.disclaimerDescription" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Tooltips />
    </div>
  );
};

export default ParticipantForm;
