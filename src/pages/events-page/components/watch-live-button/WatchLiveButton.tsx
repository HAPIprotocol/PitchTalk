import format from 'date-fns/format';

import { ReactComponent as LiveIcon } from 'assets/images/icons/live-icon.svg';
import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

export const WatchLiveButton: React.FC<{
  startOn: number;
  duration: number;
  redirectToLivePitch: () => void;
}> = ({ startOn, duration, redirectToLivePitch }) => {
  const classes = useStyles();
  const startsOn = format(startOn, 'K aaa');
  const endsOn = format(startOn + duration, 'K aaa');
  return (
    <div className={classes.showLive} onClick={redirectToLivePitch}>
      <div className={classes.liveIcon}>
        <LiveIcon />
      </div>
      <div className={classes.label}>
        <span className={classes.watchNow}>
          <Translate value="currentPitchTitle.live" />
        </span>
        <span>{`| ${startsOn} - ${endsOn} |`}</span>
      </div>
    </div>
  );
};
