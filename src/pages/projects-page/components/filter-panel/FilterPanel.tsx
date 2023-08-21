import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';

import { IFilteredProject } from 'pages/projects-page/interface';
import { useLocation, useNavigate } from 'services/router';
import { USE_JOINED_QUERY } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useModalContext } from 'shared/providers/ModalsProvider';
import {
  IFiltersState,
  filterProjectsByStatus,
  filterProjectsByType,
  getDefaultFiltersState,
  sortProjects,
} from 'shared/utils/projectsFiltersUtils';
import {
  selectProjectsListWithData,
  selectIsProjectsLoading,
} from 'store/selectors/projects';
import { selectUserInvestments } from 'store/slices/user';

import { CustomFilters } from './components/CustomFilters';
import { FilterButtons } from './components/FilterButtons';
import { LeaderBoardBtn } from './components/LeaderBoardBtn';
import { useStyles } from './styles';
import { SearchInput } from '../search-input/SearchInput';

interface IFilterPanelProps {
  search: string;
  setFilteredProjects: Dispatch<SetStateAction<IFilteredProject[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const FilterPanel: React.FC<IFilterPanelProps> = memo(
  ({ setFilteredProjects, search, setSearch }) => {
    const classes = useStyles();

    const location = useLocation();
    const navigate = useNavigate();

    const isJoinedDefault = location?.search?.includes(USE_JOINED_QUERY);

    const { closeModal } = useModalContext();
    const [filters, setFilters] = useState<IFiltersState>(
      getDefaultFiltersState(isJoinedDefault)
    );

    const projects = useAppSelector(selectProjectsListWithData);
    const isLoading = useAppSelector(selectIsProjectsLoading);

    const { totalSpentByProjects } = useAppSelector(selectUserInvestments);

    const applyFilters = (filters: IFiltersState) => {
      const filteredProjectsByType = filterProjectsByType(
        projects,
        filters,
        totalSpentByProjects
      );
      const filteredProjectsByStatus = filterProjectsByStatus(
        filteredProjectsByType,
        filters
      );
      const sortedAndFilteredProjects = sortProjects(
        filteredProjectsByStatus,
        filters
      );

      setFilteredProjects(sortedAndFilteredProjects);
      setFilters(filters);
      closeModal();
    };

    useEffect(() => {
      applyFilters(filters);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      filters.projectsTypes.isJoined,
      filters.projectsTypes.isPremium,
      filters.projectsTypes.isRated,
    ]);

    useEffect(() => {
      if (isJoinedDefault) {
        navigate({ search: '' });
      }
      applyFilters(filters);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      applyFilters(filters);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
      <>
        <div className={classes.filtersWrapper}>
          <FilterButtons applyFilters={applyFilters} filters={filters} />
        </div>
        <CustomFilters setFilters={setFilters} filters={filters} />
        <LeaderBoardBtn />
        <div className={classes.searchWrapper}>
          <SearchInput value={search} changeValue={setSearch} />
        </div>
      </>
    );
  }
);
