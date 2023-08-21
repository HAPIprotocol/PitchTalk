import { t } from 'i18next';
import { memo } from 'react';

import { useParams } from 'services/router';
import { EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { classNames } from 'shared/styles/theme';
import { selectEventHackathonPrizes } from 'store/selectors/events';

import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

export const HackathonPrizes: React.FC = memo(() => {
  const { eventId } = useParams();
  const classes = useStyles();
  const prizes = useAppSelector((_) =>
    selectEventHackathonPrizes(_, Number(eventId))
  );

  if (!prizes?.length) return null;

  const sortedPrizes = [...prizes].sort((a, b) => a.order - b.order);

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.prizes')} />
      <div>
        <div className={classes.prizesWrapper}>
          {sortedPrizes.map((prize) => (
            <div className={classes.prizeItem} key={prize.id}>
              <p className={classes.prizePosition}>
                {`${t('events.hackathon.prize', {
                  place: prize.position,
                })}`}
              </p>
              <div className={classes.prizeMeta}>
                {!!prize.amount && (
                  <p className={classes.prizeAmount}>{prize.amount}</p>
                )}
                {!!prize.description && (
                  <p
                    className={classNames(
                      classes.prizeDescription,
                      prize.amount ? EMPTY_STRING : classes.fullHeight
                    )}
                  >
                    {prize.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
