import { Translate } from 'shared/components/translate/Translate';
import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';

export const usePitchesSlide = () => {
  const classes = useStyles();

  const getPitchData = ({
    pitchTypeKey,
  }: {
    pitchTypeKey: 'intro' | 'update' | 'invest';
  }) => (
    <div className={classes.scrollBlockContainer}>
      <div className={classNames(classes.pitch, pitchTypeKey)}>
        <Translate value={`pitchTypes.${pitchTypeKey}`} />
      </div>
      <div className={classes.pitchTextContent}>
        <p className={classes.pitchName}>
          <Translate value={`pitchTypes.${pitchTypeKey}Pitch`} />
        </p>
        <p className={classes.pitchContent}>
          <Translate
            value={`aboutPage.howItWork.${pitchTypeKey}PitchContent`}
          />
        </p>
      </div>
    </div>
  );

  return [
    getPitchData({ pitchTypeKey: 'intro' }),
    getPitchData({ pitchTypeKey: 'update' }),
    getPitchData({ pitchTypeKey: 'invest' }),
  ];
};
