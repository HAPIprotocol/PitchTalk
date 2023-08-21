import { t } from 'i18next';
import { memo, useState } from 'react';

import { ReactComponent as FiltersResetIcon } from 'assets/images/icons/close-icon.svg';
import { ReactComponent as FiltersSettingsIcon } from 'assets/images/icons/filters-icon.svg';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import {
  IFiltersState,
  getDefaultFiltersState,
} from 'shared/utils/projectsFiltersUtils';

import { useStyles } from '../styles';

interface IFilterButtonsProps {
  applyFilters: (filters: IFiltersState) => void;
  filters: IFiltersState;
}

export const FilterButtons: React.FC<IFilterButtonsProps> = memo(
  ({ applyFilters, filters }) => {
    const classes = useStyles();
    const { showModal } = useModalContext();
    const [isFiltersApplied, setIsFiltersApplied] = useState<boolean>(false);

    const applyFiltersFromModal = (filters: IFiltersState) => {
      applyFilters(filters);
      setIsFiltersApplied(true);
    };

    const clearFilters = () => {
      applyFilters({
        ...getDefaultFiltersState(),
        projectsTypes: filters.projectsTypes,
      });
      setIsFiltersApplied(false);
    };

    return (
      <>
        <div
          className={classes.filtersLabel + (isFiltersApplied ? ' active' : '')}
          onClick={() =>
            showModal(EModals.PROJECTS_FILTER_MODAL, {
              applyFilters: applyFiltersFromModal,
              filters,
            })
          }
        >
          <label>{`${t('projectsPage.filters')}`}</label>
          <FiltersSettingsIcon />
        </div>
        {isFiltersApplied && (
          <div
            className={classes.filtersClearLabel}
            onClick={() => clearFilters()}
          >
            <label>{`${t('projectsPage.clear')}`}</label>
            <FiltersResetIcon />
          </div>
        )}
      </>
    );
  }
);
