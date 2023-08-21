import { useAppSelector } from 'shared/hooks/redux-hooks';
import {
  IFiltersState,
  filterProjectsByStatus,
  filterProjectsByType,
} from 'shared/utils/projectsFiltersUtils';
import { selectProjectsListWithData } from 'store/selectors/projects';
import { selectUserInvestments } from 'store/slices/user';

export const useFilterLength = (filters: IFiltersState) => {
  const projects = useAppSelector(selectProjectsListWithData);
  const { totalSpentByProjects } = useAppSelector(selectUserInvestments);

  return filterProjectsByStatus(
    filterProjectsByType(projects, filters, totalSpentByProjects),
    filters
  ).length;
};
