import omit from 'lodash/omit';
import memoize from 'memoize-one';
import { memo, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { SEARCH_TRIGGER_LENGTH } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { selectIsProjectsLoading } from 'store/selectors/projects';

import { FilterPanel } from './components/filter-panel/FilterPanel';
import { ProjectCard } from './components/project-card/ProjectCard';
import { useProjectsGrid } from './hooks/useProjectsGrid';
import { IFilteredProject } from './interface';
import { useStyles } from './styles';

const createItemData = memoize((projects, columnCount) => ({
  projects,
  columnCount,
}));

const getNoProjectsTitle = (search: string) =>
  search.length >= SEARCH_TRIGGER_LENGTH
    ? 'projectsPage.noProjectsBySearch'
    : 'projectsPage.noProjects';

const ProjectsPage: React.FC = memo(() => {
  const classes = useStyles();

  const isLoading = useAppSelector(selectIsProjectsLoading);
  const [filteredProjects, setFilteredProjects] = useState<IFilteredProject[]>(
    []
  );

  const [search, setSearch] = useState<string>('');

  const projectsToRender =
    search.length < SEARCH_TRIGGER_LENGTH
      ? filteredProjects
      : filteredProjects.filter(({ name }) =>
          // TODO: FIX offchainprojects interface in lib
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name!.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  const noProjectsTitle = getNoProjectsTitle(search);

  const {
    columnCount,
    columnWidth,
    rowHeight,
    gridRef,
    setGridRef,
    setGridOuterRef,
    overScanRow,
  } = useProjectsGrid();

  useEffect(() => {
    gridRef?.current?.scrollTo({ scrollTop: 0, scrollLeft: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects]);

  const itemData = createItemData(
    projectsToRender.map((project) => omit(project, 'onChainProjectData')),
    columnCount
  );

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.pageHeading}>
          <FilterPanel
            setFilteredProjects={setFilteredProjects}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className={classes.projectsList}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!projectsToRender.length ? (
                <span className={classes.noEvents}>
                  <Translate value={noProjectsTitle} />
                </span>
              ) : (
                <div style={{ display: 'flex', flexGrow: 1, height: '100%' }}>
                  <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => (
                      <Grid
                        ref={setGridRef}
                        outerRef={setGridOuterRef}
                        columnCount={itemData.columnCount}
                        columnWidth={() => columnWidth}
                        rowCount={Math.ceil(
                          itemData.projects.length / itemData.columnCount
                        )}
                        rowHeight={() => rowHeight}
                        height={height}
                        width={width}
                        itemData={itemData}
                        overscanRowCount={overScanRow}
                      >
                        {ProjectCard}
                      </Grid>
                    )}
                  </AutoSizer>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectsPage;
