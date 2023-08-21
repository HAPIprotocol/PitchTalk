import { useControls } from 'pages/event-page/useControls';
import { useParams } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { isEventEnded, isEventVoteEnded } from 'shared/utils/eventsUtils';
import { selectEventById } from 'store/selectors/events';

import { useStyles } from './styles';

export const ParticipateButtons: React.FC = () => {
  const { eventId } = useParams();
  const classes = useStyles();
  const event = useAppSelector((_) => selectEventById(_, Number(eventId)));
  const {
    participateAsProject,
    participateAsReferee,
    isUserParticipantReferee,
    isUserParticipantProject,
  } = useControls(Number(eventId));

  return (
    <div className={classes.participateButtonsWrapper}>
      {(!isEventVoteEnded(event) || isUserParticipantReferee) && (
        <Button
          extraClass={
            isUserParticipantReferee
              ? classes.participated
              : classes.participateBtnReferee
          }
          label={
            isUserParticipantReferee
              ? 'events.participatedAsReferee'
              : 'events.becomeReferee'
          }
          handleClick={
            isUserParticipantReferee ? () => ({}) : () => participateAsReferee()
          }
          disabled={!event?.serverEvent}
        />
      )}
      {(!isEventEnded(event) || isUserParticipantProject) && (
        <Button
          extraClass={
            isUserParticipantProject
              ? classes.participated
              : classes.participateBtn
          }
          label={
            isUserParticipantProject
              ? 'events.participatedAsProject'
              : 'events.becomeParticipant'
          }
          handleClick={
            isUserParticipantProject ? () => ({}) : () => participateAsProject()
          }
          disabled={!event?.serverEvent}
        />
      )}
    </div>
  );
};
