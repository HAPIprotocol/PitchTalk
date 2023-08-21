import { providers } from '@pitchtalk/contract-api-js';

import { explorerUrl } from 'services/config';
import i18n from 'services/translation';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import { EMPTY_STRING } from 'shared/constants';
import { EModals } from 'shared/interfaces';
import { ModalProps } from 'shared/providers/ModalsProvider';
import { ESTORAGE_KEYS, getItem } from 'shared/utils/storage';

import {
  EContractType,
  MAIN_CONTRACT_METHODS,
  METHODS,
  StatusType,
  ToastType,
  TransactionType,
} from './constants';

const PROPERTY_NAME = 'FunctionCall';

const RISK_SCORE_ERRORS = ['High account risk score.', 'ERR_AML_NOT_ALLOWED'];

class TransactionParseService {
  public parseTransactions = (
    txs: providers.FinalExecutionOutcome[],
    showModal: <T extends EModals>(modal: T, props: ModalProps<T>) => void
  ) => {
    const doNotShowSubInfoModal = getItem(
      ESTORAGE_KEYS.DO_NOT_SHOW_SUB_INFO_MODAL
    );

    const result: {
      type: TransactionType;
      status: StatusType;
      hash: string;
      contractType: EContractType;
      isRiskScoreError: boolean;
    } = this.analyzeTransactions(txs);
    const href = `${explorerUrl}/transactions/${result.hash}`;

    if (result.isRiskScoreError) {
      showModal(EModals.INFO_MODAL, {
        text: i18n.t('transactionsError.highRiskScore'),
      });
    }

    switch (result.type) {
      case TransactionType.Contribution:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            `${i18n.t('toast.contributionSuccess')}`,
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            `${i18n.t('toast.transactionFailed')}`,
            ToastType.Error
          );
        }
        break;
      case TransactionType.Donate:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            `${i18n.t('toast.donateSuccess')}`,
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            `${i18n.t('toast.transactionFailed')}`,
            ToastType.Error
          );
        }
        break;
      case TransactionType.Invest:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            `${i18n.t('toast.investSuccess')}`,
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            `${i18n.t('toast.transactionFailed')}`,
            ToastType.Error
          );
        }
        break;
      case TransactionType.Grant:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            `${i18n.t('toast.grantSuccess')}`,
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            `${i18n.t('toast.transactionFailed')}`,
            ToastType.Error
          );
        }
        break;
      case TransactionType.Claim:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            `${i18n.t('toast.claimSuccess')}`,
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            `${i18n.t('toast.transactionFailed')}`,
            ToastType.Error
          );
        }
        break;
      case TransactionType.Like:
        if (result.status === StatusType.SuccessValue) {
          return ToastLink(
            href,
            i18n.t('toast.likeSuccess'),
            ToastType.Success
          );
        } else if (result.status === StatusType.Failure) {
          return ToastLink(
            href,
            i18n.t('toast.transactionFailed'),
            ToastType.Error
          );
        }
        break;
      default:
        break;
    }

    if (result.contractType === EContractType.SUB) {
      if (!doNotShowSubInfoModal) showModal(EModals.SUB_INFO_MODAL, {});

      if (result.status === StatusType.SuccessValue) {
        ToastLink(
          href,
          i18n.t('toast.transactionSuccess'),
          ToastType.Success,
          true
        );
      } else if (result.status === StatusType.Failure) {
        ToastLink(href, i18n.t('toast.transactionFailed'), ToastType.Error);
      }
    }
  };

  private analyzeTransactions = (
    transactions: providers.FinalExecutionOutcome[]
  ): {
    type: TransactionType;
    status: StatusType;
    hash: string;
    contractType: EContractType;
    isRiskScoreError: boolean;
  } => {
    const { type, transaction, contractType } =
      this.getTransaction(transactions);
    if (!transaction) {
      return {
        type,
        status: StatusType.None,
        hash: '',
        contractType,
        isRiskScoreError: false,
      };
    }
    const { hash, status, isRiskScoreError } =
      this.detailsTransaction(transaction);

    return { type, status, hash, contractType, isRiskScoreError };
  };

  private detailsTransaction = (
    transaction: providers.FinalExecutionOutcome
  ) => {
    const { hash } = transaction.transaction;
    let successStatus = Object.prototype.hasOwnProperty.call(
      transaction.status,
      'SuccessValue'
    );
    let isRiskScoreError = false;
    if (
      transaction.receipts_outcome.some((receipt) =>
        Object.prototype.hasOwnProperty.call(receipt.outcome.status, 'Failure')
      )
    ) {
      successStatus = false;
    }
    if (
      transaction.receipts_outcome.length > 4 &&
      transaction.receipts_outcome[4] &&
      Object.prototype.hasOwnProperty.call(
        transaction.receipts_outcome[4].outcome.status,
        'Failure'
      )
    ) {
      const errorMsg =
        (transaction.receipts_outcome[4].outcome.status as any)?.['Failure']?.[
          'ActionError'
        ]?.['kind']?.['FunctionCallError']?.['ExecutionError'] || EMPTY_STRING;

      if (RISK_SCORE_ERRORS.some((error) => errorMsg.includes(error))) {
        isRiskScoreError = true;
      }
    }

    return {
      hash,
      status: successStatus ? StatusType.SuccessValue : StatusType.Failure,
      isRiskScoreError,
    };
  };

  private getTransaction = (
    transactions: providers.FinalExecutionOutcome[]
  ) => {
    const [transaction] = transactions.filter(
      (tx: providers.FinalExecutionOutcome) =>
        Object.values(METHODS).indexOf(
          tx.transaction.actions[0][PROPERTY_NAME].method_name
        ) !== -1
    );

    const methodName =
      transaction?.transaction.actions[0][PROPERTY_NAME].method_name;
    let type = TransactionType.None;
    let contractType = EContractType.MAIN;

    if (!MAIN_CONTRACT_METHODS.includes(methodName)) {
      contractType = EContractType.SUB;
    }

    switch (methodName) {
      case METHODS.CONFIRM:
      case METHODS.FT_TRANSFER_CALL:
        type = TransactionType.Contribution;
        break;
      case METHODS.DONATE:
        type = TransactionType.Donate;
        break;
      case METHODS.INVEST:
        type = TransactionType.Invest;
        break;
      case METHODS.GRANT:
        type = TransactionType.Grant;
        break;
      case METHODS.CLAIM:
        type = TransactionType.Claim;
        break;
      case METHODS.LIKE:
        type = TransactionType.Like;
        break;
      default:
        type = TransactionType.None;
    }
    return {
      type,
      transaction,
      contractType,
    };
  };
}

export const transactionParseService = new TransactionParseService();
