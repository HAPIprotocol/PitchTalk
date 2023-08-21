import {
  EContributionType,
  EUniqWithdrawType,
} from '@pitchtalk/contract-api-js/dist/core';
import { t } from 'i18next';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from 'shared/components/button/Button';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING, PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { IWithdrawModal } from 'shared/interfaces';
import { classNames } from 'shared/styles/theme';
import { getAmountWithDecimals, roundToLow } from 'shared/utils/near';
import {
  getDonationsAvailableToWithdraw,
  getGrantsAvailableToWithdraw,
  getInvestmentsAvailableToWithdraw,
  getVestingTokensAvailableWithdraw,
} from 'shared/utils/projectUtils';
import { selectTokens } from 'store/slices/tokens';
import { selectAccountId } from 'store/slices/user';
import { selectProjectVesting } from 'store/slices/vesting';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const WithdrawModal: React.FC<IWithdrawModal> = ({
  closeModal,
  handleConfirm,
  withdrawType,
  pitchTalkService,
  project,
  grantTokenId,
}) => {
  const classes = useStyles();
  const userId = useAppSelector(selectAccountId);
  const tokens = useAppSelector(selectTokens);
  const vesting = useAppSelector((state) =>
    selectProjectVesting(state, project.project_id)
  );
  const token =
    withdrawType === EContributionType.GRANTS
      ? grantTokenId
      : project?.ft_token_id;
  const meta = tokens[token || EMPTY_STRING];

  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [walletId, setWalletId] = useState<string>(userId);
  const [amount, setAmount] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<{ walletId: string; amount: string }>({
    walletId: EMPTY_STRING,
    amount: EMPTY_STRING,
  });

  const checkIsValidAccount = useCallback(
    debounce(async (walletId: string) => {
      if (!pitchTalkService || walletId.length < 3) return;
      const data = await pitchTalkService.getAccountData(walletId);
      setError((prev) => ({
        ...prev,
        walletId: data ? '' : '*This account doesn`t exists',
      }));
    }, 1000),
    []
  );

  const onWalletIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const walletId = e.target.value;
    setWalletId(walletId);
    checkIsValidAccount(walletId);
  };

  const withdrawInfo = useMemo(
    () => ({
      [EContributionType.DONATIONS]: getDonationsAvailableToWithdraw(
        project,
        meta.decimals
      ),
      [EContributionType.INVESTMENTS]: getInvestmentsAvailableToWithdraw(
        project,
        meta.decimals
      ),
      [EContributionType.GRANTS]: getGrantsAvailableToWithdraw(
        project,
        grantTokenId!,
        meta.decimals
      ),
      [EUniqWithdrawType.VESTING_TOKENS]: getVestingTokensAvailableWithdraw(
        project,
        vesting,
        meta.decimals
      ),
      [EUniqWithdrawType.SUBMISSION_FEE]: '',
      [EUniqWithdrawType.EVENT_FEE]: '',
    }),
    [project, meta.decimals, grantTokenId, vesting]
  );

  useEffect(() => {
    const availableAmount = withdrawInfo[withdrawType];
    setError((prev) => ({
      ...prev,
      amount:
        Number(availableAmount) >= Number(amount) || Number(amount) === 0
          ? ''
          : '*Incorrect withdraw token amount',
    }));
  }, [amount, withdrawType]);

  const confirmHandler = () => {
    if (walletId.length < 3) {
      setError((prev) => ({ ...prev, walletId: '*Account id is too short' }));
      return;
    }
    if (Number(amount) === 0) {
      setError((prev) => ({
        ...prev,
        amount: '*Incorrect withdraw token amount',
      }));
      return;
    }

    handleConfirm(getAmountWithDecimals(amount, meta.decimals, 0), walletId);
    closeModal();
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={classes.container}>
        <div className={classes.modalHead}>
          <p>
            <Translate value={`withdrawModal.withdraw.${withdrawType}`} />
          </p>
          <span className={classes.tokenInfo}>
            <img src={meta.icon} loading="lazy" />
            {meta.symbol}
          </span>
        </div>
        <div className={classes.withdrawAmount}>
          <p>
            <Translate value="withdrawModal.totalGrantAmount" />
          </p>
          <span>
            {roundToLow(+withdrawInfo[withdrawType], PRECISION_BALANCE)}{' '}
            {meta.symbol}
          </span>
        </div>
        <div className={classNames(classes.controlBlock, classes.amountBlock)}>
          <div className={classes.controlInput}>
            <AmountInput
              value={amount}
              onChange={(amount) => setAmount(amount)}
              setMaxAmount={() => setAmount(withdrawInfo[withdrawType])}
              error={error.amount}
              inputExtraClass={classes.amountInput}
              errorExtraClass={classes.errorMsg}
            />
          </div>
        </div>
        <div className={classes.controlBlock}>
          <span>
            <Translate value="withdrawModal.walletAddress" />:
          </span>
          <div className={classes.controlInput}>
            <TextInput
              value={walletId}
              onChange={onWalletIdChange}
              error={error.walletId}
              inputExtraClass={classes.walletInput}
              errorExtraClass={classes.errorMsg}
            />
          </div>
        </div>
        <Button
          disabled={
            !!Object.values(error).filter(Boolean).length || !termsAccepted
          }
          label={t('withdrawModal.submit')}
          handleClick={confirmHandler}
          extraClass={classes.withdrawButton}
        />
        <div className={classes.termsContainer}>
          <div className={classes.terms}>
            <Translate value="terms.terms" />
          </div>
          <Checkbox
            checked={termsAccepted}
            onChange={() => setTermsAccepted((termsAccepted) => !termsAccepted)}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
