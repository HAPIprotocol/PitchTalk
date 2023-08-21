import { format } from 'date-fns';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import i18n from 'services/translation';
import { DEFAULT_NEAR_DECIMALS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted } from 'shared/utils/near';
import { isGrantsAvailable } from 'shared/utils/projectUtils';
import { selectOnChainProjectById } from 'store/selectors/projects';
import { selectFunds, selectIsGrantUser } from 'store/slices/funds';
import { selectProjectGrants } from 'store/slices/grants';
import { selectTokens } from 'store/slices/tokens';
import { selectProjectVesting } from 'store/slices/vesting';

import { useStyles } from './styles';
import { Button } from '../button/Button';
import { Translate } from '../translate/Translate';

interface IGrantTableProps {
  projectId: number;
}

export const GrantsTable: React.FC<IGrantTableProps> = ({ projectId }) => {
  const { isGrantUser, isGrantUserActive } = useAppSelector(selectIsGrantUser);
  const project = useAppSelector((state) =>
    selectOnChainProjectById(state, projectId)
  );
  const tokens = useAppSelector(selectTokens);
  const vesting = useAppSelector((state) =>
    selectProjectVesting(state, projectId)
  );
  const grants = useAppSelector((state) =>
    selectProjectGrants(state, projectId)
  );

  const funds = useAppSelector(selectFunds);
  const { makeGrant } = usePitchTalkServiceContext();

  const classes = useStyles({ isGrantUser, isVesting: !!vesting });

  if (!(grants.length || isGrantUser)) return null;

  return (
    <div className={classes.grantsTableWrapper}>
      <div className={classes.grantsTableHead}>
        <span>
          <Translate value="investPanel.grants" />
        </span>
        {isGrantUser && (
          <Button
            label="Grant"
            handleClick={() =>
              makeGrant(
                projectId,
                isGrantUserActive,
                project && isGrantsAvailable
              )
            }
          />
        )}
      </div>
      {!!grants.length && (
        <ul className={classes.grantsTableBody}>
          {grants.map((grant) => {
            const fund = funds.find(
              (fund) => fund.account_id === grant.fund_id
            );
            const token = tokens[grant.ft_token_id];
            const grantAmount = getAmountFormatted(
              grant.amount,
              token?.decimals ?? DEFAULT_NEAR_DECIMALS
            );

            const { correctLogo } = getCorrectIPFSLinks({
              correctLogo: fund?.logo,
            });
            return (
              fund && (
                <li className={classes.grantItem} key={grant.date}>
                  <a className={classes.grantCompany} href={fund.web_url}>
                    <img src={correctLogo} loading="lazy" />
                    <span>{fund.name}</span>
                  </a>
                  <span className={classes.grantDate}>
                    {format(grant.date, 'dd.MM.y')}
                  </span>
                  <span className={classes.grantAmount}>
                    {`${i18n.t('grantsTable.amount', {
                      amount: grantAmount,
                      token: token?.symbol ?? '',
                    })}`}
                  </span>
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
};
