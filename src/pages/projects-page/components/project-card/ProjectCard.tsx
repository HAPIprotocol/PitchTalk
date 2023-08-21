import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { CSSProperties, memo, useMemo } from 'react';
import { Trans } from 'react-i18next';
import { areEqual } from 'react-window';

import { getCellGap } from 'pages/projects-page/hooks/useProjectsGrid';
import { IFilteredProject } from 'pages/projects-page/interface';
import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import { Logo } from 'shared/components/Logo';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';
import { LikesDropDown } from '../likes-dropdown/LikesDropDown';
import { ProjectStatus } from '../project-status/ProjectStatus';

const getProjectCardStylesWithGap = (
  style: CSSProperties,
  columnIndex: number,
  rowIndex: number,
  columnCount: number,
  cellGap: number
): CSSProperties => ({
  ...style,
  display: 'flex',
  alignItems: 'flex-end',
  left:
    columnIndex === 0
      ? style.left || 0
      : (Number(style.left) || 0) + columnIndex * cellGap,
  right:
    columnIndex === columnCount
      ? style.right
      : (Number(style.right) || 0) + columnIndex * cellGap,
  top:
    rowIndex === 0
      ? Number(style.top) + 5
      : Number(style.top) + rowIndex * cellGap,
});

export const ProjectCard: React.FC<{
  data: { projects: IFilteredProject[]; columnCount: number };
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}> = memo(
  ({ data: { columnCount, projects }, columnIndex, rowIndex, style }) => {
    const dimension = useWindowDimensions();
    const cellGap = useMemo(() => getCellGap(dimension), [dimension]);

    const ind =
      columnCount > 1 ? rowIndex * columnCount + columnIndex : rowIndex;
    const project = projects[ind] || {};

    const isOnChainProject = project.projectType === EProjectType.OnChain;

    const isGrant = isOnChainProject ? !!project.grants?.length : false;
    const isLikes = isOnChainProject ? !!project?.likes?.length : false;

    const classes = useStyles({ banner: project.banner, isGrant, isLikes });

    const containerStyles = useMemo(
      () => ({
        ...getProjectCardStylesWithGap(
          style,
          columnIndex,
          rowIndex,
          columnCount,
          cellGap
        ),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [style, columnCount, cellGap]
    );

    if (!Object.keys(project).length) return <></>;

    const symbol = project.projectTokenData.symbol;
    const { donates, donatesInUSN, investments, investmentsInUSN } =
      project.donations;

    return (
      <div style={containerStyles}>
        <div style={{ width: 'fit-content', height: 'fit-content' }}>
          {isOnChainProject && (
            <LikesDropDown
              projectLikes={project.likes}
              projectId={project.id as number}
              isGrant={isGrant}
              isLikes={isLikes}
            />
          )}
          <NavLink
            className={classes.cardContainer}
            to={`${APP_ROUTES.PROJECTS}/${project.id}?stage=${project.stage}`}
          >
            <div className={classes.projectMainInfo}>
              <div className={classes.projectTitle}>
                <Logo
                  logo={project.logo}
                  logoContainerStyle={classes.projectLogo}
                />
                <div className={classes.projectNameAndStatusWrapper}>
                  <abbr className={classes.projectName} title={project.name}>
                    {project.name}
                  </abbr>
                  {dimension === EDimensions.SMALL && isOnChainProject && (
                    <ProjectStatus status={project.projectStatus} />
                  )}
                </div>
              </div>
              <div className={classes.projectInfo}>
                <div className={classes.projectLinks}>
                  {project?.social_links &&
                    Object.entries(normalizeIcons(project.social_links)).map(
                      (link: [string, string], ind) => (
                        <SocialLink
                          key={ind}
                          link={link}
                          styles={classes.socialLink}
                        />
                      )
                    )}
                  <SocialLink
                    link={['web_url', project.project_url || '']}
                    styles={classes.socialLink + ' web-icon'}
                  />
                </div>
                {dimension !== EDimensions.SMALL && isOnChainProject && (
                  <ProjectStatus status={project.projectStatus} />
                )}
              </div>
            </div>
            <div className={classes.projectDescription}>
              <h4>{project.description}</h4>
            </div>
            <div className={classes.investments}>
              <div className={classes.investment}>
                <div className={classes.investmentTitle}>
                  <span>
                    <Trans i18nKey="amounts.donated" />
                  </span>
                </div>
                <span
                  className={classes.investmentAmount}
                >{`${donates} ${symbol}`}</span>
                <span className={classes.investmentAmountUSN}>
                  <Trans
                    i18nKey="amounts.fiatAmount"
                    values={{ amount: donatesInUSN }}
                  />
                </span>
              </div>
              <div className={classes.verticalLine} />
              <div className={classes.investment}>
                <div className={classes.investmentTitle}>
                  <span>
                    <Trans i18nKey="amounts.invested" />
                  </span>
                </div>
                <span
                  className={classes.investmentAmount}
                >{`${investments} ${symbol}`}</span>
                <span className={classes.investmentAmountUSN}>
                  <Trans
                    i18nKey="amounts.fiatAmount"
                    values={{ amount: investmentsInUSN }}
                  />
                </span>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    );
  },
  areEqual
);
