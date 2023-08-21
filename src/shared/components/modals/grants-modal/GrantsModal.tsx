import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { ReactComponent as AccountIcon } from 'assets/images/icons/person-active-icon.svg';
import { ReactComponent as ArrowIcon } from 'assets/images/icons/small-arrow-bottom-icon.svg';
import { emptyBalance, ITokenBalance } from 'providers/FTProvider';
import { Button } from 'shared/components/button/Button';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { DropDownMenu } from 'shared/components/DropdownMenu/DropDownMenu';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { Translate } from 'shared/components/translate/Translate';
import { DEBOUNCE_300, DEFAULT_NEAR_DECIMALS, NEAR_METADATA, NEAR_TOKEN_ID, NEAR_TOKEN_NAME, PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { IGrantsModal } from 'shared/interfaces';
import {
  IAmountInputError,
  IAmountValidateArgs,
  validateValue,
} from 'shared/utils/inputUtils';
import { getAmountWithDecimals, roundToLow } from 'shared/utils/near';
import { selectTokens } from 'store/slices/tokens';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const GrantsModal: React.FC<IGrantsModal> = ({
  closeModal,
  handleConfirm,
  getBalance,
  getNearBalance,
}) => {
  const classes = useStyles();
  const [currency, setCurrency] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [balanceData, setBalanceData] = useState<ITokenBalance>(emptyBalance);
  const [{ valid, reason }, setValidation] = useState<IAmountInputError>({
    valid: false,
    reason: null,
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const currencyList = useAppSelector(selectTokens);
  const currencyListWithNear = useMemo(() => ({
    [NEAR_TOKEN_ID]: {...NEAR_METADATA},
    ...currencyList
  }), [currencyList])

  const validateAmount = ({ value, availableBalance }: IAmountValidateArgs) => {
    const error = validateValue({ value, availableBalance });
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
      availableBalance: balanceData.balance,
    });

    return () => debouncedValidateAmount.cancel();
  }, [amount, debouncedValidateAmount, balanceData.balance]);

  const onSubmit = async () => {
    try {
      await handleConfirm(
        getAmountWithDecimals(amount.toString(), balanceData.decimals, 0),
        currency
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAmount('');
  }, [currency]);

  useEffect(() => {
    setCurrency(Object.keys(currencyListWithNear)?.[0] ?? '');
  }, [currencyListWithNear]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!currency) return;
      try {
        if (currency === NEAR_TOKEN_ID) {
          const balance = await getNearBalance();
          setBalanceData({
            balance,
            symbol: NEAR_TOKEN_ID,
            decimals: DEFAULT_NEAR_DECIMALS,
          })

          return;
        }
        const balance = await getBalance(currency);
        setBalanceData(balance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserBalance();
  }, [currency, getBalance, getNearBalance]);

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
                Number(balanceData.balance),
                PRECISION_BALANCE
              )}  ${balanceData.symbol}`}
            </span>
          </div>
        </div>
        <DropDownMenu
          list={
            <>
              {Object.entries(currencyListWithNear).map(([currName, currencyData]) => (
                <div
                  className={
                    currName === currency
                      ? classes.currencyDropDownItemActive
                      : classes.currencyDropDownItem
                  }
                  key={currName}
                  onClick={() => setCurrency(currName)}
                >
                  <img src={currencyData?.icon ?? ''} loading="lazy" />
                  <span>{currencyData?.symbol ?? ''}</span>
                </div>
              ))}
            </>
          }
          position={{ top: '29px', left: '0px' }}
          className={classes.currencyDropDownWrapper}
          menuClassName={classes.currencyDropDownMenu}
          onCloseDepArray={[currency]}
        >
          <>
            <Translate value="investPanel.currency" />
            <ArrowIcon />
          </>
        </DropDownMenu>
        <AmountInput
          value={amount}
          onChange={setAmount}
          setMaxAmount={() => setAmount(balanceData.balance)}
          error={reason}
        />
        <Button
          label="investPanel.grant"
          extraClass={classes.button}
          handleClick={onSubmit}
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
