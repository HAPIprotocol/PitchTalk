import { useParams } from 'services/router';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectEventDescription } from 'store/selectors/events';

import { useStyles } from './styles';

export interface IEventDescription {
  title: string;
  text: string;
}

export const Description: React.FC = () => {
  const { eventId } = useParams();
  const classes = useStyles();
  const eventDescription = useAppSelector((_) =>
    selectEventDescription(_, Number(eventId))
  );

  if (!Object.keys(eventDescription).length) return null;

  return (
    <div className={classes.eventDescriptionWrapper}>
      {Object.entries(eventDescription).map(([id, { title, text }]) => (
        <div key={id} className={classes.eventDescriptionBlock}>
          <p
            className={classes.eventDescriptionBlockHeader}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className={classes.eventDescriptionBlockBody}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      ))}
    </div>
  );
};
