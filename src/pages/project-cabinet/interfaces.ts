import { Document, Project } from '@pitchtalk/contract-api-js/dist/core';
import {
  EProjectType,
  ITeam,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import {
  EActionStatus,
  IProjectRes,
  PitchSub,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';

type CustomProject = Omit<Project, 'project_id'>;

export interface ISubmissionProject extends CustomProject {
  project_id: string | number;

  type: EProjectType;
}

type CustomSubProject = Omit<IProjectRes, 'id' | 'documents'>;

export interface ISubmissionSubProject extends CustomSubProject {
  id: string | number;

  status: EActionStatus;
  type: EProjectType;
  documents: {
    [key: string]: Document & {
      status: EActionStatus;
      id?: string;
    };
  };
  intro_pitch?: PitchSub & { id?: string };
  update_pitch?: PitchSub & { id?: string };
  investors_pitch?: PitchSub & { id?: string };
  pitches?: (PitchSub & { id?: string })[];
  team?: ITeam;
}
