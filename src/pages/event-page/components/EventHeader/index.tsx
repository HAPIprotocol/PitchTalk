import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { EMPTY_STRING } from 'shared/constants';

import { useStyles } from './styles';

interface IEventHeaderProps {
  banner: string | undefined;
}

export const EventHeader: React.FC<IEventHeaderProps> = ({ banner }) => {
  const classes = useStyles(
    getCorrectIPFSLinks({ banner: banner || EMPTY_STRING })
  );

  return (
    <div className={classes.eventHeader}>
      <div className={classes.eventBanner} />
    </div>
  );
};
