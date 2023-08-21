import { EPitchType } from '@pitchtalk/contract-api-js';

import { useStyles } from './styles';

interface IPitchStatusLabelProps {
  stage?: EPitchType;
  styles?: Record<string, string>;
  extraClasses?: string;
}

export const PitchStatusLabel: React.FC<IPitchStatusLabelProps> = ({
  stage = EPitchType.Initial,
  styles,
  extraClasses,
}) => {
  const classes = useStyles({ stage });

  return (
    <label
      className={[classes.pitchStatusLabel, extraClasses].join(' ')}
      style={styles}
    >
      {stage === EPitchType.Investment ? 'Invest' : stage}
    </label>
  );
};
