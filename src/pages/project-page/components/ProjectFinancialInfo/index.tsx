import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { memo } from 'react';

import { ClaimAndVesting } from 'shared/components/claim-vesting/ClaimAndVesting';
import { GrantsTable } from 'shared/components/GrantsTable/GrantsTable';
import { InvestSummary } from 'shared/components/invest-summary/InvestSummary';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useProjectUpdate } from 'shared/hooks/useProjectUpdate';
import { EInvestmentsView } from 'shared/interfaces';
import { isInvestmentsAvailable } from 'shared/utils/pitchUtils';
import { selectProjectVesting } from 'store/slices/vesting';

import { useStyles } from './styles';

interface IProjectFinancialInfoProps {
  projectId: number;
  project: Project;
}

export const ProjectFinancialInfo: React.FC<IProjectFinancialInfoProps> = memo(
  ({ projectId, project }) => {
    const classes = useStyles();
    const vesting = useAppSelector((state) =>
      selectProjectVesting(state, projectId)
    );
    const { investmentsAvailable, donationsAvailable } = isInvestmentsAvailable(
      project,
      Number(vesting?.amount) > 0
    );

    useProjectUpdate(project?.project_id);

    return (
      <div className={classes.container}>
        <InvestSummary
          wrapperStyles={classes.investStyles}
          initialValue={EInvestmentsView.TOTAL}
          projectId={projectId}
          showButton
          showToggle
          investmentsAvailable={investmentsAvailable}
          donationsAvailable={donationsAvailable}
        />
        <GrantsTable projectId={projectId} />
        <ClaimAndVesting projectId={projectId} />
      </div>
    );
  }
);
