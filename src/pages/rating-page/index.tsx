import sortBy from 'lodash/sortBy';
import { useState } from 'react';

import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';
import { APP_ROUTES } from 'routes';
import { Link } from 'services/router';
import { TogglePanel } from 'shared/components/toggle-panel/TogglePanel';
import { Translate } from 'shared/components/translate/Translate';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  selectFundsRating,
  selectProjectsRating,
} from 'store/selectors/selectProjectWithRatings';

import { RatingItem } from './components';
import {
  ERatingBy,
  ERatingTableType,
  ERatingToken,
  timeViewToggleConfig,
  tokensViewToggleConfig,
} from './constants';
import { useStyles } from './styles';

interface IRatingPageProps {
  tableType?: ERatingTableType;
}

const RatingPage: React.FC<IRatingPageProps> = ({
  tableType = ERatingTableType.PROJECTS,
}) => {
  const classes = useStyles();
  const [sortByKey, setSortByKey] = useState(ERatingBy.ALL);
  const [token, setToken] = useState(ERatingToken.USDT);

  const ratingProjects = useAppSelector((state) =>
    selectProjectsRating(state, token)
  );
  const ratingFunds = useAppSelector((state) =>
    selectFundsRating(state, token)
  );

  const isProjectsRating = tableType === ERatingTableType.PROJECTS;

  const items = isProjectsRating
    ? ratingProjects.filter((project) => project[sortByKey] > 0)
    : ratingFunds.filter((fund) => fund[sortByKey] > 0);

  return (
    <div className={classes.container}>
      <div className={classes.redirectBtnContainer}>
        <Link
          className={classes.redirectButton}
          to={
            isProjectsRating
              ? APP_ROUTES.RATING_FUNDS
              : APP_ROUTES.RATING_PROJECTS
          }
        >
          <Translate
            value={
              !isProjectsRating ? 'ratings.rankProjects' : 'ratings.rankFunds'
            }
          />
          <ArrowRightIcon />
        </Link>
      </div>
      <h3 className={classes.pageHeader}>
        <Translate
          value={
            tableType === ERatingTableType.PROJECTS
              ? 'ratings.projectsRating'
              : 'ratings.fundsRating'
          }
        />
      </h3>
      <div className={classes.controlsWrapper}>
        <TogglePanel
          buttons={timeViewToggleConfig}
          containerStyles={classes.viewToggle}
          buttonStyles={classes.viewToggleButton}
          handler={setSortByKey}
          toggleValue={sortByKey}
        />
        <TogglePanel
          buttons={tokensViewToggleConfig}
          containerStyles={classes.viewToggleTokens}
          buttonStyles={classes.viewToggleButton}
          handler={setToken}
          toggleValue={token}
        />
      </div>
      {items.length ? (
        <div className={classes.ratingTable}>
          {/* <div className={classes.ratingTableHead}>
            <div className={classes.ratingTableHeadItems}>{tableType}</div>
            <div className={classes.ratingTableHeadAmounts}>{sortByKey}</div>
          </div> */}
          <div className={classes.ratingTableBody}>
            {sortBy(items, sortByKey)
              .reverse()
              .map((ratingItem, i) => (
                <RatingItem
                  i={i}
                  key={crypto.randomUUID()}
                  ratingItem={ratingItem}
                  token={token}
                  timeKey={sortByKey}
                  tableType={tableType}
                />
              ))}
          </div>
        </div>
      ) : (
        <h4 className={classes.emptyTable}>
          <Translate value="ratings.emptyRating" />
        </h4>
      )}
    </div>
  );
};

export default RatingPage;
