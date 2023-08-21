import { Vesting } from '@pitchtalk/contract-api-js/dist/core';
import { memo } from 'react';

import i18n from 'services/translation';
import { ECountDownActions, useCountDown } from 'shared/hooks/useCountDown';

import { useStyles } from './styles';

type CountDownProps = {
  vesting: Vesting;
};

const labels = {
  [ECountDownActions.NEXT_UNLOCK_TIME]: `${i18n.t('claim.nextUnlock')}`,
  [ECountDownActions.FULL_UNLOCK]: `${i18n.t('claim.fullUnlocked')}`,
  [ECountDownActions.CLIFF_TIME]: `${i18n.t('claim.cliffTime')}`,
};

export const CountDown: React.FC<CountDownProps> = memo(
  ({ vesting }): JSX.Element => {
    const [countDown, action] = useCountDown(vesting);
    const classes = useStyles();

    return (
      <div className={classes.nextUnlock}>
        <label>{labels[action]}</label>
        <span>{countDown}</span>
      </div>
    );
  }
);
