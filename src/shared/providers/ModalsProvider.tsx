import {
  useContext,
  useState,
  useCallback,
  createContext,
  useMemo,
  PropsWithChildren,
} from 'react';

import * as Modal from 'shared/components/modals';
import {
  EModals,
  IAuthModal,
  IDonateModal,
  IGrantsModal,
  IHackathonParticipation,
  IInfoModal,
  IInvestModal,
  IProjectsFiltersModal,
  ISearchModal,
  ISignInModal,
  ISignOutModal,
  IUploadLogoModal,
  IUploadPicturesModal,
  IUserNameModal,
  IVoteModal,
  IWithdrawModal,
} from 'shared/interfaces';

type IModalsProps = {
  [EModals.SIGN_OUT_MODAL]: ISignOutModal;
  [EModals.SIGN_IN_MODAL]: ISignInModal;
  [EModals.DONATE_MODAL]: IDonateModal;
  [EModals.INVEST_MODAL]: IInvestModal;
  [EModals.GRANTS_MODAL]: IGrantsModal;
  [EModals.INFO_MODAL]: IInfoModal;
  [EModals.SUB_INFO_MODAL]: IInfoModal;
  [EModals.SEARCH_MODAL]: ISearchModal;
  [EModals.WITHDRAW_MODAL]: IWithdrawModal;
  [EModals.PROJECTS_FILTER_MODAL]: IProjectsFiltersModal;
  [EModals.UPLOAD_PICTURES_MODAL]: IUploadPicturesModal;
  [EModals.UPLOAD_LOGO_MODAL]: IUploadLogoModal;
  [EModals.VOTE_MODAL]: IVoteModal;
  [EModals.AUTH_MODAL]: IAuthModal;
  [EModals.HACKATHON_PARTICIPATION_MODAL]: IHackathonParticipation;
  [EModals.USERNAME_MODAL]: IUserNameModal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [EModals.EMPTY]: any;
};

type IModals = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [EModals.EMPTY]: any;
  [EModals.SIGN_OUT_MODAL]: React.FC<ISignOutModal>;
  [EModals.DONATE_MODAL]: React.FC<IDonateModal>;
  [EModals.INVEST_MODAL]: React.FC<IInvestModal>;
  [EModals.GRANTS_MODAL]: React.FC<IGrantsModal>;
  [EModals.SIGN_IN_MODAL]: React.FC<ISignInModal>;
  [EModals.INFO_MODAL]: React.FC<IInfoModal>;
  [EModals.SUB_INFO_MODAL]: React.FC<IInfoModal>;
  [EModals.SEARCH_MODAL]: React.FC<ISearchModal>;
  [EModals.WITHDRAW_MODAL]: React.FC<IWithdrawModal>;
  [EModals.PROJECTS_FILTER_MODAL]: React.FC<IProjectsFiltersModal>;
  [EModals.UPLOAD_PICTURES_MODAL]: React.FC<IUploadPicturesModal>;
  [EModals.UPLOAD_LOGO_MODAL]: React.FC<IUploadLogoModal>;
  [EModals.VOTE_MODAL]: React.FC<IVoteModal>;
  [EModals.AUTH_MODAL]: React.FC<IAuthModal>;
  [EModals.HACKATHON_PARTICIPATION_MODAL]: React.FC<IHackathonParticipation>;
  [EModals.USERNAME_MODAL]: React.FC<IUserNameModal>;
};

const MODALS: IModals = {
  [EModals.SIGN_OUT_MODAL]: Modal.SignOutModal,
  [EModals.DONATE_MODAL]: Modal.DonateModal,
  [EModals.INVEST_MODAL]: Modal.InvestModal,
  [EModals.GRANTS_MODAL]: Modal.GrantsModal,
  [EModals.SIGN_IN_MODAL]: Modal.SignInModal,
  [EModals.INFO_MODAL]: Modal.InfoModal,
  [EModals.SUB_INFO_MODAL]: Modal.SubInfoModal,
  [EModals.SEARCH_MODAL]: Modal.SearchModal,
  [EModals.WITHDRAW_MODAL]: Modal.WithdrawModal,
  [EModals.PROJECTS_FILTER_MODAL]: Modal.ProjectsFiltersModal,
  [EModals.UPLOAD_PICTURES_MODAL]: Modal.UploadPicturesModal,
  [EModals.UPLOAD_LOGO_MODAL]: Modal.UploadLogoModal,
  [EModals.VOTE_MODAL]: Modal.VoteModal,
  [EModals.AUTH_MODAL]: Modal.AuthModal,
  [EModals.HACKATHON_PARTICIPATION_MODAL]: Modal.HackathonParticipationModal,
  [EModals.USERNAME_MODAL]: Modal.UserNameModal,
  [EModals.EMPTY]: null,
};

interface IInternalProviderState {
  modal: EModals;
  props: IModalsProps[EModals];
}

const initialState: IInternalProviderState = {
  modal: EModals.EMPTY,
  props: null,
};

export type ModalProps<T extends EModals> = Omit<IModalsProps[T], 'closeModal'>;

interface IContextState {
  modal: EModals;
  props: IModalsProps[EModals];
  showModal: <T extends EModals>(modal: T, props: ModalProps<T>) => void;
  closeModal: () => void;
}

const initialContextState: IContextState = {
  modal: EModals.EMPTY,
  props: null,
  showModal: () => undefined,
  closeModal: () => undefined,
};

const ModalContext = createContext<IContextState>(initialContextState);
export const useModalContext = (): IContextState => useContext(ModalContext);

export const ModalProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [state, setState] = useState<IInternalProviderState>(initialState);
  const { modal, props } = state;

  const closeModal = useCallback(() => {
    setState(initialState);
  }, []);

  const showModal = useCallback(
    <T extends EModals>(modal: T, props: ModalProps<T>) =>
      setState({ modal, props }),
    [setState]
  );

  const Component: IModalsProps[EModals] = MODALS[modal];

  const contextValue = useMemo(
    () => ({
      ...state,
      showModal,
      closeModal,
    }),
    [state, showModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {Component && <Component closeModal={closeModal} {...props} />}
    </ModalContext.Provider>
  );
};
