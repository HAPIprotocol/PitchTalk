/* eslint-disable no-console */
import {
  FinalExecutionOutcome,
  NetworkId,
  setupWalletSelector,
  Transaction,
} from '@near-wallet-selector/core';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import myNearWalletIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import nearWalletIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import { setupSender } from '@near-wallet-selector/sender';
import senderWalletIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png';
import { EPitchTalkContractChangeMethods } from '@pitchtalk/contract-api-js/dist/core';
import {
  getGas,
  getNearAmount,
} from '@pitchtalk/contract-api-js/dist/pitchtalk';
import { ESubServiceChangeMethods } from '@pitchtalk/contract-api-js/dist/SubmissionService/methods';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { map, distinctUntilChanged } from 'rxjs';

import {
  networkId,
  myNearWalletUrl,
  subServiceContract,
} from 'services/config';
import { transactionParseService } from 'services/toast';
import i18n from 'services/translation';
import { errorToastOptions } from 'shared/components/toast-link/ToastLink';
import { EMPTY_STRING, ONE_SECOND_IN_MS } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals, ITransaction } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { sleep } from 'shared/utils/dateUtils';
import { clearSubmissionFormData } from 'store/slices/submissionForm';
import {
  selectAccountId,
  selectOffChainUserData,
  setAccountId,
} from 'store/slices/user';
import { persistor } from 'store/store';
import { authWithNear, logoutUser } from 'store/thunks/user';
declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
    opera: string;
  }
}

interface WalletSelectorContextValue {
  openModal: () => void;
  isSignedIn: () => boolean;
  isSigning: boolean;
  requestSignTransactions: (
    t: ITransaction[],
    callbackUrl?: string
  ) => Promise<void | FinalExecutionOutcome[]>;
  signOut: () => Promise<void>;
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue>(
  {} as WalletSelectorContextValue
);

const ACCOUNT_ID = 'accountId';

export const WalletSelectorContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const accountId = useAppSelector(selectAccountId);
  const offChainUserData = useAppSelector(selectOffChainUserData);

  const { showModal } = useModalContext();

  const syncAccountState = (
    currentAccountId: string | null,
    newAccounts: Array<AccountState>
  ) => {
    if (!newAccounts.length) {
      localStorage.removeItem(ACCOUNT_ID);
      dispatch(setAccountId(EMPTY_STRING));
      return;
    }
    const validAccountId =
      currentAccountId &&
      newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId
      ? currentAccountId
      : newAccounts[0].accountId;
    localStorage.setItem(ACCOUNT_ID, newAccountId);
    dispatch(setAccountId(newAccountId));
    dispatch(authWithNear(newAccountId));
  };

  const init = useCallback(async () => {
    const selectorInstance = await setupWalletSelector({
      network: networkId as NetworkId,
      debug: true,
      modules: [
        setupNearWallet({ iconUrl: nearWalletIconUrl }),
        setupMyNearWallet({
          iconUrl: myNearWalletIconUrl,
          walletUrl: myNearWalletUrl,
        }),
        setupSender({ iconUrl: senderWalletIconUrl }),
      ],
    });

    const modalInstance = setupModal(selectorInstance, {
      contractId: subServiceContract,
      methodNames: [
        ...Object.values(ESubServiceChangeMethods),
        ...Object.values(EPitchTalkContractChangeMethods),
      ],
    });
    const state = selectorInstance.store.getState();

    syncAccountState(localStorage.getItem(ACCOUNT_ID), state.accounts);
    window.selector = selectorInstance;
    window.modal = modalInstance;

    setSelector(selectorInstance);
    setModal(modalInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        syncAccountState(accountId, nextAccounts);
      });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, accountId]);

  const isSignedIn = useCallback(
    () => (selector && selector.isSignedIn()) || false,
    [selector]
  );
  const requestSignTransactions = useCallback(
    async (transactions: ITransaction[], callbackUrl?: string) => {
      setIsSigning(true);
      if (!selector) {
        throw new Error('No wallet selected');
      }

      const nearTransactions: Transaction[] = transactions.map(
        (transaction: ITransaction) => ({
          signerId: accountId,
          receiverId: transaction.receiverId,
          actions: transaction.functionCalls.map((fc) => ({
            type: 'FunctionCall',
            params: {
              methodName: fc.methodName,
              args: fc.args || {},
              gas: getGas(fc.gas).toString(),
              deposit: getNearAmount(fc.amount).toString(),
            },
          })),
        })
      );

      const walletInstance = await selector.wallet().catch(() => {
        throw new Error('Cannot get wallet');
      });
      const isSubmissionTransaction =
        nearTransactions.length === 1 &&
        nearTransactions[0].receiverId === subServiceContract;
      let result: FinalExecutionOutcome[] = [];
      try {
        if (isSubmissionTransaction) {
          const res = await walletInstance.signAndSendTransaction({
            ...nearTransactions[0],
            callbackUrl,
          });
          res && (result = [res]);
        } else {
          const res = await walletInstance.signAndSendTransactions({
            transactions: nearTransactions,
            callbackUrl,
          });
          res && (result = res);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error: ', { e }, nearTransactions);
        toast.error(`${i18n.t('toast.transactionFailed')}`, errorToastOptions);
      } finally {
        if (isSubmissionTransaction) await sleep(3 * ONE_SECOND_IN_MS);
        setIsSigning(false);

        if (result)
          transactionParseService.parseTransactions(result, showModal);
      }
      return result;
    },
    [selector, accountId, showModal]
  );

  const openModal = useCallback(() => modal?.show(), [modal]);

  const signOut = useCallback(async () => {
    try {
      showModal(EModals.SIGN_OUT_MODAL, {
        handleConfirm: async () => {
          if (offChainUserData) {
            persistor.flush();
            dispatch(clearSubmissionFormData());
            dispatch(logoutUser());
          } else if (isSignedIn()) {
            if (!selector) return;
            persistor.flush();
            dispatch(clearSubmissionFormData());

            const wallet = await selector.wallet();
            await wallet.signOut();
            dispatch(logoutUser());
            window.location.reload();
          }
        },
        accountId: isSignedIn() ? accountId : offChainUserData?.email || '',
      });
    } catch (error) {
      console.error(error);
    }
  }, [selector, showModal, accountId, dispatch, offChainUserData, isSignedIn]);

  if (!selector || !modal) {
    return null;
  }

  return (
    <WalletSelectorContext.Provider
      value={{
        isSignedIn,
        isSigning,
        openModal,
        requestSignTransactions,
        signOut,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  return useContext(WalletSelectorContext);
}
