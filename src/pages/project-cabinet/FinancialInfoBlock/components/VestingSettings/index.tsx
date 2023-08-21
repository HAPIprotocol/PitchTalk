import { Vesting } from '@pitchtalk/contract-api-js/dist/core';
import {
  BenefitPlanTypes,
  Project,
} from '@pitchtalk/contract-api-js/dist/core';
import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import {
  EActionStatus,
  IProjectRes,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import { EVestingSettingsTooltips } from 'pages/project-cabinet/constants';
import { FinancialInfoBlockState } from 'pages/project-cabinet/FinancialInfoBlock/helpers';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { ITranslationKeys } from 'services/translation';
import { DateTimePicker } from 'shared/components/DateTimePicker/DateTimePicker';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { VestingTypeSelect } from 'shared/components/select/VestingTypeSelect/VestingTypeSelect';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectTokenData } from 'store/selectors/selectTokenData';

import { useStyles } from './styles';
import { useProcessing } from '../../useProcessing';
import { NonLinearStages } from '../NonlinearStages';
type VestingSettingsProps = {
  project: Project;
  userProject: IProjectRes;
  vesting: Vesting | null;
  formik: FormikProps<FinancialInfoBlockState>;
  isEdit: boolean;
  customTokenMeta?: ITokenMetadata;
};

