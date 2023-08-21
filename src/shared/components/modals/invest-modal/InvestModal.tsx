import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { ReactComponent as AccountIcon } from 'assets/images/icons/person-active-icon.svg';
import { Button } from 'shared/components/button/Button';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { Translate } from 'shared/components/translate/Translate';
import {
  DEBOUNCE_300,
  DEFAULT_NEAR_DECIMALS,
  EMPTY_STRING,
  PRECISION_BALANCE,
  ZERO,
} from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { IInvestModal } from 'shared/interfaces';
import {
  IAmountInputError,
  IAmountValidateArgs,
  validateValue,
} from 'shared/utils/inputUtils';
import {
  getAmountFormatted,
  getAmountWithDecimals,
  roundToLow,
} from 'shared/utils/near';
import { getProjectInvestmentInfo } from 'shared/utils/projectUtils';
import { getVestingTokenAmountByPrice } from 'shared/utils/vestingUtils';
import { selectTokens } from 'store/slices/tokens';
import { selectUserInvestmentsByProjectId } from 'store/slices/user';
import { selectProjectVesting } from 'store/slices/vesting';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

const getMaxAmount = (max = 0, maxAvailable: number): string => {
  if (!max) return maxAvailable.toString();

  return max > maxAvailable ? maxAvailable.toString() : max.toString();
};

export const InvestModal: React.FC<IInvestModal> = ({
  closeModal,
  handleConfirm,
  availableBalance = '0',
  project,
}) => {
  const classes = useStyles();
  const tokens = useAppSelector(selectTokens);
  const vesting = useAppSelector((state) =>
    selectProjectVesting(state, project.project_id)
  );
  const { invested } = useAppSelector((state) =>
    selectUserInvestmentsByProjectId(state, project.project_id)
  );

  const projectMeta = tokens[project.ft_token_id];
  const vestingMeta = tokens[vesting?.ft_token_id ?? EMPTY_STRING];
  const { min, max, totalInvestmentsLimit, usersInvestments } =
    getProjectInvestmentInfo(project, projectMeta);
  const investmentsLeft = totalInvestmentsLimit - usersInvestments;

  const vestingPrice = +getAmountFormatted(
    vesting?.price ?? ZERO,
    DEFAULT_NEAR_DECIMALS,
    PRECISION_BALANCE
  );

  const [amount, setAmount] = useState<string>(EMPTY_STRING);
  const [{ valid, reason, isWarning }, setValidation] =
    useState<IAmountInputError>({
      valid: false,
      reason: null,
      isWarning: false,
    });

  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const maxAmount = getMaxAmount(max, +availableBalance);
  const setMaxAmount = () => setAmount(maxAmount || EMPTY_STRING);

  const validateAmount = ({
    value,
    availableBalance,
    min,
    max,
    invested,
    investmentsLeft,
  }: IAmountValidateArgs) => {
    const error = validateValue({
      value,
      availableBalance,
      min,
      max,
      invested,
      investmentsLeft,
    });
    setValidation(error);
    setAmount(value);
  };

  const debouncedValidateAmount = useMemo(
    () => debounce(validateAmount, DEBOUNCE_300),
    []
  );

  useEffect(() => {
    debouncedValidateAmount({
      value: amount,
      availableBalance,
      min,
      max,
      invested: Number(invested),
      investmentsLeft,
    });

    return () => debouncedValidateAmount.cancel();
  }, [
    amount,
    debouncedValidateAmount,
    availableBalance,
    min,
    max,
    invested,
    investmentsLeft,
  ]);

  const submit = async () => {
    try {
      handleConfirm(amount);
    } catch (error) {
      console.log(error);
    }
  };

  const userTokens = roundToLow(
    +getVestingTokenAmountByPrice(
      getAmountWithDecimals(+amount, projectMeta.decimals, PRECISION_BALANCE),
      vesting?.price ?? ZERO,
      projectMeta.decimals
    ),
    PRECISION_BALANCE
  );

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={classes.container}>
        <div className={classes.account}>
          <div className={classes.accountIconContainer}>
            <AccountIcon />
          </div>
          <div className={classes.accountInfoHolder}>
            <span className={classes.accountAvailableBalanceTitle}>
              <Translate value="account.availableBalance" />
            </span>
            <span className={classes.accountAvailableBalanceAmount}>
              {`${roundToLow(Number(availableBalance), PRECISION_BALANCE)}  ${
                projectMeta.symbol
              }`}
            </span>
          </div>
        </div>
        <div className={classes.minAndMax}>
          <div className={classes.minAndMaxItem}>
            <span className={classes.amountTitle}>
              <Translate value="amounts.minInput" />
            </span>
            <span
              className={classes.amount}
            >{`${min} ${projectMeta.symbol}`}</span>
          </div>
          <div className={classes.minAndMaxItem}>
            <span className={classes.amountTitle}>
              <Translate value="amounts.maxInput" />
            </span>
            <span
              className={classes.amount}
            >{`${max} ${projectMeta.symbol}`}</span>
          </div>
          <div className={classes.minAndMaxItem}>
            <span className={classes.amountTitle}>
              <Translate value="amounts.tokenPrice" />
            </span>
            <span
              className={classes.amount}
            >{`${vestingPrice} ${vestingMeta.symbol}`}</span>
          </div>
        </div>
        <AmountInput
          value={amount}
          onChange={setAmount}
          setMaxAmount={setMaxAmount}
          error={reason}
          errorExtraClass={isWarning ? classes.warningColor : ''}
          containerExtraClass={isWarning ? classes.warningBorder : ''}
        />
        <div className={classes.tokenAmountInfo}>
          <span className={classes.amountTitle}>
            <Translate value="investPanel.youWillGet" />
          </span>
          <span
            className={classes.tokensAmount}
          >{`${userTokens} ${vestingMeta.symbol}`}</span>
        </div>
        <Button
          label="investPanel.invest"
          extraClass={classes.button}
          handleClick={submit}
          disabled={!valid || !termsAccepted}
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
