import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

interface ISwitch {
  onChange: (isActive: boolean) => void;
  checked: boolean;
  disabled?: boolean;
}

export const Switch: React.FC<ISwitch> = ({ onChange, checked, disabled }) => {
  const classes = useStyles();
  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={classes.slider}>
        <span>
          <Translate value={checked ? 'switch.on' : 'switch.off'} />
        </span>
      </span>
    </label>
  );
};
