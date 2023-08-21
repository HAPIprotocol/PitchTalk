import { Dispatch, SetStateAction } from 'react';

import { Translate } from 'shared/components/translate/Translate';
import { IFiltersState } from 'shared/utils/projectsFiltersUtils';

import { useStyles } from './styles';

type FiltersProps = {
  filters: IFiltersState;
  setFilters: Dispatch<SetStateAction<IFiltersState>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const classes = useStyles();
  const onFilterClick = (filter: string, isEnabled: boolean) => {
    setFilters((prevFilters: IFiltersState) => ({
      ...prevFilters,
      projectsStatus: {
        ...prevFilters.projectsStatus,
        [filter]: {
          ...prevFilters.projectsStatus[filter],
          enabled: !isEnabled,
        },
      },
    }));
  };

  return (
    <div className={classes.filtersWrapper}>
      {Object.entries(filters.projectsStatus).map(([filter, settings], ind) => (
        <div
          className={
            settings.enabled
              ? classes.filter + ' ' + classes.enabled
              : classes.filter
          }
          onClick={() => {
            onFilterClick(filter, settings.enabled);
          }}
          key={filter + ind}
        >
          <label>
            <Translate value={`projectStatus.${filter}`} />
          </label>
        </div>
      ))}
    </div>
  );
};
