import { Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  EActionStatus,
  IProjectRes,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import Big from 'big.js';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import { useFungibleTokensContext } from 'providers/FTProvider';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Button } from 'shared/components/button/Button';
import { TextInput } from 'shared/components/inputs/TextInput';
import { TokenSelect } from 'shared/components/select';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions, EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { EModals, EProjectSettingsState } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { classNames } from 'shared/styles/theme';
import { getVestingAmount } from 'shared/utils/vestingUtils';
import { selectTokens } from 'store/slices/tokens';
import { selectProjectVesting } from 'store/slices/vesting';

import { VestingSettings } from './components/VestingSettings';
import {
  FinancialInfoBlockState,
  getFinInfoBlockState,
  getInvestmentDataForSaving,
  getVestingDataForSaving,
  validationSchema,
} from './helpers';
import { useStyles } from './styles';
import { useCustomToken } from './useCustomToken';
import { useProcessing } from './useProcessing';
import { BlockHeader, Title } from '../components';
import { ProjectCabinetStateRefs } from '../constants';
import { inputLabelUtils } from '../utils';

type FinancialInfoBlockProps = {
  project: Project;
  userProject: IProjectRes;
  cabinetState: ProjectCabinetStateRefs;
};

export const FinancialInfoBlock: React.FC<FinancialInfoBlockProps> = ({
  project,
  userProject,
  cabinetState,
}) => {
  const classes = useStyles();
  const dimension = useWindowDimensions();
  const nowDate = Date.now();
  const { subServiceActions } = usePitchTalkServiceContext();
  const { getBalance } = useFungibleTokensContext();
  const tokens = useAppSelector(selectTokens);
  const { showModal, closeModal } = useModalContext();
  const [currentView, setCurrentView] = useState<EProjectSettingsState>(
    EProjectSettingsState.VIEW
  );
  const [isVestingTokensEnough, setIsVestingTokensEnough] = useState(false);
  const { tokenLink, tokenMeta, onTokenLinkChange } = useCustomToken();
  const isCustomToken = tokenMeta && tokenLink;

  const vesting = useAppSelector((s) =>
    selectProjectVesting(s, project.project_id ?? -1)
  );

  const formik = useFormik<FinancialInfoBlockState>({
    initialValues: getFinInfoBlockState(project, vesting, tokens),
    validationSchema: validationSchema(
      project.investors_pitch
        ? project.investors_pitch.starts_on + project.investors_pitch.duration
        : nowDate
    ),
    onSubmit: async (values) => {
      await subServiceActions.updateInvestmentAndVestingData(
        getVestingDataForSaving(
          {
            ...values,
            vesting: {
              ...values.vesting,
              ft_token_id: isCustomToken
                ? tokenLink
                : values.vesting.ft_token_id,
            },
          },
          isCustomToken
            ? tokenMeta.decimals
            : tokens[values.vesting.ft_token_id].decimals
        ),
        getInvestmentDataForSaving(
          values,
          tokens[values.finData.ft_token_id].decimals
        ),
        values.comment
      );
    },
    enableReinitialize: true,
  });

  const isEdit = currentView === EProjectSettingsState.EDIT;
  useEffect(() => {
    if (cabinetState) cabinetState.current.finState = setCurrentView;
  }, []);

  const isInvestPitch = project.investors_pitch?.name;
  const isVestingTokens = Number(vesting?.amount) > 0;

  const isSaveAvailable =
    isEdit &&
    ((userProject.token_id && isInvestPitch && !isVestingTokens) ||
      userProject.vesting_and_investment?.status === EActionStatus.Failed);

  const isSendTokensBtn =
    isEdit &&
    userProject.is_active &&
    userProject.vesting_and_investment?.status === EActionStatus.Active &&
    !isVestingTokens;

  const vestingTokensAmount =
    userProject.token_id && userProject.vesting_and_investment
      ? getVestingAmount(userProject, tokens[userProject.token_id].decimals)
          .amountFormatted
      : 0;

  const { isProjectTokenProcessing, isVestingTokenProcessing } = useProcessing(
    project,
    vesting,
    userProject
  );

  const isFtTokenReadOnly =
    !isEdit ||
    !!(
      userProject.token_id &&
      userProject.update_pitch &&
      nowDate > userProject.update_pitch?.starts_on &&
      userProject.update_pitch.status === EActionStatus.Active
    ) ||
    !userProject.is_active;

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userProject.vesting_and_investment?.token_id) {
        const { balance } = await getBalance(
          userProject.vesting_and_investment?.token_id || ''
        );
        setIsVestingTokensEnough(Big(balance).cmp(vestingTokensAmount) === 1);
      }
    };
    fetchUserBalance();
  }, [
    getBalance,
    userProject.vesting_and_investment?.token_decimals,
    userProject.vesting_and_investment?.token_id,
    vestingTokensAmount,
  ]);

  const isFinDataUpdated =
    userProject.vesting_and_investment?.status === EActionStatus.New ||
    userProject.vesting_and_investment?.status === EActionStatus.Updated;
  const isFinDataFailed =
    userProject.vesting_and_investment?.status === EActionStatus.Failed;

  const isProjectUpdated =
    userProject.status === EActionStatus.New ||
    userProject.status === EActionStatus.Updated;
  const isProjectFailed = userProject.status === EActionStatus.Failed;
  const isResetting = userProject.status === EActionStatus.Resetting;

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isFinDataUpdated,
    isFinDataFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(
    isFinDataUpdated,
    isFinDataFailed
  );

  const getProjectTokenStyles = inputLabelUtils.stylesFunc(
    isProjectUpdated,
    isProjectFailed,
    classes
  );
  const getProjectTokenLabel = inputLabelUtils.labelFunc(
    isProjectUpdated,
    isProjectFailed
  );

  const updateToken = async () => {
    if (userProject.token_id) {
      showModal(EModals.INFO_MODAL, {
        submitAction: async () => {
          closeModal();
          await subServiceActions.updateProjectFTToken(
            formik.values.finData.ft_token_id
          );
        },
        text: t('projectCabinetPage.confirmUpdateTokenModal'),
        submitButtonText: t('controls.submit'),
      });
    } else {
      await subServiceActions.updateProjectFTToken(
        formik.values.finData.ft_token_id
      );
    }
  };

  return (
    <div className={classes.container}>
      <BlockHeader
        title="projectCabinetPage.financialInformation"
        currentView={currentView}
        setCurrentView={setCurrentView}
        showToggleBtn={!isResetting}
      />
      <div className={classes.content}>
        <div className={classes.projectTokensInfoWrapper}>
          <Title label="projectCabinetPage.ftToken" tooltipId="ftToken" />
          <div className={classes.projectToken}>
            <label>
              <Translate value="projectCabinetPage.ftToken" />
            </label>
            <TokenSelect
              selectedToken={
                formik.values.finData.ft_token_id || 'wrap.testnet'
              }
              selectToken={(token) =>
                formik.setFieldValue('finData.ft_token_id', token, false)
              }
              readOnly={isFtTokenReadOnly}
              infoLabel={
                isProjectTokenProcessing ? getProjectTokenLabel() : EMPTY_STRING
              }
              infoLabelExtraClass={getProjectTokenStyles('color')}
              selectExtraClass={
                isProjectTokenProcessing
                  ? getProjectTokenStyles('border')
                  : EMPTY_STRING
              }
            />
            {isEdit &&
              (nowDate < (project.update_pitch?.starts_on || Date.now() + 1) ||
                !project.ft_token_id) && (
                <Button
                  extraClass={classes.saveFtTokenBtn}
                  label={`controls.${
                    !userProject.token_id ? 'addToken' : 'changeToken'
                  }`}
                  handleClick={() => updateToken()}
                />
              )}
          </div>
          <Title
            label="projectCabinetPage.investmentsSettings"
            tooltipId="investmentsSettings"
          />
          {isEdit && !userProject.token_id && (
            <div className={classes.warningWrapper}>
              <div className={classes.warning}>
                <Translate value="projectCabinetPage.pleaseAddToken" />
              </div>
            </div>
          )}
          {isEdit && !isInvestPitch && (
            <div className={classes.warningWrapper}>
              <div className={classes.warning}>
                <Translate value="projectCabinetPage.pleaseAddInvestPitch" />
              </div>
            </div>
          )}
          <div className={classes.vestingToken}>
            <label>
              <Translate value="projectCabinetPage.vestingToken" />
            </label>
            <div className={classes.tokenSelectWrapper}>
              <TokenSelect
                selectedToken={
                  formik.values.vesting.ft_token_id || 'wrap.testnet'
                }
                selectToken={(token) =>
                  formik.setFieldValue('vesting.ft_token_id', token)
                }
                readOnly={!isEdit || !!isCustomToken}
                infoLabel={
                  isVestingTokenProcessing ? getInputInfoLabel() : EMPTY_STRING
                }
                infoLabelExtraClass={getInputLabelStyles('color')}
                selectExtraClass={
                  isVestingTokenProcessing
                    ? getInputLabelStyles('border')
                    : EMPTY_STRING
                }
              />
              <span className={classes.vestingTokenInfo}>
                <Translate value="projectCabinetPage.chooseFromDropDownOrInsert" />
              </span>
            </div>
            <TextInput
              value={tokenLink ?? formik.values.vesting.ft_token_id}
              onChange={onTokenLinkChange}
              error={
                tokenLink && !tokenMeta ? t('validation.unknownToken') : null
              }
              readOnly={!isEdit}
              placeHolder={t('placeHolders.insertContractLink')}
              inputExtraClass={classes.vestingTokenInput}
              containerExtraClass={classNames(
                classes.vestingTokenInputContainer,
                isVestingTokenProcessing && getInputLabelStyles('border')
              )}
              infoLabel={
                isVestingTokenProcessing ? getInputInfoLabel() : EMPTY_STRING
              }
              infoLabelExtraClass={getInputLabelStyles('color')}
              endAdornment={tokenMeta?.symbol}
            />
          </div>
          {dimension !== EDimensions.SMALL &&
            dimension !== EDimensions.MEDIUM && (
              <div className={classes.controlsWrapper}>
                {isSendTokensBtn && (
                  <>
                    <Button
                      extraClass={classes.sendTokensBtn}
                      label="controls.sendVestingTokens"
                      handleClick={() => subServiceActions.sendVestingTokens()}
                      disabled={!isVestingTokensEnough}
                    />
                    {!isVestingTokensEnough && (
                      <div className={classes.tokensWarningWrapper}>
                        <div className={classes.warning}>
                          <Trans
                            i18nKey="validation.notEnoughTokens"
                            values={{ need: vestingTokensAmount }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
                {isSaveAvailable && (
                  <div className={classes.controls}>
                    <Button
                      extraClass={classes.saveBtn}
                      label="controls.saveChanges"
                      handleClick={() => formik.handleSubmit()}
                      disabled={
                        !userProject.is_active ||
                        !(formik.isValid && formik.dirty)
                      }
                    />
                    <textarea
                      value={formik.values.comment}
                      onChange={(e) =>
                        formik.setFieldValue('comment', e.target.value)
                      }
                      className={classes.comment}
                      placeholder={t('placeHolders.comment')}
                    />
                  </div>
                )}
              </div>
            )}
        </div>
        <div className={classes.vestingWrapper}>
          <Title label="projectCabinetPage.vesting" tooltipId="vesting" />
          <VestingSettings
            project={project}
            userProject={userProject}
            vesting={vesting}
            formik={formik}
            isEdit={isEdit}
            customTokenMeta={isCustomToken ? tokenMeta : undefined}
          />
        </div>
        {(dimension === EDimensions.SMALL ||
          dimension === EDimensions.MEDIUM) && (
          <div className={classes.controlsWrapper}>
            {isSendTokensBtn && (
              <>
                <Button
                  extraClass={classes.sendTokensBtn}
                  label="controls.sendVestingTokens"
                  handleClick={() => subServiceActions.sendVestingTokens()}
                  disabled={!isVestingTokensEnough}
                />
                {!isVestingTokensEnough && (
                  <div className={classes.tokensWarningWrapper}>
                    <div className={classes.warning}>
                      <Trans
                        i18nKey="validation.notEnoughTokens"
                        values={{ need: vestingTokensAmount }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {isSaveAvailable && (
              <div className={classes.controls}>
                <Button
                  extraClass={classes.saveBtn}
                  label="controls.saveChanges"
                  handleClick={() => formik.handleSubmit()}
                  disabled={
                    !userProject.is_active || !(formik.isValid && formik.dirty)
                  }
                />
                <textarea
                  value={formik.values.comment}
                  onChange={(e) =>
                    formik.setFieldValue('comment', e.target.value)
                  }
                  className={classes.comment}
                  placeholder={t('placeHolders.comment')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
