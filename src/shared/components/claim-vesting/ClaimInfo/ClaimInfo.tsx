import { Vesting } from '@pitchtalk/contract-api-js/dist/core';
import { useEffect, useState } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { useWalletSelector } from 'providers/WalletProvider';
import i18n from 'services/translation';
import { Button } from 'shared/components/button/Button';
import {
  PRECISION_BALANCE,
  DEFAULT_NEAR_DECIMALS,
  ONE_SECOND_IN_MS,
} from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useConditionInterval } from 'shared/hooks/useConditionInterval';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import {
  getAvailableTokens,
  getVestingTokenAmountByPrice,
  isCliffPeriod as checkIsCliffPeriod,
} from 'shared/utils/vestingUtils';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectTokenDataByProjectId } from 'store/selectors/selectTokenDataByProjectId';
import { selectUserInvestmentsByProjectId } from 'store/slices/user';

import { CountDown } from './CountDown';
import { useStyles } from './styles';

interface IClaimInfoProps {
  projectId: number;
  vesting: Vesting;
}

export const ClaimInfo: React.FC<IClaimInfoProps> = ({
  projectId,
  vesting,
}): JSX.Element => {
  const classes = useStyles();
  const { requestSignTransactions } = useWalletSelector();
  const { pitchTalkService } = usePitchTalkServiceContext();
  const [isAllTokensClaimed, setIsAllTokensClaimed] = useState(false);

  const isCliffPeriod = !useConditionInterval(
    () => !checkIsCliffPeriod(vesting.start_sec),
    ONE_SECOND_IN_MS,
    vesting.start_sec - Date.now() - 5 * ONE_SECOND_IN_MS
  );

  const { symbol: projectTokenSymbol, decimals: projectTokenDecimals } =
    useAppSelector((state) => selectTokenDataByProjectId(state, projectId));
  const { symbol: vestingTokenSymbol, decimals: vestingTokenDecimals } =
    useAppSelector((state) => selectTokenData(state, vesting.ft_token_id));

  const { invested } = useAppSelector((state) =>
    selectUserInvestmentsByProjectId(state, projectId)
  );
  const investedFormatted = +getAmountFormatted(
    invested,
    projectTokenDecimals,
    PRECISION_BALANCE
  );

  const vestingPrice = +getAmountFormatted(
    vesting.price,
    DEFAULT_NEAR_DECIMALS,
    PRECISION_BALANCE
  );
  const userTokens = +getAmountFormatted(
    +getVestingTokenAmountByPrice(invested, vestingPrice, projectTokenDecimals),
    DEFAULT_NEAR_DECIMALS
  );
  const availableTokens = getAvailableTokens(userTokens, vesting);

  const claimTokens = async () => {
    if (!projectId || !pitchTalkService) return;
    const transactions = await pitchTalkService.claimVesting(
      projectId,
      vesting.lockup_account_id
    );
    await requestSignTransactions(transactions);
  };

  useEffect(() => {
    const checkIsAllTokensClaimed = async () => {
      if (!pitchTalkService) return;
      try {
        const lockupInfo = await pitchTalkService.getAccountsLockups(
          vesting.lockup_account_id
        );
        setIsAllTokensClaimed(
          lockupInfo
            ? +lockupInfo.total_balance === +lockupInfo.claimed_balance
            : false
        );
      } catch (error) {
        setIsAllTokensClaimed(false);
      }
    };

    if (investedFormatted > 0 && !isCliffPeriod) {
      checkIsAllTokensClaimed();
    }
  }, [investedFormatted, vesting, pitchTalkService, vestingTokenDecimals]);

  return (
    <div className={classes.claimWrapper}>
      <div className={classes.claimInfoWrapper}>
        {investedFormatted > 0 && (
          <div>
            <label>{`${i18n.t('claim.userTokens')}`}</label>
            <span>
              {isCliffPeriod ? '0' : roundToLow(userTokens, PRECISION_BALANCE)}{' '}
              {vestingTokenSymbol}
            </span>
          </div>
        )}
        <div>
          <label>{`${i18n.t('claim.availableTokens')}`}</label>
          <span>
            {isCliffPeriod
              ? '0'
              : roundToLow(availableTokens, PRECISION_BALANCE)}{' '}
            {vestingTokenSymbol}
          </span>
        </div>
        <div>
          <label>{`${i18n.t('claim.tokenPrice')}`}</label>
          <span>
            1 {vestingTokenSymbol} ={' '}
            {roundToLow(vestingPrice, PRECISION_BALANCE)} {projectTokenSymbol}
          </span>
        </div>
      </div>
      {investedFormatted > 0 && (
        <div className={classes.controlsWrapper}>
          <Button
            disabled={isAllTokensClaimed || isCliffPeriod}
            handleClick={claimTokens}
            label={
              isAllTokensClaimed && !isCliffPeriod
                ? 'claim.allClaimed'
                : 'claim.claimBtn'
            }
            extraClass={classes.claimButton}
          />
        </div>
      )}
      <CountDown vesting={vesting} />
    </div>
  );
};
