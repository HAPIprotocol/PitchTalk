import { IFund } from '@pitchtalk/contract-api-js/dist/core';
import { ISubmissionFundModel } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import debounce from 'lodash/debounce';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import { usePitchTalkServiceContext } from '../../providers/PitchTalkServiceProvider';
import { EMPTY_STRING, ONE_SECOND_IN_MS } from '../constants';
import { isAccountInFunds } from '../utils/fundUtils';

export interface IUseSubFundModel {
  setWalletError: Dispatch<SetStateAction<{ [p: string]: boolean }>>;
  walletFields: [] | { value: string }[];
  setWalletField: Dispatch<SetStateAction<[] | { value: string }[]>>;
  walletError: { [p: string]: boolean };
  funds: IFund[];
  subFunds: ISubmissionFundModel[];
}

export const useSubFund = ({
  setWalletError,
  walletFields,
  setWalletField,
  walletError,
  funds,
  subFunds,
}: IUseSubFundModel) => {
  const { pitchTalkService } = usePitchTalkServiceContext();
  const [isAccountRegistered, setRegisteredAccount] = useState<boolean>(false);

  const checkIsValidAccount = useCallback(
    debounce(async (wallet: string, index: number) => {
      if (!pitchTalkService) return;
      const { isRegistered } = isAccountInFunds(funds, subFunds, wallet);
      const data =
        wallet.length > 3
          ? await pitchTalkService.getAccountData(wallet)
          : false;
      setRegisteredAccount(isRegistered);
      setWalletError((prevState) => ({
        ...prevState,
        [`key_${index}`]: !!data && wallet.length > 3 && !isRegistered,
      }));
    }, ONE_SECOND_IN_MS),
    []
  );

  const addInputField = () => {
    const isInputsValue = walletFields.every((input) => input.value);
    const canCreateElement = Object.values(walletError).every((error) => error);
    if (!canCreateElement || !isInputsValue) return;
    setWalletField([
      ...walletFields,
      {
        value: EMPTY_STRING,
      },
    ]);
  };

  const handleWalletChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.trim();
    setWalletField((prevWalletList) => {
      const updatedWalletList = [...prevWalletList];
      updatedWalletList[index] = {
        ...updatedWalletList[index],
        value,
      };
      return updatedWalletList;
    });
    checkIsValidAccount(value, index);
  };

  const removeInputFields = (index: number) => {
    const rows = [...walletFields];
    rows.splice(index, 1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [`key_${index}`]: removedProperty, ...rest } = walletError;
    setWalletField(rows);
    setWalletError(rest);
  };

  return {
    addInputField,
    handleWalletChange,
    removeInputFields,
    isAccountRegistered,
  };
};
