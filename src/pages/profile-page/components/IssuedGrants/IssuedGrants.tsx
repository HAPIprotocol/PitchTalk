import { format } from 'date-fns';
import { useMemo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import i18n from 'services/translation';
import { Translate } from 'shared/components/translate/Translate';
import { DEFAULT_NEAR_DECIMALS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { getAmountFormatted } from 'shared/utils/near';
import { selectProjects } from 'store/selectors/projects';
import { selectTokens } from 'store/slices/tokens';
import { selectIssuedGrants } from 'store/slices/user';

import { useStyles } from './styles';

export const IssuedGrants = () => {
  const classes = useStyles();

  const projects = useAppSelector(selectProjects);
  const issuedGrants = useAppSelector(selectIssuedGrants);
  const tokens = useAppSelector(selectTokens);
  const grantsToRender = useMemo(
    () =>
      [...issuedGrants].sort(({ date: dateA }, { date: dateB }) => {
        return dateB - dateA;
      }),
    [issuedGrants]
  );

  return (
    <div className={classes.grantsTableWrapper}>
      <div className={classes.grantsTableHead}>
        <span>
          <Translate value="profilePage.issuedGrants" />
        </span>
      </div>
      {grantsToRender?.length > 0 ? (
        <ul className={classes.grantsTableBody}>
          {grantsToRender.map((grant) => {
            const { project_id, logo, name } =
              projects.find(
                ({ project_id }) => project_id === grant.project_id
              ) || {};
            const token = tokens[grant.ft_token_id];
            const grantAmount = getAmountFormatted(
              grant.amount,
              token?.decimals ?? DEFAULT_NEAR_DECIMALS
            );
            const { correctLogo } = getCorrectIPFSLinks({ correctLogo: logo });

            const projectUrl = `/events/${project_id}`;

            return (
              project_id && (
                <li className={classes.grantItem} key={grant.date}>
                  <a className={classes.grantCompany} href={projectUrl}>
                    <img src={correctLogo} loading="lazy" />
                    <span>{name}</span>
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
      ) : (
        <div className={classes.noGrants}>
          <Translate value="profilePage.noGrants" />
        </div>
      )}
    </div>
  );
};
