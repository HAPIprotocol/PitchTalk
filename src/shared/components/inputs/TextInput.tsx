import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';

interface ITextInputProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  inputExtraClass?: string;
  errorExtraClass?: string;
  containerExtraClass?: string;
  infoLabelExtraClass?: string;
  endAdornmentExtraClass?: string;
  readOnly?: boolean;
  placeHolder?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  infoLabel?: string;
  endAdornment?: string;
}

export const TextInput: React.FC<ITextInputProps> = ({
  value,
  onChange,
  error,
  inputExtraClass = '',
  errorExtraClass = '',
  containerExtraClass = '',
  readOnly,
  placeHolder,
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
        tabIndex={0}
        className={classNames(
          containerExtraClass,
          error ? classes.errorContainer : classes.container,
          !readOnly && classes.borderFocus
        )}
      >
        <div className={classes.inputHolder}>
          <input
            value={value}
            className={classNames(classes.input, inputExtraClass)}
            onChange={onChange}
            type="text"
            readOnly={readOnly}
            placeholder={placeHolder}
            {...inputProps}
          />
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
        <span className={classNames(classes.errorMessage, errorExtraClass)}>
          {error}
        </span>
      )}
    </>
  );
};
