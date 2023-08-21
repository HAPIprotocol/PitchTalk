import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import i18n from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  getAmountFormatted,
  getFiatAmount,
  roundToLow,
} from 'shared/utils/near';
import { selectOnChainProjectById } from 'store/selectors/projects';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectDonationsByProjectId } from 'store/slices/donations';

import { useStyles } from './styles';

export const InvestPanel: React.FC<{
  projectId: number;
  investmentsAvailable?: { available: boolean; reason: string };
  donationsAvailable?: { available: boolean; reason: string };
}> = ({
  projectId,
  investmentsAvailable = { available: false, reason: '' },
  donationsAvailable = { available: false, reason: '' },
}) => {
  const classes = useStyles();
  const { donate, invest } = usePitchTalkServiceContext();

  const { total_donations: donated, total_investments: invested } =
    useAppSelector((state) => selectDonationsByProjectId(state, projectId));

  const project =
    useAppSelector((state) => selectOnChainProjectById(state, projectId)) ||
    ({} as Project);

  const { decimals, symbol, icon, price } = useAppSelector((state) =>
    selectTokenData(state, project?.ft_token_id)
  );

  const donates = useMemo(
    () => getAmountFormatted(donated, decimals, PRECISION_BALANCE),
    [donated, decimals]
  );
  const investments = useMemo(
    () => getAmountFormatted(invested, decimals, PRECISION_BALANCE),
    [invested, decimals]
  );

  const donatesInUSN = getFiatAmount(
    donates,
    price,
    undefined,
    PRECISION_BALANCE
  );
  const investmentsInUSN = getFiatAmount(
    investments,
    price,
    undefined,
    PRECISION_BALANCE
  );

  return (
    <div className={classes.actionButtons}>
      <div className={classes.actionButton}>
        <div className={classes.investInfoWrapper}>
          <div className={classes.currencyWrapper}>
            <label className={classes.currencyLabel}>{`${i18n.t(
              'investPanel.currency'
            )}`}</label>
            <span className={classes.currencyInfo}>
              {icon && <img src={icon} loading="lazy" />}
              <span>{symbol}</span>
            </span>
          </div>
          <div className={classes.totalInvestedWrapper}>
            <label className={classes.currencyLabel}>{`${i18n.t(
              'investPanel.totalDonated'
            )}`}</label>
            <span className={classes.investInfo}>
              <span className={classes.investAmount}>{`${roundToLow(
                +donates,
                PRECISION_BALANCE
              )} `}</span>
              <span className={classes.investCurrency}>{`${symbol}`}</span>
            </span>
            <div className={classes.convertedAmount}>
              <Trans
                i18nKey="amounts.fiatAmount"
                values={{
                  amount: roundToLow(+donatesInUSN, PRECISION_BALANCE),
                }}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!donationsAvailable.available}
          label={'investPanel.donate'}
          handleClick={() => donate(projectId, project.ft_token_id)}
          extraClass={classes.button}
          tooltipText={donationsAvailable.reason}
        />
      </div>
      <div className={classes.actionButton}>
        <div className={classes.investInfoWrapper}>
          <div className={classes.currencyWrapper}>
            <label className={classes.currencyLabel}>{`${i18n.t(
              'investPanel.currency'
            )}`}</label>
            <span className={classes.currencyInfo}>
              {icon && <img src={icon} loading="lazy" />}
              <span>{symbol}</span>
            </span>
          </div>
          <div className={classes.totalInvestedWrapper}>
            <label className={classes.currencyLabel}>{`${i18n.t(
              'investPanel.totalInvested'
            )}`}</label>
            <span className={classes.investInfo}>
              <span className={classes.investAmount}>{`${roundToLow(
                +investments,
                PRECISION_BALANCE
              )} `}</span>
              <span className={classes.investCurrency}>{`${symbol}`}</span>
            </span>
            <div className={classes.convertedAmount}>
              <Trans
                i18nKey="amounts.fiatAmount"
                values={{
                  amount: roundToLow(+investmentsInUSN, PRECISION_BALANCE),
                }}
              />
            </div>
          </div>
        </div>
        <Button
          label={'investPanel.invest'}
          disabled={!investmentsAvailable.available}
          extraClass={classes.button}
          handleClick={() => invest(project)}
          tooltipText={investmentsAvailable.reason}
        />
      </div>
    </div>
  );
};
