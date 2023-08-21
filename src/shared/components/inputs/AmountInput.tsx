import { classNames } from 'shared/styles/theme';
import { enforcer } from 'shared/utils/inputUtils';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

interface IAmountInputProps {
  value: number | string;
  onChange: (value: string) => void;
  setMaxAmount?: () => void;
  error: string | null;
  inputExtraClass?: string;
  errorExtraClass?: string;
  containerExtraClass?: string;
  infoLabelExtraClass?: string;
  endAdornmentExtraClass?: string;
  isMaxBtn?: boolean;
  readOnly?: boolean;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  infoLabel?: string;
  endAdornment?: string;
}

export const AmountInput: React.FC<IAmountInputProps> = ({
  value,
  setMaxAmount,
  onChange,
  error,
  inputExtraClass = '',
  errorExtraClass = '',
  containerExtraClass = '',
  isMaxBtn = true,
  readOnly = false,
  inputProps,
  infoLabel = '',
  endAdornment = '',
  infoLabelExtraClass = '',
  endAdornmentExtraClass = '',
}): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <div
        className={
          containerExtraClass +
          ' ' +
          (error ? classes.errorContainer : classes.container)
        }
      >
        <div className={classes.inputHolder}>
          <input
            value={value}
            className={classes.input + ' ' + inputExtraClass}
            onChange={(event) => enforcer(event, onChange)}
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={inputProps?.placeholder || '0.0'}
            minLength={1}
            maxLength={79}
            spellCheck="false"
            readOnly={readOnly}
            {...inputProps}
          />
          {isMaxBtn && (
            <button className={classes.setMaxButton} onClick={setMaxAmount}>
              <Translate value="amounts.max" />
            </button>
          )}
          {infoLabel && (
            <label
              className={classNames(classes.infoLabel, infoLabelExtraClass)}
            >
              {infoLabel}
            </label>
          )}
          {endAdornment && (
            <span
              className={classNames(
                classes.endAdornment,
                endAdornmentExtraClass
              )}
            >
              {endAdornment}
            </span>
          )}
        </div>
      </div>
      {error && (
        <span className={classes.errorMessage + ' ' + errorExtraClass}>
          {error}
        </span>
      )}
    </>
  );
};
