import { t } from 'i18next';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from 'routes';

import { useStyles } from '../styles';

export const LeaderBoardBtn = memo(() => {
  const classes = useStyles();
  return (
    <Link to={APP_ROUTES.RATING_PROJECTS} className={classes.leaderBoardBtn}>
      {`${t('ratings.leaderBoard')}`}
    </Link>
  );
});
