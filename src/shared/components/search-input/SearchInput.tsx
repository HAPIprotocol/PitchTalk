import { Project } from '@pitchtalk/contract-api-js';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as SearchIcon } from 'assets/images/icons/search-icon.svg';
import { APP_ROUTES } from 'routes';
import { DEBOUNCE_300, SEARCH_TRIGGER_LENGTH } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectActiveProjects } from 'store/selectors/projects';

import useStyles from './styles';
import { Translate } from '../translate/Translate';

interface ISearchInputProps {
  type: string;
  label: string;
  value?: string;
  name: string;
  readOnly?: boolean;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  label,
  ...props
}): JSX.Element => {
  const classes = useStyles();

  const projects = useAppSelector(selectActiveProjects);
  const [search, setSearch] = useState<string>('');
  const [projectsToShow, setProjectsToShow] = useState<Project[]>([]);

  const { pathname } = useLocation();
  useEffect(() => {
    setSearch('');
  }, [pathname]);

  const searchProjects = useCallback(
    (search: string) => {
      if (search.length < SEARCH_TRIGGER_LENGTH) return;

      const projectsBySearch = projects.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
      setProjectsToShow(projectsBySearch);
    },
    [projects]
  );

  const debouncedSearchProjects = useMemo(
    () => debounce(searchProjects, DEBOUNCE_300),
    [searchProjects]
  );

  useEffect(() => {
    debouncedSearchProjects(search);

    return () => debouncedSearchProjects.cancel();
  }, [search, projects, debouncedSearchProjects]);

  return (
    <div className={classes.container}>
      <div className={classes.inputHolder}>
        <div className={classes.icon}>
          <SearchIcon />
        </div>
        <input
          placeholder={label}
          className={classes.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          {...props}
        />
      </div>
      {search.length >= SEARCH_TRIGGER_LENGTH && (
        <div className={classes.searchProjects}>
          {projectsToShow.length ? (
            projectsToShow.map(({ name, project_id }) => (
              <NavLink
                to={`${APP_ROUTES.PROJECTS}/${project_id}`}
                className={classes.project}
                key={project_id}
              >
                {name}
              </NavLink>
            ))
          ) : (
            <span className={classes.noResults}>
              <Translate value="events.noMatchedResult" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
