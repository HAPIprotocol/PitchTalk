import { Project } from '@pitchtalk/contract-api-js';
import { EContributionType } from '@pitchtalk/contract-api-js/dist/core';
import {
  EActionStatus,
  IProjectRes,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { t } from 'i18next';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { wrapNearId } from 'services/config';
import { Button } from 'shared/components/button/Button';
import { Switch } from 'shared/components/switch';
import { Translate } from 'shared/components/translate/Translate';
import { PRECISION_BALANCE, ZERO } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectTokens } from 'store/slices/tokens';

import { useStyles } from './styles';

type BalancesBoxProps = {
  project?: Project;
  userProject?: IProjectRes;
};

export const BalancesBox: React.FC<BalancesBoxProps> = ({
  project,
  userProject,
}) => {
  const now = Date.now();
  const classes = useStyles();

  const { subServiceActions } = usePitchTalkServiceContext();
  const tokens = useAppSelector(selectTokens);
  const projectTokenMeta = useAppSelector((s) =>
    selectTokenData(s, project?.ft_token_id || wrapNearId)
  );

  const donationsTokenAmount = +getAmountFormatted(
    project?.total_donations || ZERO,
    projectTokenMeta.decimals,
    PRECISION_BALANCE
  );
  const investmentsTokenAmount = +getAmountFormatted(
    project?.total_investments || ZERO,
    projectTokenMeta.decimals,
    PRECISION_BALANCE
  );

  const isProjectActive = project?.is_active;
  const isResetting = userProject?.status == EActionStatus.Resetting;

  const isDonationsWithdrawDisabled = project
    ? !project.update_pitch ||
      now <= project.update_pitch.starts_on ||
      !isProjectActive
    : true;

  const isInvestmentsWithdrawDisabled = project
    ? !project.investors_pitch ||
      now <= project.investors_pitch.starts_on ||
      !isProjectActive
    : true;

  const grants = Object.entries(project?.total_grants || {});

  return (
    <div className={classes.balancesBox}>
      <div className={classes.balancesBoxSection}>
        <div className={classes.switchControl}>
          <span>
            <Translate value="projectCabinetPage.donations" />
          </span>
          {project && !isResetting && (
            <Switch
              disabled={!isProjectActive}
              onChange={(isActive) =>
                subServiceActions.updateDonationStatus(isActive)
              }
              checked={!!project?.donations_available}
            />
          )}
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.withdrawInfo}>
            <span className={classes.tokenAmount}>{donationsTokenAmount}</span>
            <span className={classes.tokenInfo}>
              {projectTokenMeta.symbol}
              <img src={projectTokenMeta.icon} />
            </span>
          </div>
          {project && !isResetting && (
            <Button
              label={t('projectCabinetPage.withdraw')}
              handleClick={() =>
                subServiceActions.onWithdraw(
                  EContributionType.DONATIONS,
                  project
                )
              }
              disabled={isDonationsWithdrawDisabled}
              extraClass={classes.withdrawBtn}
            />
          )}
        </div>
      </div>
      <div className={classes.balancesBoxSection}>
        <div className={classes.switchControl}>
          <span>
            <Translate value="projectCabinetPage.investments" />
          </span>
          {project && !isResetting && (
            <Switch
              disabled={!isProjectActive}
              onChange={(isActive) => {
                subServiceActions.updateInvestmentsStatus(isActive);
              }}
              checked={!!project?.investments_available}
            />
          )}
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.withdrawInfo}>
            <span className={classes.tokenAmount}>
              {investmentsTokenAmount}
            </span>
            <span className={classes.tokenInfo}>
              {projectTokenMeta.symbol}
              <img src={projectTokenMeta.icon} />
            </span>
          </div>
          {project && !isResetting && (
            <Button
              label={t('projectCabinetPage.withdraw')}
              handleClick={() =>
                subServiceActions.onWithdraw(
                  EContributionType.INVESTMENTS,
                  project
                )
              }
              disabled={isInvestmentsWithdrawDisabled}
              extraClass={classes.withdrawBtn}
            />
          )}
        </div>
      </div>
      {grants.length && (
        <div className={classes.balancesBoxSection}>
          <div className={classes.switchControl}>
            <span>
              <Translate value="projectCabinetPage.grants" />
            </span>
          </div>
          <div className={classes.grantsWrapper}>
            {grants.map(([grantTokenId, grantAmount]) => (
              <div className={classes.infoWrapper}>
                <div className={classes.withdrawInfo}>
                  <span className={classes.tokenAmount}>
                    {roundToLow(
                      +getAmountFormatted(
                        grantAmount,
                        tokens[grantTokenId].decimals,
                        PRECISION_BALANCE
                      ),
                      PRECISION_BALANCE
                    )}
                  </span>
                  <span className={classes.tokenInfo}>
                    {tokens[grantTokenId].symbol}
                    <img loading="lazy" src={tokens[grantTokenId].icon} />
                  </span>
                </div>
                {project && !isResetting && (
                  <Button
                    disabled={!isProjectActive}
                    label={t('projectCabinetPage.withdraw')}
                    handleClick={() =>
                      subServiceActions.onWithdraw(
                        EContributionType.GRANTS,
                        project,
                        grantTokenId
                      )
                    }
                    extraClass={classes.withdrawBtn}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
