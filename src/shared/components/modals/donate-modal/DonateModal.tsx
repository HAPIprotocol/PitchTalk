import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';

import { ReactComponent as AccountIcon } from 'assets/images/icons/person-active-icon.svg';
import { Button } from 'shared/components/button/Button';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { Translate } from 'shared/components/translate/Translate';
import { DEBOUNCE_300, PRECISION_BALANCE } from 'shared/constants';
import { IDonateModal } from 'shared/interfaces';
import {
  IAmountInputError,
  IAmountValidateArgs,
  validateValue,
} from 'shared/utils/inputUtils';
import { roundToLow } from 'shared/utils/near';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const DonateModal: React.FC<IDonateModal> = ({
  closeModal,
  handleConfirm,
  availableBalance,
  symbol,
}) => {
  const classes = useStyles();

  const [amount, setAmount] = useState<string>('');
  const [{ valid, reason }, setValidation] = useState<IAmountInputError>({
    valid: false,
    reason: null,
  });

  const setMaxAmount = () => setAmount(availableBalance || '');

  const validateAmount = ({
    value,
    availableBalance,
    min,
    max,
  }: IAmountValidateArgs) => {
    const error = validateValue({ value, availableBalance, min, max });
    setValidation(error);
    setAmount(value);
  };

  const debouncedValidateAmount = useMemo(
    () => debounce(validateAmount, DEBOUNCE_300),
    []
  );

  useEffect(() => {
    debouncedValidateAmount({ value: amount, availableBalance });

    return () => debouncedValidateAmount.cancel();
  }, [amount, debouncedValidateAmount, availableBalance]);

  const submit = async () => {
    try {
      if (!valid || reason) return;
      handleConfirm(amount);
    } catch (error) {
      console.log(error);
    }
  };
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
              {`${roundToLow(
                Number(availableBalance),
                PRECISION_BALANCE
              )} ${symbol}`}
            </span>
          </div>
        </div>
        <AmountInput
          value={amount}
          onChange={setAmount}
          setMaxAmount={setMaxAmount}
          error={reason}
        />
        <Button
          label="investPanel.donate"
          extraClass={classes.button}
          handleClick={submit}
          disabled={!valid}
        />
      </div>
    </ModalWrapper>
  );
};
