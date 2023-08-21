import i18n from 'services/translation';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { ESortedFilterDirection } from 'shared/utils/projectsFiltersUtils';

import { useStyles } from './styles';

type SortedFilterProps = {
  label: string;
  Icon: React.FunctionComponent;
  isSelected: boolean;
  filter: { direction: ESortedFilterDirection };
  onSortingChange: () => void;
  onDirectionChange: (target: ESortedFilterDirection) => void;
  labelLow?: string;
  labelHigh?: string;
};

export const SortedFilter: React.FC<SortedFilterProps> = ({
  label,
  Icon,
  filter,
  onDirectionChange,
  onSortingChange,
  isSelected,
  labelLow,
  labelHigh,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.filterWrapper} onClick={onSortingChange}>
      <div
        className={
          isSelected ? classes.filter + ' ' + classes.enabled : classes.filter
        }
      >
        <Icon />
        <label>{label}</label>
      </div>
      {isSelected && (
        <div className={classes.sortDirectionWrapper}>
          <Checkbox
            checked={filter.direction === ESortedFilterDirection.LOW}
            onChange={() => onDirectionChange(ESortedFilterDirection.LOW)}
            label={labelLow || `${i18n.t('filterModal.low')}`}
          />
          <Checkbox
            checked={filter.direction === ESortedFilterDirection.HIGH}
            onChange={() => onDirectionChange(ESortedFilterDirection.HIGH)}
            label={labelHigh || `${i18n.t('filterModal.high')}`}
          />
        </div>
      )}
    </div>
  );
};
