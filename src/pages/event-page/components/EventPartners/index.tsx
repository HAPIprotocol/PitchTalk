import { t } from 'i18next';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useParams } from 'services/router';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectEventPartners } from 'store/selectors/events';

import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

export const EventPartners: React.FC = () => {
  const { eventId } = useParams();
  const classes = useStyles();
  const partners = useAppSelector((_) =>
    selectEventPartners(_, Number(eventId))
  );

  if (!partners.length) return null;

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.partners')} />
      <div className={classes.partnersList}>
        {partners.map((imgUrl, i) => {
          const { image } = getCorrectIPFSLinks({ image: imgUrl });
          return (
            <div className={classes.partnerItem} key={i + imgUrl}>
              <div
                style={{ backgroundImage: `url(${image})` }}
                className={classes.partnerItemImg}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
