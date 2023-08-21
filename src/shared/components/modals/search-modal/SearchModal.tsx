import { Project } from '@pitchtalk/contract-api-js/dist/core';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ReactComponent as SearchIcon } from 'assets/images/icons/search-icon.svg';
import { APP_ROUTES } from 'routes';
import i18n from 'services/translation';
import { Translate } from 'shared/components/translate/Translate';
import { DEBOUNCE_300, SEARCH_TRIGGER_LENGTH } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { ISearchModal } from 'shared/interfaces';
import { selectActiveProjects } from 'store/selectors/projects';

import { useStyles } from './styles';

export const SearchModal: React.FC<ISearchModal> = ({
  closeModal,
  pathname,
  navigate,
}): JSX.Element => {
  const classes = useStyles();
  const [search, setSearch] = useState<string>('');
  const [projectsToShow, setProjectsToShow] = useState<Project[]>([]);
  const projects = useAppSelector(selectActiveProjects);

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
    <>
      <div className={classes.wrapper} onClick={closeModal} />
      <div className={classes.container}>
        <div className={classes.searchWrapper}>
          <div className={classes.inputHolder}>
            <div className={classes.icon}>
              <SearchIcon />
            </div>
            <input
              placeholder={`${i18n.t('navigation.search')}`}
              className={classes.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          {search.length >= SEARCH_TRIGGER_LENGTH && (
            <div className={classes.searchProjects}>
              {projectsToShow.length ? (
                projectsToShow.map(({ name, project_id }) => (
                  <a
                    onClick={() => {
                      navigate(`${APP_ROUTES.PROJECTS}/${project_id}`, {});
                      closeModal();
                    }}
                    className={classes.project}
                    key={project_id}
                  >
                    {name}
                  </a>
                ))
              ) : (
                <span className={classes.noResults}>
                  <Translate value="events.noMatchedResult" />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
