import {
  BenefitPlan,
  BenefitPlanNonLinear,
  BenefitPlanTypes,
  Vesting,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  EActionStatus,
  IProjectRes,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikErrors, FormikProps } from 'formik';
import { t } from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';

import { ReactComponent as CloseIcon } from 'assets/images/icons/close-icon.svg';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { ITranslationKeys } from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { DateTimePicker } from 'shared/components/DateTimePicker/DateTimePicker';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';
import { FinancialInfoBlockState } from '../../helpers';

type NonLinearStagesProps = {
  formik: FormikProps<FinancialInfoBlockState>;
  vesting: Vesting | null;
  userProject: IProjectRes;
  isEdit: boolean;
};

export const NonLinearStages: React.FC<NonLinearStagesProps> = ({
  formik: { values, errors, setFieldValue },
  vesting,
  userProject,
  isEdit,
}) => {
  const classes = useStyles();

  const nonLinearError = (stage: number) =>
    errors?.vesting?.NonLinear?.[stage] as FormikErrors<{
      endDate: number;
      percentage: number;
    }>;

  const removeStage = (ind: number) =>
    setFieldValue(
      `vesting.${[BenefitPlanTypes.NonLinear]}`,
      values.vesting[BenefitPlanTypes.NonLinear].filter((_, i) => i !== ind)
    );

  const nonLinVesting = (plan: BenefitPlan) =>
    (plan as BenefitPlanNonLinear)[BenefitPlanTypes.NonLinear];

  const isStagePercentProcessing = (stage: number) =>
    userProject.vesting_and_investment &&
    (vesting
      ? nonLinVesting(vesting.benefit_plan)?.[stage]?.percentage
      : -1) !==
      nonLinVesting(userProject.vesting_and_investment.benefit_plan)?.[stage]
        ?.percentage;

  const isStageDateProcessing = (stage: number) =>
    userProject.vesting_and_investment &&
    (vesting
      ? nonLinVesting(vesting.benefit_plan)?.[stage]?.time_since_start
      : -1) !==
      nonLinVesting(userProject.vesting_and_investment.benefit_plan)?.[stage]
        ?.time_since_start;

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
    <div className={classes.nonLinearStages}>
      <div className={classes.stagesWrapper}>
        {values.vesting.NonLinear.map(
          ({ endDate, percentage }, i, arr) =>
            i > 0 && (
              <div key={i + endDate}>
                <div className={classes.stageHead}>
                  <label>
                    <Trans
                      i18nKey="projectCabinetPage.stage"
                      values={{ stage: i }}
                    />
                  </label>
                  {arr.length > 2 && isEdit && (
                    <CloseIcon onClick={() => removeStage(i)} />
                  )}
                </div>
                <div>
                  <div className={classes.stageInputControl}>
                    <label>
                      <Translate value="projectCabinetPage.endDate" />
                    </label>
                    <div className={classes.processingWrapper}>
                      <DateTimePicker
                        date={endDate}
                        setDate={(date) =>
                          setFieldValue(
                            `vesting.${[
                              BenefitPlanTypes.NonLinear,
                            ]}[${i}].endDate`,
                            date
                          )
                        }
                        containerEC={classNames(
                          nonLinearError(i)?.endDate && classes.errorBorder,
                          isStageDateProcessing(i) &&
                            getInputLabelStyles('border')
                        )}
                        readOnly={!isEdit}
                      />
                      {isStageDateProcessing(i) && (
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
                    {nonLinearError(i)?.endDate && (
                      <span className={classes.error}>
                        {nonLinearError(i)?.endDate}
                      </span>
                    )}
                  </div>
                  <div className={classes.stageInputControl}>
                    <label>
                      <Translate value="projectCabinetPage.percentage" />
                    </label>
                    <AmountInput
                      value={percentage}
                      onChange={(amount) =>
                        setFieldValue(
                          `vesting.${[
                            BenefitPlanTypes.NonLinear,
                          ]}[${i}].percentage`,
                          Number(amount)
                        )
                      }
                      error={nonLinearError(i)?.percentage ?? null}
                      isMaxBtn={false}
                      inputExtraClass={classes.amountInput}
                      containerExtraClass={classNames(
                        classes.inputContainer,
                        nonLinearError(i)?.percentage && classes.errorBorder,
                        isStagePercentProcessing(i) &&
                          getInputLabelStyles('border')
                      )}
                      errorExtraClass={classes.error}
                      readOnly={!isEdit}
                      infoLabel={
                        isStagePercentProcessing(i)
                          ? getInputInfoLabel()
                          : EMPTY_STRING
                      }
                      infoLabelExtraClass={getInputLabelStyles('color')}
                    />
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {isEdit && (
        <Button
          extraClass={classes.addPhaseBtn}
          disabled={values.vesting[BenefitPlanTypes.NonLinear].length >= 10}
          label={t('projectCabinetPage.addStage', {
            stage: values.vesting[BenefitPlanTypes.NonLinear].length,
          })}
          handleClick={() =>
            setFieldValue('vesting.NonLinear', [
              ...values.vesting[BenefitPlanTypes.NonLinear],
              {
                endDate:
                  values.vesting[BenefitPlanTypes.NonLinear].at(-1)?.endDate,
                percentage: 0,
              },
            ])
          }
        />
      )}
    </div>
  );
};
