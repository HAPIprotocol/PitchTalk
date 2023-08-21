import { EventsList } from './components/events-list/EventsList';
// import { PitchesList } from './components/pitches-list/PitchesList';
import { useStyles } from './styles';

const EventsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <EventsList />
        {/* <PitchesList /> */}
      </div>
    </div>
  );
};

export default EventsPage;
