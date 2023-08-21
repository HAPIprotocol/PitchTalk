import {
  IGrant,
  Vesting,
  SocialLinks,
  Project,
} from '@pitchtalk/contract-api-js/dist/core';
import {
  EProjectType,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces';

import { TokenData } from 'shared/constants';
import { EProjectStatus } from 'shared/utils/projectUtils';

export interface IFilteredProject {
  projectType: EProjectType;
  id: string | number;
  logo: string;
  banner: string;
  name: string;
  description: string;
  projectStatus: EProjectStatus;
  grants: IGrant[];
  vesting: Vesting | null;
  projectTokenData: TokenData;
  donations: {
    donates: string;
    donatesInUSN: string;
    investments: string;
    investmentsInUSN: string;
  };
  likes: string[];
  social_links: SocialLinks;
  created_at: number;
  stage: EPitchType;
  onChainProjectData: Project | null;
  project_url: string;
}
