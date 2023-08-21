import { memo, useState } from 'react';

import { ReactComponent as ByCreationDateIcon } from 'assets/images/icons/creation-date-sorted-icon.svg';
import { ReactComponent as ByInvestmentsIcon } from 'assets/images/icons/investments-sorted-icon.svg';
import i18n, { ITranslationKeys } from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { IProjectsFiltersModal } from 'shared/interfaces';
import {
  changeSorting,
  changeSortingDirection,
  ESortedByFilters,
  ESortedFilterDirection,
  IFiltersState,
} from 'shared/utils/projectsFiltersUtils';

import { Filters } from './components/Filters/Filters';
import { SortedFilter } from './components/SortedFilter/SortedFilter';
import { useStyles } from './styles';
import { useFilterLength } from './useFilterLength';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const ProjectsFiltersModal: React.FC<IProjectsFiltersModal> = memo(
  ({ closeModal, applyFilters, filters }) => {
    const classes = useStyles();
    const [modalFilters, setModalFilters] = useState<IFiltersState>(filters);

    const filteredProjectsAmount = useFilterLength(modalFilters);

    return (
      <ModalWrapper closeModal={closeModal} modalStyles={classes.modal}>
        <div className={classes.container}>
          <div className={classes.statusFiltersContainer}>
            <h5>
              <Translate
                value={'filterModal.projectStatus' as ITranslationKeys}
              />
            </h5>
            <Filters filters={modalFilters} setFilters={setModalFilters} />
          </div>
          <div className={classes.sortedFiltersContainer}>
            <h5>
              <Translate value={'filterModal.sortedBy' as ITranslationKeys} />
            </h5>
            <div className={classes.sortedFiltersWrapper}>
              <SortedFilter
                label={`${i18n.t('filterModal.byCreationDate')}`}
                Icon={ByInvestmentsIcon}
                isSelected={
                  modalFilters.sorting.sortBy === ESortedByFilters.DATE
                }
                filter={modalFilters.sorting[ESortedByFilters.DATE]}
                onSortingChange={() =>
                  setModalFilters((prev) =>
                    changeSorting(prev, ESortedByFilters.DATE)
                  )
                }
                onDirectionChange={(target: ESortedFilterDirection) =>
                  setModalFilters((prev) =>
                    changeSortingDirection(prev, ESortedByFilters.DATE, target)
                  )
                }
                labelLow={`${i18n.t('filterModal.lowDate')}`}
                labelHigh={`${i18n.t('filterModal.highDate')}`}
              />
              <SortedFilter
                label={`${i18n.t('filterModal.byInvestments')}`}
                Icon={ByCreationDateIcon}
                isSelected={
                  modalFilters.sorting.sortBy === ESortedByFilters.INVESTMENTS
                }
                filter={modalFilters.sorting[ESortedByFilters.INVESTMENTS]}
                onSortingChange={() =>
                  setModalFilters((prev) =>
                    changeSorting(prev, ESortedByFilters.INVESTMENTS)
                  )
                }
                onDirectionChange={(target: ESortedFilterDirection) =>
                  setModalFilters((prev) =>
                    changeSortingDirection(
                      prev,
                      ESortedByFilters.INVESTMENTS,
                      target
                    )
                  )
                }
              />
            </div>
          </div>
          <h5 className={classes.filteredProjectsAmount}>
            {`${i18n.t(
              filteredProjectsAmount > 0
                ? 'filterModal.foundProjects'
                : 'filterModal.notFoundProjects',
              {
                amount: filteredProjectsAmount,
              }
            )}`}
          </h5>
          <Button
            label="filterModal.apply"
            disabled={!filteredProjectsAmount}
            extraClass={classes.button}
            handleClick={() => {
              applyFilters(modalFilters);
            }}
          />
        </div>
      </ModalWrapper>
    );
  }
);
