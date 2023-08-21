import { providers } from '@pitchtalk/contract-api-js'
import { useEffect, useCallback } from 'react';
import { toast, Slide } from 'react-toastify';

import { nodeUrl } from 'services/config';
import { useNavigate } from 'services/router';
import { transactionParseService } from 'services/toast';
import i18n from 'services/translation';
import { useModalContext } from 'shared/providers/ModalsProvider';

const TRANSACTION_HASHES = 'transactionHashes';
const ERROR_CODE = 'errorCode';
const ERROR_MESSAGE = 'errorMessage';

export const useTransactionHash = (query: string, accountId: string) => {
  const navigate = useNavigate();
  const { showModal } = useModalContext();
  const cleanUrl = useCallback(
    (query: URLSearchParams) => {
      if (
        query.has(TRANSACTION_HASHES) ||
        query.has(ERROR_CODE) ||
        query.has(ERROR_MESSAGE)
      ) {
        query.delete(TRANSACTION_HASHES);
        query.delete(ERROR_CODE);
        query.delete(ERROR_MESSAGE);

        navigate({
          search: query.toString(),
        });
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!query || !accountId) return;

    const queryParams = new URLSearchParams(query);
    const transactions = queryParams?.get(TRANSACTION_HASHES);
    const errorCode = queryParams?.get(ERROR_CODE);
    const errorMessage = queryParams?.get(ERROR_MESSAGE);
    if (errorCode || errorMessage) {
      toast.error(`${i18n.t('toast.transactionFailed')}`, {
        theme: 'dark',
        transition: Slide,
        style: {
          boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
        },
      });
      cleanUrl(queryParams);
      return;
    }

    if (transactions && accountId) {
      const provider = new providers.JsonRpcProvider(nodeUrl);
      try {
        Promise.all(
          transactions
            .split(',')
            .map((txHash) => provider.txStatus(txHash, accountId))
        ).then((res) =>
          transactionParseService.parseTransactions(res, showModal)
        );
      } catch (e) {
        console.warn(`${e} error while loading tx`);
      }
    }

    cleanUrl(queryParams);
  }, [query, accountId, navigate, cleanUrl]);
};
