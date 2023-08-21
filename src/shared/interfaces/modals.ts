import { Project, WithdrawType } from '@pitchtalk/contract-api-js/dist/core';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { PitchTalk } from '@pitchtalk/contract-api-js/dist/pitchtalk';
import { PropsWithChildren } from 'react';

import {
  IPreviewImageModel,
  IPreviewLogoModel,
} from 'pages/participant-form/interfaces';
import { ITokenBalance } from 'providers/FTProvider';
import { EAuthModalType } from 'shared/components/modals/auth-modal/types';
import { EProjectPictures } from 'shared/components/modals/upload-pictures-modal/UploadPicturesModal';
import { IFiltersState } from 'shared/utils/projectsFiltersUtils';

import { ESubPictures } from '../components/modals/upload-logo-modal/UploadLogoModal';

export interface ICloseModal extends PropsWithChildren {
  closeModal: () => void;
  modalStyles?: string;
  wrapperStyles?: string;
}

export interface IInfoModal extends ICloseModal {
  text?: string;
  submitAction?: () => void;
  submitButtonText?: string;
  isCloseModalBtn?: boolean;
}

export interface ISignOutModal extends ICloseModal {
  handleConfirm: () => void;
  accountId: string;
}

export interface ISignInModal extends ICloseModal {
  handleConfirm: () => void;
}

export interface IDonateModal extends ICloseModal {
  handleConfirm: (amount: string, tokenId?: string) => void;
  availableBalance?: string;
  symbol: string;
}

export interface IInvestModal extends ICloseModal {
  handleConfirm: (amount: string, tokenId?: string) => void;
  availableBalance?: string;
  project: Project;
}

export interface IGrantsModal extends ICloseModal {
  handleConfirm: (amount: string, tokenId: string) => void;
  getBalance: (tokenId: string) => Promise<ITokenBalance>;
  getNearBalance: () => Promise<string>;
}

export interface IVoteModal extends ICloseModal {
  handleConfirm: (amount: number) => Promise<void>;
  eventId: number;
}

export interface IWithdrawModal extends ICloseModal {
  handleConfirm: (amount: string, receiver_id: string) => void;
  withdrawType: WithdrawType;
  pitchTalkService: PitchTalk;
  project: Project;
  grantTokenId?: string;
}

export interface ISearchModal extends ICloseModal {
  pathname: string;
  navigate: (path: string, options?: Record<string, string>) => void;
}

export interface IProjectsFiltersModal extends ICloseModal {
  applyFilters: (filters: IFiltersState) => void;
  filters: IFiltersState;
}

export interface IUploadPicturesModal extends ICloseModal {
  submitPictures: (value: {
    projectBannerCid?: string;
    projectLogoCid?: string;
  }) => void;
  projectPictures?: IPreviewImageModel;
  projectName: string;
  modalType?: EProjectPictures;
}

export interface IUploadLogoModal extends ICloseModal {
  submitPicture: (value: { projectLogoCid?: string }) => void;
  projectPicture?: IPreviewLogoModel;
  submissionName: string;
  modalType?: ESubPictures;
}
export interface IAuthModal extends ICloseModal {
  title?: EAuthModalType;
  signInWithOnChain: () => void;
}

export interface IUserNameModal extends ICloseModal {
  onSubmit: () => void;
}

export interface IHackathonParticipation extends ICloseModal {
  eventId: number;
  submissionId: string;
  projectType: EProjectType;
  videoUrl: string | null | undefined;
  repoUrl: string | null | undefined;
  projectId?: string;
}

export enum EModals {
  SIGN_OUT_MODAL = 'SIGN_OUT_MODAL',
  DONATE_MODAL = 'DONATE_MODAL',
  INVEST_MODAL = 'INVEST_MODAL',
  GRANTS_MODAL = 'GRANTS_MODAL',
  WITHDRAW_MODAL = 'WITHDRAW_MODAL',
  SIGN_IN_MODAL = 'SIGN_IN_MODAL',
  INFO_MODAL = 'INFO_MODAL',
  SUB_INFO_MODAL = 'SUB_INFO_MODAL',
  SEARCH_MODAL = 'SEARCH_MODAL',
  PROJECTS_FILTER_MODAL = 'PROJECTS_FILTER_MODAL',
  UPLOAD_PICTURES_MODAL = 'UPLOAD_PICTURES_MODAL',
  UPLOAD_LOGO_MODAL = 'UPLOAD_LOGO_MODAL',
  VOTE_MODAL = 'VOTE_MODAL',
  AUTH_MODAL = 'AUTH_MODAL',
  USERNAME_MODAL = 'USERNAME_MODAL',
  HACKATHON_PARTICIPATION_MODAL = 'HACKATHON_PARTICIPATION_MODAL',
  EMPTY = 'EMPTY',
}
