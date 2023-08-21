import { Vesting } from '@pitchtalk/contract-api-js/dist/core';
import Chart from 'react-google-charts';

import { DEFAULT_NEAR_DECIMALS, PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted } from 'shared/utils/near';
import {
  getVestingData,
  getVestingTokenAmountByPrice,
  vestingChartDefaultOptions,
} from 'shared/utils/vestingUtils';
import { selectTokenData } from 'store/selectors/selectTokenData';
import { selectTokenDataByProjectId } from 'store/selectors/selectTokenDataByProjectId';
import { selectUserInvestmentsByProjectId } from 'store/slices/user';

import './styles.css';

interface IVestingInfoProps {
  projectId: number;
  vesting: Vesting;
}

export const VestingInfo: React.FC<IVestingInfoProps> = ({
  projectId,
  vesting,
}): JSX.Element => {
  const projectToken = useAppSelector((state) =>
    selectTokenDataByProjectId(state, projectId)
  );
  const vestingToken = useAppSelector((state) =>
    selectTokenData(state, vesting.ft_token_id)
  );
  const { invested } = useAppSelector((state) =>
    selectUserInvestmentsByProjectId(state, projectId)
  );

  const vestingPrice = Number(
    getAmountFormatted(vesting.price, DEFAULT_NEAR_DECIMALS, PRECISION_BALANCE)
  );
  const userTokens = Number(
    getAmountFormatted(
      Number(
        getVestingTokenAmountByPrice(
          invested,
          vestingPrice,
          projectToken.decimals
        )
      ),
      DEFAULT_NEAR_DECIMALS
    )
  );

  const vestingData = getVestingData(vesting, vestingToken, userTokens);

  return (
    <Chart
      className="vesting-chart"
      chartType="LineChart"
      data={vestingData}
      options={{ ...vestingChartDefaultOptions }}
    />
  );
};
