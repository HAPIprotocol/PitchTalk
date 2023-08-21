import { memo } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectPartners } from 'store/slices/metaData';

import { useStyles } from './styles';

export const Partners: React.FC = memo(() => {
  const partners = useAppSelector(selectPartners);
  const classes = useStyles();

  return (
    <div className={classes.partnersContainer}>
      {partners.map(({ image, name, id }, i) => {
        const imgUrl = getCorrectIPFSLinks({ image }).image;
        return (
          <div
            style={{ backgroundImage: `url(${imgUrl})` }}
            key={(name || '') + (id || '') + i}
            className={classes.partnerImage}
          />
        );
      })}
    </div>
  );
});
