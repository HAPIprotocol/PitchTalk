import { useStyles } from './styles';

interface ICheckbox {
  onChange: () => void;
  checked: boolean;
  label?: string;
  disabled?: boolean;
  disabledReason?: string;
}
export const Checkbox: React.FC<ICheckbox> = ({
  onChange,
  checked,
  label,
  disabled,
  disabledReason,
}) => {
  const classes = useStyles();
  return (
    <label
      className={classes.container + (disabled ? ' disabled' : '')}
      title={disabled && disabledReason ? disabledReason : ''}
    >
      <input
        type="checkbox"
        name="checkbox"
        className={classes.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
};
