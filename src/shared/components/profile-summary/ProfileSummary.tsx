import { memo } from 'react';
import { Trans } from 'react-i18next';

import { ReactComponent as AccountIcon } from 'assets/images/icons/person-active-icon.svg';
import usdtIcon from 'assets/images/icons/usdt-icon.png';
import {
  DEFAULT_NEAR_DECIMALS,
  PRECISION_BALANCE,
  USDT_TOKEN_NAME,
} from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import { selectIsGrantUser } from 'store/slices/funds';
import {
  selectUserDisplayName,
  selectUserInvestments,
} from 'store/slices/user';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

export const ProfileSummary: React.FC = memo(() => {
  const {
    totalSpent: { donations, investments },
  } = useAppSelector(selectUserInvestments);
  const { isGrantUser } = useAppSelector(selectIsGrantUser);
  const userName = useAppSelector(selectUserDisplayName);

  const classes = useStyles({ isGrantUser });
  const donates = Number(getAmountFormatted(donations, DEFAULT_NEAR_DECIMALS));
  const invests = Number(
    getAmountFormatted(investments, DEFAULT_NEAR_DECIMALS)
  );

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <div className={classes.accountIcon}>
          <AccountIcon />
        </div>
        <div className={classes.account}>
          <div className={classes.accountName}>{userName}</div>
        </div>
      </div>
      <div className={classes.investments}>
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              <Translate value="amounts.donated" />
            </span>
          </div>
          <span className={classes.investmentAmount}>
            <span className={classes.amount}>{`${roundToLow(
              donates,
              PRECISION_BALANCE
            )}`}</span>
            <span className={classes.tokenInfo}>
              <img src={usdtIcon} loading="lazy" />
              {USDT_TOKEN_NAME}
            </span>
          </span>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{ amount: roundToLow(donates, PRECISION_BALANCE) }}
            />
          </span>
        </div>
        <div className={classes.verticalLine} />
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              <Translate value="amounts.invested" />
            </span>
          </div>
          <span className={classes.investmentAmount}>
            <span className={classes.amount}>{`${roundToLow(
              invests,
              PRECISION_BALANCE
            )}`}</span>
            <span className={classes.tokenInfo}>
              <img src={usdtIcon} loading="lazy" />
              {USDT_TOKEN_NAME}
            </span>
          </span>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{ amount: roundToLow(invests, PRECISION_BALANCE) }}
            />
          </span>
        </div>
      </div>
    </div>
  );
});
