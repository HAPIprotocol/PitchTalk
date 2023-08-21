import { Project, SocialLinks } from '@pitchtalk/contract-api-js/dist/core';
import {
  IOffChainProject,
  EProjectType,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { DEFAULT_TOKEN } from 'shared/constants';
import { getAmountFormatted, getFiatAmount } from 'shared/utils/near';
import {
  EProjectStatus,
  getProjectStatus,
  isOffChainProject,
} from 'shared/utils/projectUtils';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectDonationsByProjectId } from 'store/slices/donations';
import { selectProjectGrants } from 'store/slices/grants';
import { selectProjectVesting } from 'store/slices/vesting';
import { RootState } from 'store/store';

import { IFilteredProject } from '../interface';

export const getFilteredProject = (
  state: RootState,
  project: Project | IOffChainProject
): IFilteredProject => {
  const isOnChainProject = !isOffChainProject(project);
  const grants = isOnChainProject
    ? selectProjectGrants(state, project.project_id)
    : [];
  const vesting = isOnChainProject
    ? selectProjectVesting(state, project.project_id)
    : null;
  const tokenData = isOnChainProject
    ? selectTokenData(state, project.ft_token_id)
    : DEFAULT_TOKEN;

  const { total_donations, total_investments } = isOnChainProject
    ? selectDonationsByProjectId(state, project.project_id)
    : { total_donations: 0, total_investments: 0 };

  const donates = getAmountFormatted(total_donations, tokenData.decimals);
  const investments = getAmountFormatted(total_investments, tokenData.decimals);

  const donatesInUSN = getFiatAmount(donates, tokenData.price);
  const investmentsInUSN = getFiatAmount(investments, tokenData.price);

  const { banner, logo } = getCorrectIPFSLinks({
    banner: project?.banner || '',
    logo: project?.logo || '',
  });

  return {
    projectType: isOnChainProject
      ? EProjectType.OnChain
      : EProjectType.OffChain,
    id: isOnChainProject ? project.project_id : project.id,
    logo,
    banner,
    name: project.name || '',
    description: project.description || '',
    projectStatus: isOnChainProject
      ? getProjectStatus(project, vesting, tokenData.decimals)
      : EProjectStatus.UNKNOWN,
    grants,
    vesting,
    projectTokenData: tokenData,
    donations: {
      donates,
      donatesInUSN,
      investments,
      investmentsInUSN,
    },
    likes: isOnChainProject ? project.likes || [] : [],
    social_links: project.social_links || ({} as SocialLinks),
    created_at: isOnChainProject
      ? Number(project.created_at)
      : new Date(project.created_at || '').valueOf(),
    project_url: project.project_url || '',
    stage: isOnChainProject ? project.stage : EPitchType.Initial,
    onChainProjectData: isOnChainProject ? project : null,
  };
};
