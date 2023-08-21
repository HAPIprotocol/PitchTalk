import { Document } from '@pitchtalk/contract-api-js/dist/core';
import { PitchArgsOffChain } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { ITeamMemberOffChain } from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { IProjectArgs } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';

export type SubmissionNew = IProjectArgs & {
  contact_links: { telegram: string; email: string };
};

// TODO: ADD comment
export type SubmissionUpdate = {
  projectId: string;
  project: IProjectArgs;
  // comment?: string;
};

export type SubmissionAttachmentsUpdate = {
  projectId: string;
  attachments: (Document & { id?: string })[];
  comment?: string;
};

export type SubmissionAttachmentsRemove = {
  projectId: string;
  attachmentIds: string[];
  comment?: string;
};

export type SubmissionPitchAdd = {
  projectId: string;
  pitch: PitchArgsOffChain;
  comment?: string;
};

export type SubmissionPitchUpdate = {
  pitchId: string;
  pitch: PitchArgsOffChain;
  comment?: string;
};

export type SubmissionPitchActivate = {
  pitchId: string;
  isActive: boolean;
  comment?: string;
};

export type SubmissionTeamUpdate = {
  projectId: string;
  team: ITeamMemberOffChain[];
  comment?: string;
};
