import { Project } from '@pitchtalk/contract-api-js/dist/core';
import Big from 'big.js';
import { useMemo, useState } from 'react';
import { Trans } from 'react-i18next';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { PRECISION_BALANCE, NEAR_TOKEN_NAME } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { EInvestmentsView, IDonateInvestMap } from 'shared/interfaces';
import {
  getAmountFormatted,
  getFiatAmount,
  roundToLow,
} from 'shared/utils/near';
import { selectOnChainProjectById } from 'store/selectors/projects';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectDonationsByProjectId } from 'store/slices/donations';
import { selectUserInvestmentsByProjectId } from 'store/slices/user';

import { investmentsToggleConfig } from './constants';
import { useStyles } from './styles';
import { Button } from '../button/Button';
import { TogglePanel } from '../toggle-panel/TogglePanel';
import { Translate } from '../translate/Translate';

interface IInvestSummary {
  totalSpent?: IDonateInvestMap<Big>;
  totalSpentByUser?: IDonateInvestMap<Big>;
  initialValue: EInvestmentsView;
  wrapperStyles?: string;
  showButton?: boolean;
  showToggle?: boolean;
  projectId?: number;
  donationsAvailable?: { available: boolean; reason: string };
  investmentsAvailable?: { available: boolean; reason: string };
}

export const InvestSummary: React.FC<IInvestSummary> = ({
  projectId = 0,
  initialValue,
  wrapperStyles = '',
  showButton = false,
  showToggle = false,
  donationsAvailable = { available: false, reason: '' },
  investmentsAvailable = { available: false, reason: '' },
}) => {
  const classes = useStyles();

  const { total_donations: totalDonated, total_investments: totalInvested } =
    useAppSelector((state) => selectDonationsByProjectId(state, projectId));

  const { donated: userDonated, invested: userInvested } = useAppSelector(
    (state) => selectUserInvestmentsByProjectId(state, projectId)
  );

  const [donationsViewToggle, setDonationsViewToggle] =
    useState<EInvestmentsView>(initialValue);
  const [investmentsViewToggle, setInvestmentsViewToggle] =
    useState<EInvestmentsView>(initialValue);

  const { donate, invest } = usePitchTalkServiceContext();
  const project =
    useAppSelector((state) => selectOnChainProjectById(state, projectId)) ||
    ({} as Project);

  const {
    decimals,
    symbol,
    icon,
    price: tokenPrice,
  } = useAppSelector((state) => selectTokenData(state, project?.ft_token_id));

  const donates = useMemo(() => {
    const donations =
      donationsViewToggle === EInvestmentsView.BY_USER
        ? userDonated
        : totalDonated;

    return getAmountFormatted(donations, decimals);
  }, [donationsViewToggle, userDonated, totalDonated, decimals]);

  const invested = useMemo(() => {
    const investments =
      investmentsViewToggle === EInvestmentsView.BY_USER
        ? userInvested
        : totalInvested;

    return getAmountFormatted(investments, decimals);
  }, [investmentsViewToggle, userInvested, totalInvested, decimals]);

  const donatesFiat = getFiatAmount(donates, tokenPrice);
  const investedFiat = getFiatAmount(invested, tokenPrice);

  return (
    <div className={classes.investments + ` ${wrapperStyles}`}>
      <div className={classes.donationContainer}>
        {showToggle && (
          <TogglePanel
            buttons={investmentsToggleConfig}
            buttonStyles={classes.investmentToggleButton}
            containerStyles={classes.investmentToggle}
            handler={setDonationsViewToggle}
            toggleValue={donationsViewToggle}
          />
        )}
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              {showToggle ? (
                <Translate
                  value={
                    donationsViewToggle === EInvestmentsView.BY_USER
                      ? 'amounts.myDonations'
                      : 'amounts.totalDonated'
                  }
                />
              ) : (
                <Translate value="amounts.donated" />
              )}
            </span>
          </div>
          <div className={classes.investmentAmount}>
            <span className={classes.amount}>
              {roundToLow(+donates, PRECISION_BALANCE)}
            </span>
            <span className={classes.tokenInfo}>
              <img src={icon} loading="lazy" />
              {symbol || NEAR_TOKEN_NAME}
            </span>
          </div>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{ amount: roundToLow(+donatesFiat, PRECISION_BALANCE) }}
            />
          </span>
        </div>
        {showButton && (
          <Button
            extraClass={classes.buttonStyles}
            disabled={!donationsAvailable.available}
            label="investPanel.donate"
            handleClick={() => donate(projectId, project.ft_token_id)}
            tooltipText={donationsAvailable.reason}
          />
        )}
      </div>
      <div className={classes.verticalLine} />
      <div className={classes.investmentContainer}>
        {showToggle && (
          <TogglePanel
            buttons={investmentsToggleConfig}
            buttonStyles={classes.investmentToggleButton}
            containerStyles={classes.investmentToggle}
            handler={setInvestmentsViewToggle}
            toggleValue={investmentsViewToggle}
          />
        )}
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              {showToggle ? (
                <Translate
                  value={
                    investmentsViewToggle === EInvestmentsView.BY_USER
                      ? 'amounts.myInvestments'
                      : 'amounts.totalInvestments'
                  }
                />
              ) : (
                <Translate value="amounts.invested" />
              )}
            </span>
          </div>
          <div className={classes.investmentAmount}>
            <span className={classes.amount}>{`${roundToLow(
              +invested,
              PRECISION_BALANCE
            )}`}</span>
            <span className={classes.tokenInfo}>
              <img src={icon} loading="lazy" />
              {symbol || NEAR_TOKEN_NAME}
            </span>
          </div>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{ amount: roundToLow(+investedFiat, PRECISION_BALANCE) }}
            />
          </span>
        </div>
        {showButton && (
          <Button
            extraClass={classes.buttonStyles}
            disabled={!investmentsAvailable.available}
            label="investPanel.invest"
            handleClick={() => invest(project)}
            tooltipText={investmentsAvailable.reason}
          />
        )}
      </div>
    </div>
  );
};