export const VestingSettings: React.FC<VestingSettingsProps> = ({
  formik: { values, errors, setFieldValue, ...formik },
  isEdit,
  project,
  userProject,
  vesting,
  customTokenMeta,
}) => {
  const classes = useStyles();
  const vestingTokenMeta = useAppSelector((s) =>
    selectTokenData(s, values.vesting.ft_token_id)
  );
  const projectTokenMeta = useAppSelector((s) =>
    selectTokenData(s, values.finData.ft_token_id)
  );

  const inputWrapperClasses = (error: string | null, ...others: string[]) =>
    classNames(
      classes.inputControl,
      ...others,
      error && classes.errorContainer
    );

  const inputClasses = (error: string | null, infoLabel: boolean) => ({
    inputExtraClass: classes.amountInput,
    containerExtraClass: classNames(
      classes.inputContainer,
      error && classes.errorBorder,
      infoLabel && getInputLabelStyles('border')
    ),
    errorExtraClass: classes.error,
    infoLabelExtraClass: classNames(infoLabel && getInputLabelStyles('color')),
  });

  const {
    isVestingTypeProcessing,
    isVestingPriceProcessing,
    isInvestMinProcessing,
    isInvestMaxProcessing,
    isInvestTotalLimitProcessing,
    isVestingStartProcessing,
    isLinVestingEndProcessing,
    isInvestEndDateProcessing,
  } = useProcessing(project, vesting, userProject);

  const isUpdated =
    userProject.vesting_and_investment?.status === EActionStatus.New ||
    userProject.vesting_and_investment?.status === EActionStatus.Updated;
  const isFailed =
    userProject.vesting_and_investment?.status === EActionStatus.Failed;

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  return (
    <div className={classes.container}>
      <div className={classes.commonSettings}>
        <div className={classes.inputControl}>
          <label>
            <Translate value="projectCabinetPage.vestingType" />
            <QuestionIcon data-tooltip-id={EVestingSettingsTooltips.TYPE} />
          </label>
          <VestingTypeSelect
            selectedType={values.vesting.vestingType}
            selectType={(planType) =>
              setFieldValue('vesting.vestingType', planType, false)
            }
            readOnly={!isEdit}
            infoLabel={
              isVestingTypeProcessing ? getInputInfoLabel() : EMPTY_STRING
            }
            infoLabelExtraClass={getInputLabelStyles('color')}
            selectExtraClass={
              isVestingTypeProcessing
                ? getInputLabelStyles('border')
                : EMPTY_STRING
            }
          />
        </div>
        <div
          className={inputWrapperClasses(
            errors?.finData?.investment_end_date ?? null
          )}
        >
          <label>
            <Translate value="projectCabinetPage.investEndDate" />
            <QuestionIcon
              data-tooltip-id={EVestingSettingsTooltips.INVEST_END_DATE}
            />
          </label>
          <div className={classes.processingWrapper}>
            <DateTimePicker
              date={values.finData.investment_end_date}
              setDate={(date) =>
                setFieldValue('finData.investment_end_date', date)
              }
              containerEC={classNames(
                errors?.finData?.investment_end_date && classes.errorBorder,
                isInvestEndDateProcessing && getInputLabelStyles('border')
              )}
              readOnly={!isEdit}
            />
            {isInvestEndDateProcessing && (
              <label
                className={classNames(
                  classes.processingLabel,
                  getInputLabelStyles('color')
                )}
              >
                <Translate value={getInputInfoLabel() as ITranslationKeys} />
              </label>
            )}
          </div>
          {errors?.finData?.investment_end_date && (
            <span className={classes.error}>
              {errors?.finData?.investment_end_date}
            </span>
          )}
        </div>
        <div className={classes.dateInputs}>
          <div
            className={inputWrapperClasses(
              errors?.vesting?.start_date ?? null,
              classes.dateInput
            )}
          >
            <label>
              <Translate value="projectCabinetPage.startDate" />
              <QuestionIcon
                data-tooltip-id={EVestingSettingsTooltips.START_DATE}
              />
            </label>
            <div className={classes.processingWrapper}>
              <DateTimePicker
                date={values.vesting.start_date}
                setDate={(date) => setFieldValue('vesting.start_date', date)}
                inputEC={classNames(
                  values.vesting.vestingType === BenefitPlanTypes.Linear &&
                    classes.smallDateInput
                )}
                containerEC={classNames(
                  errors?.vesting?.start_date && classes.errorBorder,
                  isVestingStartProcessing && getInputLabelStyles('border')
                )}
                readOnly={!isEdit}
              />
              {isVestingStartProcessing && (
                <label
                  className={classNames(
                    classes.processingLabel,
                    getInputLabelStyles('color')
                  )}
                >
                  <Translate value={getInputInfoLabel() as ITranslationKeys} />
                </label>
              )}
            </div>
            {errors?.vesting?.start_date && (
              <span className={classes.error}>{errors.vesting.start_date}</span>
            )}
          </div>
          {values.vesting.vestingType === BenefitPlanTypes.Linear && (
            <div
              className={inputWrapperClasses(
                errors?.vesting?.Linear?.endDate ?? null,
                classes.dateInput
              )}
            >
              <label>
                <Translate value="projectCabinetPage.endDate" />
                <QuestionIcon
                  data-tooltip-id={EVestingSettingsTooltips.END_DATE}
                />
              </label>
              <div className={classes.processingWrapper}>
                <DateTimePicker
                  date={values.vesting[BenefitPlanTypes.Linear].endDate}
                  setDate={(date) =>
                    setFieldValue('vesting.Linear.endDate', date)
                  }
                  inputEC={classes.smallDateInput}
                  containerEC={classNames(
                    errors?.vesting?.Linear?.endDate && classes.errorBorder,
                    isLinVestingEndProcessing && getInputLabelStyles('border')
                  )}
                  readOnly={!isEdit}
                />
                {isLinVestingEndProcessing && (
                  <label
                    className={classNames(
                      classes.processingLabel,
                      getInputLabelStyles('color')
                    )}
                  >
                    <Translate
                      value={getInputInfoLabel() as ITranslationKeys}
                    />
                  </label>
                )}
              </div>
              {errors?.vesting?.Linear?.endDate && (
                <span className={classes.error}>
                  {errors.vesting.Linear.endDate}
                </span>
              )}
            </div>
          )}
        </div>
        <div className={inputWrapperClasses(errors?.vesting?.price ?? null)}>
          <label>
            <span>
              <Translate value="projectCabinetPage.price" />
              <QuestionIcon data-tooltip-id={EVestingSettingsTooltips.PRICE} />
            </span>
            <span>
              <Trans
                i18nKey="projectCabinetPage.vestingPrice"
                values={{
                  vestingTokenSymbol:
                    customTokenMeta?.symbol || vestingTokenMeta.symbol,
                  price: values.vesting.price,
                  projectTokenSymbol: projectTokenMeta.symbol,
                }}
              />
            </span>
          </label>
          <AmountInput
            value={values.vesting.price}
            onChange={(amount) => setFieldValue('vesting.price', amount)}
            error={errors?.vesting?.price ?? null}
            isMaxBtn={false}
            readOnly={!isEdit}
            {...inputClasses(
              errors?.vesting?.price ?? null,
              isVestingTypeProcessing
            )}
            infoLabel={
              isVestingPriceProcessing ? getInputInfoLabel() : EMPTY_STRING
            }
          />
        </div>
        <div
          className={inputWrapperClasses(
            errors?.finData?.investment_min ?? null
          )}
        >
          <label>
            <Translate value="projectCabinetPage.investMin" />
            <QuestionIcon
              data-tooltip-id={EVestingSettingsTooltips.INVESTMENT_MIN}
            />
          </label>
          <AmountInput
            value={values.finData.investment_min}
            onChange={(amount) =>
              setFieldValue('finData.investment_min', amount)
            }
            error={errors?.finData?.investment_min ?? null}
            isMaxBtn={false}
            readOnly={!isEdit}
            {...inputClasses(
              errors?.finData?.investment_min ?? null,
              isInvestMinProcessing
            )}
            infoLabel={
              isInvestMinProcessing ? getInputInfoLabel() : EMPTY_STRING
            }
            endAdornment={projectTokenMeta.symbol}
          />
        </div>
        <div
          className={inputWrapperClasses(
            errors?.finData?.investment_max ?? null
          )}
        >
          <label>
            <Translate value="projectCabinetPage.investMax" />
            <QuestionIcon
              data-tooltip-id={EVestingSettingsTooltips.INVESTMENT_MAX}
            />
          </label>
          <AmountInput
            value={values.finData.investment_max}
            onChange={(amount) =>
              setFieldValue('finData.investment_max', amount)
            }
            error={errors?.finData?.investment_max ?? null}
            isMaxBtn={false}
            readOnly={!isEdit}
            {...inputClasses(
              errors?.finData?.investment_max ?? null,
              isInvestMaxProcessing
            )}
            infoLabel={
              isInvestMaxProcessing ? getInputInfoLabel() : EMPTY_STRING
            }
            endAdornment={projectTokenMeta.symbol}
          />
        </div>
        <div
          className={inputWrapperClasses(
            errors?.finData?.total_investments_limit ?? null
          )}
        >
          <label>
            <Translate value="projectCabinetPage.totalInvest" />
            <QuestionIcon
              data-tooltip-id={EVestingSettingsTooltips.INVESTMENT_TOTAL}
            />
          </label>
          <AmountInput
            value={values.finData.total_investments_limit}
            onChange={(amount) =>
              setFieldValue('finData.total_investments_limit', amount)
            }
            error={errors?.finData?.total_investments_limit ?? null}
            isMaxBtn={false}
            readOnly={!isEdit}
            {...inputClasses(
              errors?.finData?.total_investments_limit ?? null,
              isInvestTotalLimitProcessing
            )}
            infoLabel={
              isInvestTotalLimitProcessing ? getInputInfoLabel() : EMPTY_STRING
            }
            endAdornment={projectTokenMeta.symbol}
          />
        </div>
      </div>
      {values.vesting.vestingType === BenefitPlanTypes.NonLinear && (
        <NonLinearStages
          vesting={vesting}
          userProject={userProject}
          formik={{ values, errors, setFieldValue, ...formik }}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};
