import { format } from 'date-fns';

import { useStyles } from './styles';

type DateTimePickerProps = {
  date: number;
  setDate: (date: number) => void;
  inputEC?: string;
  containerEC?: string;
  readOnly?: boolean;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  setDate,
  inputEC = '',
  containerEC = '',
  readOnly = false,
  inputProps,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.inputHolder + ' ' + containerEC}>
      <input
        type="datetime-local"
        className={classes.input + ' ' + inputEC}
        value={
          date ? format(date, 'yyyy-MM-dd') + 'T' + format(date, 'HH:mm') : ''
        }
        onChange={(e) => setDate(new Date(e.target.value).getTime())}
        readOnly={readOnly}
        {...inputProps}
      />
    </div>
  );
};
