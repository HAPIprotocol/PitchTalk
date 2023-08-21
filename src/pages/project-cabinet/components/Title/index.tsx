import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import { ITranslationKeys } from 'services/translation';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';

import { useStyles } from './styles';

type TitleProps = {
  label: ITranslationKeys;
  tooltipId?: string;
};

export const Title: React.FC<TitleProps> = ({
  label,
  tooltipId = EMPTY_STRING,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.title}>
      <h5>
        <Translate value={label} />
      </h5>
      <QuestionIcon data-tooltip-id={tooltipId} />
    </div>
  );
};
