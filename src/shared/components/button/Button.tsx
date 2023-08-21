import { t } from 'i18next';
import { CSSProperties } from 'react';

import { ITranslationKeys } from 'services/translation';

import { useStyles } from './styles';
import { InfoTooltip } from '../info-tooltip/InfoTooltip';

interface IButtonProps {
  label: ITranslationKeys | string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  wrapperStyles?: CSSProperties;
  buttonStyles?: CSSProperties;
  extraClass?: string;
  translate?: boolean;
  withTitle?: boolean;
  tooltipText?: string;
}

export const Button: React.FC<IButtonProps> = ({
  label,
  handleClick,
  type = 'button',
  disabled = false,
  wrapperStyles,
  extraClass = '',
  buttonStyles,
  translate = true,
  withTitle = false,
  tooltipText = '',
}): JSX.Element => {
  const classes = useStyles();
  const btnLabel = translate ? t(label) : label;

  return (
    <div className={`${classes.container} ${extraClass}`} style={wrapperStyles}>
      <button
        className={classes.button}
        disabled={disabled}
        type={type}
        onClick={handleClick}
        style={buttonStyles}
      >
        <div className={classes.buttonLabelContainer}>
          {withTitle ? (
            <abbr title={btnLabel}>{btnLabel}</abbr>
          ) : (
            <span className={classes.buttonLabel}>{btnLabel}</span>
          )}
          {tooltipText && <InfoTooltip text={tooltipText} />}
        </div>
      </button>
    </div>
  );
};
