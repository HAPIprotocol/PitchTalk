import { t } from 'i18next';
import { memo } from 'react';

import { APP_ROUTES } from 'routes';
import { useNavigate, useParams } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { EMPTY_STRING, PARAMS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectEventRefereeParticipants } from 'store/selectors/events';

import { RefereeList } from './RefereeList';
import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

const maxRefereeBlocks = 6;

export const EventReferee: React.FC = memo(() => {
  const { eventId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const judges = useAppSelector((_) =>
    selectEventRefereeParticipants(_, Number(eventId))
  );

  if (!Object.keys(judges).length) return null;

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.referee')} />
      <div className={classes.refereeList}>
        <RefereeList maxBlocks={maxRefereeBlocks} />
      </div>
      {Object.keys(judges).length > maxRefereeBlocks && (
        <Button
          extraClass={classes.seeAllBtn}
          label="events.seeAll"
          handleClick={() =>
            navigate(
              APP_ROUTES.EVENTS_REFEREE_BY_ID.replace(
                PARAMS.EVENT_ID,
                eventId?.toString() || EMPTY_STRING
              )
            )
          }
        />
      )}
    </div>
  );
});
