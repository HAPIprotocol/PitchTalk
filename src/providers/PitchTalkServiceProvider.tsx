import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { SubmissionService } from '@pitchtalk/contract-api-js';
import {
  Documents,
  EContributionType,
  EUniqWithdrawType,
  InvestmentDataArgs,
  ProjectArgs,
  Project,
  WithdrawType,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  EPitchType,
  ITeam,
  PitchArgsOnChain,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import {
  IDonation,
  IInvestment,
  PitchTalk,
  ZERO_AMOUNT,
} from '@pitchtalk/contract-api-js/dist/pitchtalk';
import {
  SubVestingDataArgs,
  EWithdrawType,
  ContactLinks,
  IProjectArgs,
  ISubmissionFundModel,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { APP_ROUTES } from 'routes';
import {
  contract,
  nodeUrl,
  subServiceContract,
  wrapNearId,
} from 'services/config';
import i18n from 'services/translation';
import {
  EMPTY_STRING,
  FT_TRANSFER_GAS,
  NEAR_TOKEN_ID,
  EPromiseStatus,
  ZERO,
} from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { getAmountFormatted, getAmountWithDecimals } from 'shared/utils/near';
import {
  calculateTotalByAmountsByProjects,
  calculateTotalInvestAmount,
  getPaginationArray,
} from 'shared/utils/pitchUtils';
import { isProjectCanCollectInvests } from 'shared/utils/projectUtils';
import { getVestingAmount } from 'shared/utils/vestingUtils';
import { updateOnChainProject as updateProjectData } from 'store/slices/projects';
import { selectTokenPrices } from 'store/slices/tokenPrices';
import { selectTokens } from 'store/slices/tokens';
import {
  selectAccountId,
  selectUserProject,
  setUserInvestments,
} from 'store/slices/user';

import { useFungibleTokensContext } from './FTProvider';
import { useWalletSelector } from './WalletProvider';
import { selectSubmissionMetadata } from '../store/slices/submission';

interface IPitchTalkServiceContext {
  pitchTalkService?: PitchTalk;
  submissionService?: SubmissionService;
  like: (
    projectId: number,
    isGrantUserActive: boolean,
    isProjectActive: boolean
  ) => Promise<void>;
  donate: (projectId: number, tokenId: string) => Promise<void>;
  invest: (project: Project) => Promise<void>;
  makeGrant: (
    projectId: number,
    isGrantUserActive?: boolean,
    isGrantAvailable?: boolean,
    eventId?: number
  ) => Promise<void>;
  voteProject: (eventId: number, projectId: number | string) => void;
  fetchUserInvestmentsData: () => Promise<void>;
  subServiceActions: {
    onWithdraw: (
      withdrawType: WithdrawType,
      project: Project,
      tokenId?: string
    ) => void;
    updateProject: (project: ProjectArgs, comment?: string) => Promise<void>;
    registerSubmissionFund: (
      fund: ISubmissionFundModel,
      from_main_contract?: boolean
    ) => Promise<void>;
    getSubmissionFunds: () => Promise<ISubmissionFundModel[] | undefined>;
    updateSubmissionFund: (fund: ISubmissionFundModel) => Promise<void>;
    activateProject: (comment?: string) => Promise<void>;
    deactivateProject: (comment?: string) => Promise<void>;
    addAttachments: (attachments: Documents, comment?: string) => Promise<void>;
    removeAttachments: (
      attachmentIds: string[],
      comment?: string
    ) => Promise<void>;
    updateProjectFTToken: (token_id: string, comment?: string) => Promise<void>;
    updateInvestmentAndVestingData: (
      vesting_data: SubVestingDataArgs,
      investment_data: InvestmentDataArgs,
      comment?: string
    ) => Promise<void>;
    addNewPitch: (pitch: PitchArgsOnChain, comment?: string) => Promise<void>;
    updatePitch: (
      pitch: PitchArgsOnChain,
      pitchType: EPitchType,
      comment?: string
    ) => Promise<void>;
    activatePitch: (pitchType: EPitchType, comment?: string) => Promise<void>;
    deactivatePitch: (pitchType: EPitchType, comment?: string) => Promise<void>;
    updateInvestmentsStatus: (status: boolean) => Promise<void>;
    updateDonationStatus: (status: boolean) => Promise<void>;
    registerProjectAndAccount: (
      project: IProjectArgs,
      contact_links: ContactLinks
    ) => Promise<void | FinalExecutionOutcome[]>;
    sendVestingTokens: () => Promise<void>;
    resetProject: () => Promise<void>;
    updateTeam: (team: ITeam, comment?: string) => Promise<void>;
  };
}

const PitchTalkServiceContext = createContext<IPitchTalkServiceContext>(
  {} as IPitchTalkServiceContext
);

export const usePitchTalkServiceContext = () =>
  useContext(PitchTalkServiceContext);

export const PitchTalkServiceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [pitchTalkService, setPitchTalkService] = useState<PitchTalk>();
  const [submissionService, setSubmissionService] =
    useState<SubmissionService>();
  const {
    isSignedIn,
    openModal: requestSignIn,
    requestSignTransactions,
  } = useWalletSelector();
  const { getBalance } = useFungibleTokensContext();
  const { showModal, closeModal } = useModalContext();
  const tokens = useAppSelector(selectTokens);
  const accountId = useAppSelector(selectAccountId);
  const tokenPrices = useAppSelector(selectTokenPrices);
  const userProject = useAppSelector(selectUserProject);
  const submissionMetadata = useAppSelector(selectSubmissionMetadata);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const createInstance = async () => {
      const pitchtalkInstance = new PitchTalk(accountId, contract, nodeUrl);
      const submissionInstance = new SubmissionService(
        accountId,
        subServiceContract,
        nodeUrl
      );
      setPitchTalkService(pitchtalkInstance);
      setSubmissionService(submissionInstance);
    };
    createInstance();
  }, [accountId]);

  const fetchUserInvestmentsData = useCallback(async () => {
    const tokenPricesAvailable = !!Object.keys(tokenPrices).length;
    const tokensAvailable = !!Object.keys(tokens).length;
    if (
      !pitchTalkService ||
      !accountId ||
      !tokensAvailable ||
      !tokenPricesAvailable
    )
      return;

    let donations: IDonation[] = [];
    let investments: IInvestment[] = [];
    const [donationResponse, investmentsResponse] = await Promise.allSettled([
      pitchTalkService.getDonationsByInvestorId(accountId),
      pitchTalkService.getInvestmentsByInvestorId(accountId),
    ]);

    if (donationResponse.status === 'fulfilled')
      donations = donationResponse.value || [];
    if (investmentsResponse.status === 'fulfilled')
      investments = investmentsResponse.value || [];

    const totalSpent = calculateTotalInvestAmount(
      donations,
      investments,
      tokenPrices,
      tokens
    );
    const totalSpentByProjects = calculateTotalByAmountsByProjects(
      donations,
      investments
    );

    dispatch(
      setUserInvestments({
        donationList: donations,
        investmentsList: investments,
        totalSpent,
        totalSpentByProjects,
      })
    );
  }, [accountId, dispatch, pitchTalkService, tokenPrices, tokens]);

  const fetchProjectData = useCallback(
    async (projectId: number) => {
      if (!pitchTalkService) throw new Error('Cannot find pitchtalk service');

      const project = await pitchTalkService.getProjectById(projectId);
      project && dispatch(updateProjectData({ project }));
    },
    [dispatch, pitchTalkService]
  );

  const getNearBalance = useCallback(async () => {
    if (!accountId || !pitchTalkService) return ZERO_AMOUNT;
    const accountData = await pitchTalkService.getAccountData(accountId);
    const balance = getAmountFormatted(accountData?.amount || ZERO_AMOUNT);
    return balance;
  }, [accountId, pitchTalkService]);

  const like = useCallback(
    async (
      projectId: number,
      isGrantUserActive: boolean,
      isProjectActive: boolean
    ) => {
      if (!pitchTalkService || !isSignedIn()) return requestSignIn();

      if (!isGrantUserActive) {
        showModal(EModals.INFO_MODAL, {
          text: i18n.t('investPanel.grantUserDisabled'),
        });
        return;
      }
      if (!isProjectActive) {
        showModal(EModals.INFO_MODAL, {
          text: i18n.t('investPanel.projectDisable'),
        });
        return;
      }

      const likeTransactions = pitchTalkService.like(projectId);
      const like = await requestSignTransactions(likeTransactions);
      if (like) closeModal();
    },
    [
      pitchTalkService,
      isSignedIn,
      requestSignIn,
      requestSignTransactions,
      showModal,
      closeModal,
    ]
  );

  const donate = useCallback(
    async (projectId: number, tokenId: string) => {
      if (!pitchTalkService || !isSignedIn()) return requestSignIn();

      const { balance, symbol, decimals } = await getBalance(tokenId);

      showModal(EModals.DONATE_MODAL, {
        handleConfirm: async (amount) => {
          try {
            const donateTransactions = await pitchTalkService.makeContribution(
              EContributionType.DONATIONS,
              projectId,
              tokenId,
              FT_TRANSFER_GAS,
              getAmountWithDecimals(amount, decimals, 0)
            );
            const donation = await requestSignTransactions(donateTransactions);
            if (donation) {
              fetchUserInvestmentsData();
              fetchProjectData(projectId);
              closeModal();
            }
            return donation;
          } catch (error) {
            console.log(error);
          }
        },
        availableBalance: balance,
        symbol,
      });
    },
    [
      pitchTalkService,
      isSignedIn,
      requestSignIn,
      getBalance,
      showModal,
      requestSignTransactions,
      fetchUserInvestmentsData,
      fetchProjectData,
      closeModal,
    ]
  );

  const invest = useCallback(
    async (project: Project) => {
      if (!pitchTalkService || !isSignedIn()) return requestSignIn();

      const investIsAvailable = await pitchTalkService.tokenomicsIsAttached(
        project.project_id
      );

      if (!investIsAvailable) {
        showModal(EModals.INFO_MODAL, {
          text: `${i18n.t('investPanel.investNotAvailableNoDocuments')}`,
        });
        return;
      }

      if (!isProjectCanCollectInvests(project, tokens[project.ft_token_id])) {
        showModal(EModals.INFO_MODAL, {
          text: `${i18n.t('investPanel.allInvestmentsCollected')}`,
        });
        return;
      }

      const { balance, decimals } = await getBalance(project.ft_token_id);

      showModal(EModals.INVEST_MODAL, {
        handleConfirm: async (amount) => {
          try {
            const investTransactions = await pitchTalkService.makeContribution(
              EContributionType.INVESTMENTS,
              project.project_id,
              project.ft_token_id,
              FT_TRANSFER_GAS,
              getAmountWithDecimals(amount, decimals, 0)
            );
            const res = await requestSignTransactions(investTransactions);
            if (res) {
              fetchUserInvestmentsData();
              fetchProjectData(project.project_id);
              closeModal();
            }
          } catch (error) {
            console.log(error);
          }
        },
        availableBalance: balance,
        project,
      });
    },
    [
      pitchTalkService,
      isSignedIn,
      requestSignIn,
      tokens,
      getBalance,
      showModal,
      requestSignTransactions,
      fetchUserInvestmentsData,
      fetchProjectData,
      closeModal,
    ]
  );

  const makeGrant = useCallback(
    async (
      projectId: number,
      isGrantUserActive = false,
      isGrantAvailable = false,
      eventId?: number
    ) => {
      if (!pitchTalkService || !isSignedIn()) return requestSignIn();
      if (!isGrantUserActive) {
        showModal(EModals.INFO_MODAL, {
          text: i18n.t('investPanel.grantUserDisabled'),
        });
        return;
      }

      if (!isGrantAvailable) {
        showModal(EModals.INFO_MODAL, {
          text: i18n.t('investPanel.grantNotAvailableNoDocuments'),
        });
        return;
      }

      showModal(EModals.GRANTS_MODAL, {
        handleConfirm: async (amount, tokenId) => {
          try {
            const transactions = [];
            let token: string = tokenId;
            if (tokenId === NEAR_TOKEN_ID) {
              token = wrapNearId;
              const wrapTransaction = await pitchTalkService.wrap({
                amount: getAmountFormatted(amount || ZERO_AMOUNT),
                nearTokenId: wrapNearId,
              });
              transactions.push(wrapTransaction);
            }
            const grantsTransactions = await pitchTalkService.makeContribution(
              EContributionType.GRANTS,
              projectId,
              token,
              FT_TRANSFER_GAS,
              amount,
              eventId
            );

            transactions.push(grantsTransactions);
            const res = await requestSignTransactions(transactions.flat());

            if (res) closeModal();
          } catch (error) {
            console.log(error);
          }
        },
        getBalance,
        getNearBalance,
      });
    },
    [
      pitchTalkService,
      isSignedIn,
      requestSignIn,
      showModal,
      getBalance,
      requestSignTransactions,
      closeModal,
      getNearBalance,
    ]
  );

  const onWithdraw = useCallback(
    (withdrawType: WithdrawType, project: Project, tokenId?: string) => {
      if (!pitchTalkService || !isSignedIn() || !submissionService)
        return requestSignIn();

      const withdrawTypes = {
        [EContributionType.DONATIONS]: EWithdrawType.Donations,
        [EContributionType.INVESTMENTS]: EWithdrawType.Investments,
        [EContributionType.GRANTS]: EWithdrawType.Grants,
        [EUniqWithdrawType.VESTING_TOKENS]: EWithdrawType.Vesting,
        [EUniqWithdrawType.SUBMISSION_FEE]: '',
        [EUniqWithdrawType.EVENT_FEE]: '',
      };

      showModal(EModals.WITHDRAW_MODAL, {
        handleConfirm: async (amount: string, receiver_id: string) => {
          const withdrawTokenId =
            withdrawType === EContributionType.GRANTS
              ? tokenId
              : project.ft_token_id;

          const t = submissionService.requestToWithdraw(
            receiver_id,
            amount,
            withdrawTokenId as string,
            withdrawTypes[withdrawType] as EWithdrawType,
            ''
          );
          const res = await requestSignTransactions(t);
          if (res) closeModal();
        },
        withdrawType,
        project,
        pitchTalkService,
        grantTokenId: tokenId,
      });
    },
    [
      closeModal,
      isSignedIn,
      pitchTalkService,
      requestSignIn,
      requestSignTransactions,
      showModal,
      submissionService,
    ]
  );

  const registerSubmissionFund = useCallback(
    async (fund: ISubmissionFundModel, from_main_contract?: boolean) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.registerFund(fund, from_main_contract),
        document.location.origin + APP_ROUTES.PROFILE
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updateSubmissionFund = useCallback(
    async (fund: ISubmissionFundModel) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateFund(fund),
        document.location.origin + APP_ROUTES.PROFILE
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const voteProject = useCallback(
    (eventId: number, projectId: number | string) => {
      if (!pitchTalkService || !isSignedIn()) return requestSignIn();
      showModal(EModals.VOTE_MODAL, {
        handleConfirm: async (amount: number) => {
          try {
            const voteTransaction = pitchTalkService.voteProjectEvent(
              eventId,
              projectId.toString(),
              amount
            );
            const res = await requestSignTransactions(voteTransaction);
            if (res) closeModal();
          } catch (error) {
            console.log(error);
          }
        },
        eventId,
      });
    },
    [
      pitchTalkService,
      accountId,
      requestSignTransactions,
      showModal,
      isSignedIn,
    ]
  );

  const activateProject = useCallback(
    async (comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(submissionService.activateProject(comment));
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const deactivateProject = useCallback(
    async (comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.deactivateProject(comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updateProject = useCallback(
    async (project: ProjectArgs, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateProject(project, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updateProjectFTToken = useCallback(
    async (token_id: string, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateProjectToken(token_id, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updateInvestmentAndVestingData = useCallback(
    async (
      vesting_data: SubVestingDataArgs,
      investment_data: InvestmentDataArgs,
      comment?: string
    ) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateInvestmentAndVestingData(
          vesting_data,
          investment_data,
          comment
        )
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const addAttachments = useCallback(
    async (attachments: Documents, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.addProjectAttachments(attachments, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const addNewPitch = useCallback(
    async (pitch: PitchArgsOnChain, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.initNextPitch(pitch, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updatePitch = useCallback(
    async (
      pitch: PitchArgsOnChain,
      pitchType: EPitchType,
      comment?: string
    ) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updatePitch(pitchType, pitch, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const activatePitch = useCallback(
    async (pitchType: EPitchType, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      const t = submissionService.activatePitch(pitchType, comment);
      await requestSignTransactions(t);
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const deactivatePitch = useCallback(
    async (pitchType: EPitchType, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.deactivatePitch(pitchType, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const removeAttachments = useCallback(
    async (attachmentIds: string[], comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.removeProjectAttachments(attachmentIds, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const sendVestingTokens = useCallback(async () => {
    try {
      if (
        !submissionService ||
        !pitchTalkService ||
        !isSignedIn() ||
        !userProject
      ) {
        throw new Error('Cannot find data to send tokens');
      }

      const tokenId =
        userProject.vesting_and_investment?.token_id ?? EMPTY_STRING;
      const projectTokenDecimals =
        tokens[userProject?.token_id || EMPTY_STRING].decimals;

      const tx = [];

      const storageBalanceOf = await pitchTalkService.storageBalanceOf(
        subServiceContract,
        tokenId
      );

      if (!storageBalanceOf) {
        const transaction = await pitchTalkService.getStorageBalanceTransaction(
          tokenId,
          subServiceContract
        );
        tx.push(transaction);
      }

      tx.push(
        submissionService.sendVestingTokens(
          tokenId,
          accountId,
          getVestingAmount(userProject, projectTokenDecimals).amountWithDecimals
        )
      );
      await requestSignTransactions(tx.flat());
    } catch (error) {
      console.warn('Sending tokens error: ', error);
    }
  }, [
    submissionService,
    pitchTalkService,
    isSignedIn,
    userProject,
    accountId,
    requestSignTransactions,
    tokens,
  ]);

  const updateInvestmentsStatus = useCallback(
    async (status: boolean) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateInvestmentStatus(status)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const updateDonationStatus = useCallback(
    async (status: boolean) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateDonationStatus(status)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const resetProject = useCallback(async () => {
    if (!submissionService || !isSignedIn()) return requestSignIn();
    await requestSignTransactions(submissionService.resetProject());
  }, [isSignedIn, requestSignIn, requestSignTransactions, submissionService]);

  const updateTeam = useCallback(
    async (team: ITeam, comment?: string) => {
      if (!submissionService || !isSignedIn()) return requestSignIn();
      await requestSignTransactions(
        submissionService.updateTeam(team, comment)
      );
    },
    [isSignedIn, requestSignIn, requestSignTransactions, submissionService]
  );

  const registerProjectAndAccount = useCallback(
    async (project: IProjectArgs, contact_links: ContactLinks) => {
      try {
        if (!submissionService || !pitchTalkService || !isSignedIn())
          return requestSignIn();

        const transactions = [];

        if (submissionMetadata?.fee_token === wrapNearId) {
          const wrapTransaction = await pitchTalkService.wrap({
            amount: getAmountFormatted(
              submissionMetadata?.join_fee || ZERO_AMOUNT
            ),
            nearTokenId: wrapNearId,
          });
          transactions.push(wrapTransaction);
        }
        const t = await submissionService.registerProjectAndAccount(
          project,
          contact_links
        );
        transactions.push(t);

        return await requestSignTransactions(
          transactions.flat(),
          document.location.origin + APP_ROUTES.PROJECT_CABINET
        );
      } catch (error) {
        console.warn('Register project and account error: ', error);
      }
    },
    [
      pitchTalkService,
      submissionService,
      isSignedIn,
      requestSignIn,
      requestSignTransactions,
      submissionMetadata?.fee_token,
      submissionMetadata?.join_fee,
    ]
  );

  const getSubmissionFunds = useCallback(async () => {
    if (!submissionService) return;
    try {
      const count =
        (await submissionService.getSubmissionFundCount()) || Number(ZERO);
      const paginationArray = getPaginationArray(count);

      const fundsResponse = await Promise.allSettled(
        paginationArray.map(({ fromIndex, limit }) =>
          submissionService.getSubmissionFunds(fromIndex, limit)
        )
      ).then((fundsResponse) => {
        const newFunds = fundsResponse
          .flatMap((response) =>
            response.status === EPromiseStatus.FULFILLED ? response.value : null
          )
          .filter(Boolean) as ISubmissionFundModel[];
        if (newFunds?.length) {
          return newFunds;
        }
      });
      if (fundsResponse && fundsResponse.length) return fundsResponse;
    } catch (error) {
      console.warn(error);
    }
  }, [submissionService]);

  const subServiceActions = useMemo(
    () => ({
      onWithdraw,
      updateProject,
      getSubmissionFunds,
      registerSubmissionFund,
      updateSubmissionFund,
      activateProject,
      deactivateProject,
      addAttachments,
      removeAttachments,
      updateProjectFTToken,
      updateInvestmentAndVestingData,
      addNewPitch,
      updatePitch,
      activatePitch,
      deactivatePitch,
      updateInvestmentsStatus,
      updateDonationStatus,
      registerProjectAndAccount,
      sendVestingTokens,
      resetProject,
      updateTeam,
    }),
    [
      onWithdraw,
      updateProject,
      getSubmissionFunds,
      registerSubmissionFund,
      updateSubmissionFund,
      activateProject,
      deactivateProject,
      addAttachments,
      removeAttachments,
      updateProjectFTToken,
      updateInvestmentAndVestingData,
      addNewPitch,
      updatePitch,
      activatePitch,
      deactivatePitch,
      updateInvestmentsStatus,
      updateDonationStatus,
      registerProjectAndAccount,
      sendVestingTokens,
      resetProject,
      updateTeam,
    ]
  );

  const contextValue: IPitchTalkServiceContext = useMemo(
    () => ({
      pitchTalkService,
      submissionService,
      donate,
      invest,
      makeGrant,
      voteProject,
      like,
      subServiceActions,
      fetchUserInvestmentsData,
    }),
    [
      pitchTalkService,
      submissionService,
      donate,
      invest,
      makeGrant,
      like,
      voteProject,
      subServiceActions,
      fetchUserInvestmentsData,
    ]
  );

  return (
    <PitchTalkServiceContext.Provider value={contextValue}>
      {children}
    </PitchTalkServiceContext.Provider>
  );
};
