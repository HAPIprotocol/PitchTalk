import React from 'react';

import {
  ERatingBy,
  ERatingTableType,
  ERatingToken,
  IRatingItem,
} from 'pages/rating-page/constants';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { PARAMS, PRECISION_BALANCE } from 'shared/constants';
import { roundToLow } from 'shared/utils/near';

import { useStyles } from './styles';

interface IRatingItemProps {
  i: number;
  ratingItem: IRatingItem;
  timeKey: ERatingBy;
  token: ERatingToken;
  tableType: ERatingTableType;
}

export const RatingItem: React.FC<IRatingItemProps> = ({
  i,
  ratingItem,
  timeKey,
  token,
  tableType,
}) => {
  const classes = useStyles({
    banner:
      tableType === ERatingTableType.PROJECTS
        ? ratingItem.banner
        : ratingItem.logo,
  });
  const navigate = useNavigate();

  return tableType === ERatingTableType.PROJECTS ? (
    <div
      className={classes.ratingItem}
      onClick={() =>
        navigate(
          APP_ROUTES.PROJECTS_BY_ID.replace(
            PARAMS.PROJECT_ID,
            ratingItem.id.toString()
          )
        )
      }
      style={{
        backgroundImage: ratingItem.banner,
      }}
    >
      <div className={classes.ratingItemInfo}>
        <p className={classes.ratingItemInfoContent}>
          <span className={classes.ratingItemPos + ` pos-${i + 1}`}>
            {i + 1}
          </span>
          <img loading="lazy" src={ratingItem.logo} />
          <span className={classes.ratingItemName}>{ratingItem.name}</span>
        </p>
      </div>
      <div className={classes.ratingItemAmount}>
        <span>{roundToLow(ratingItem[timeKey], PRECISION_BALANCE)}</span>
        <span className={classes.ratingItemAmountToken}> {token}</span>
      </div>
    </div>
  ) : (
    <a
      className={classes.ratingItem}
      href={ratingItem.url}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className={classes.ratingItemInfo}>
        <p className={classes.ratingItemInfoContent}>
          <span className={classes.ratingItemPos + ` pos-${i + 1}`}>
            {i + 1}
          </span>
          <span>{ratingItem.name}</span>
        </p>
      </div>
      <div className={classes.ratingItemAmount}>
        {roundToLow(ratingItem[timeKey], PRECISION_BALANCE)} {token}
      </div>
    </a>
  );
};
