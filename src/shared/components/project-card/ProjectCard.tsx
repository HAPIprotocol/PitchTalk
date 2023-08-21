import { useMemo } from 'react';
import { Trans } from 'react-i18next';

import defaultProjectImage from 'assets/images/project-frame.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { PRECISION_BALANCE } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { EInvestmentsView, ParticipatedProject } from 'shared/interfaces';
import { getAmountFormatted, roundToLow } from 'shared/utils/near';
import { selectTokenData } from 'store/selectors/selectTokenData';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

interface IProjectCard {
  project: ParticipatedProject;
  view: EInvestmentsView;
}

export const ProjectCard: React.FC<IProjectCard> = ({
  project: { donatedByUser, investedByUser, ...project },
  view,
}) => {
  const classes = useStyles();
  const {
    decimals,
    symbol,
    price: tokenPrice,
  } = useAppSelector((state) => selectTokenData(state, project.ft_token_id));

  const donates = useMemo(
    () =>
      getAmountFormatted(
        view === EInvestmentsView.BY_USER
          ? donatedByUser
          : project.total_donations,
        decimals,
        PRECISION_BALANCE
      ),
    [view, donatedByUser, project.total_donations, decimals]
  );

  const investments = useMemo(
    () =>
      getAmountFormatted(
        view === EInvestmentsView.BY_USER
          ? investedByUser
          : project.total_investments,
        decimals,
        PRECISION_BALANCE
      ),
    [view, investedByUser, project.total_investments, decimals]
  );

  const donatesInUSN = getAmountFormatted(
    donatedByUser.mul(tokenPrice),
    decimals,
    PRECISION_BALANCE
  );
  const investmentsInUSN = getAmountFormatted(
    investedByUser.mul(tokenPrice),
    decimals,
    PRECISION_BALANCE
  );
  const navigate = useNavigate();

  const goToProjectPage = () => {
    navigate(`${APP_ROUTES.PROJECTS}/${project.project_id}`);
  };

  const { banner } = getCorrectIPFSLinks({ banner: project.banner });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={classes.headerTitle} onClick={goToProjectPage}>
          {project.name}
        </span>
      </div>
      <img
        src={banner || defaultProjectImage}
        className={classes.projectImage}
        loading="lazy"
      />
      <div className={classes.projectDescription}>{project.description}</div>
      <div className={classes.investments}>
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              <Translate value="amounts.donated" />
            </span>
          </div>
          <span className={classes.investmentAmount}>{`${roundToLow(
            +donates,
            PRECISION_BALANCE
          )} ${symbol}`}</span>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{ amount: roundToLow(+donatesInUSN, PRECISION_BALANCE) }}
            />
          </span>
        </div>
        <div className={classes.investmentDivider} />
        <div className={classes.investment}>
          <div className={classes.investmentTitle}>
            <span>
              <Translate value="amounts.invested" />
            </span>
          </div>
          <span className={classes.investmentAmount}>{`${roundToLow(
            +investments,
            PRECISION_BALANCE
          )} ${symbol}`}</span>
          <span className={classes.investmentAmountUSN}>
            <Trans
              i18nKey="amounts.fiatAmount"
              values={{
                amount: roundToLow(+investmentsInUSN, PRECISION_BALANCE),
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
