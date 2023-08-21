import { IOffChainProject } from '@pitchtalk/contract-api-js/dist/interfaces';
import { IProjectRes } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { Trans } from 'react-i18next';

import projectFrame from 'assets/images/project-frame.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { wrapNearId } from 'services/config';
import { useNavigate } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions, EMPTY_STRING } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { formatCreatedAt } from 'shared/utils/dateUtils';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';
import { selectTokenData } from 'store/selectors/selectTokenData';
import {
  selectOffChainUserProject,
  selectUserProject,
} from 'store/slices/user';

import { useStyles } from './styles';

export const UserProject: React.FC = () => {
  const onChainUserProject = useAppSelector(selectUserProject);
  const offChainUserProject = useAppSelector(selectOffChainUserProject);
  const project = onChainUserProject || offChainUserProject;
  const isOffChainProject = (
    project?: IOffChainProject | IProjectRes
  ): project is IOffChainProject =>
    project ? typeof project.id === 'string' : false;

  const tokenData = useAppSelector((state) =>
    selectTokenData(
      state,
      isOffChainProject() ? wrapNearId : (project as IProjectRes)?.token_id
    )
  );
  const navigate = useNavigate();
  const redirectToProjectCabinet = () => {
    navigate(`${APP_ROUTES.PROJECT_CABINET}`);
  };
  const { banner, logo } = getCorrectIPFSLinks({
    banner: project?.banner,
    logo: project?.logo,
  });
  const classes = useStyles({ banner: banner || projectFrame });
  const dimension = useWindowDimensions();

  if (!project) return <></>;

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h5>
          <Translate value="profilePage.projectOverview" />
        </h5>
        <div className={classes.line} />
      </div>
      <div className={classes.projectContainer}>
        <div className={classes.projectInnerContainer}>
          {dimension !== EDimensions.SMALL && (
            <>
              <div className={classes.projectInfo}>
                <div className={classes.projectLogoInfo}>
                  <img src={logo || projectFrame} loading="lazy" />
                  <h5>{project.name}</h5>
                </div>
                <label className={classes.createdAt}>
                  <Trans
                    i18nKey="projectCabinetPage.created"
                    values={{
                      date: formatCreatedAt(
                        isOffChainProject(project)
                          ? new Date(project?.created_at || Date.now())
                          : project.created_at
                      ),
                    }}
                  />
                </label>
              </div>
              <div className={classes.projectInfo}>
                <span className={classes.description}>
                  {project.description}
                </span>
                <div className={classes.socialLinks}>
                  <SocialLink
                    link={['web_url', project?.project_url || EMPTY_STRING]}
                    styles={classes.socialLink + ' web-icon'}
                  />
                  {project?.social_links &&
                    Object.entries(normalizeIcons(project.social_links)).map(
                      (link: [string, string], ind) => (
                        <SocialLink
                          width={28}
                          height={28}
                          key={ind}
                          link={link}
                          styles={classes.socialLink}
                        />
                      )
                    )}
                </div>
              </div>
            </>
          )}
          {dimension === EDimensions.SMALL && (
            <div className={classes.mobileProjectInfo}>
              <div className={classes.mobileInfoWrapper}>
                <div className={classes.projectLogoInfo}>
                  <img src={logo || projectFrame} loading="lazy" />
                  <h5>{project.name}</h5>
                </div>
                <span className={classes.description}>
                  {project.description}
                </span>
              </div>
              <div className={classes.mobileInfoWrapperSocial}>
                <label className={classes.createdAt}>
                  <Trans
                    i18nKey="projectCabinetPage.created"
                    values={{
                      date: formatCreatedAt(
                        isOffChainProject(project)
                          ? new Date(project?.created_at || Date.now())
                          : project.created_at
                      ),
                    }}
                  />
                </label>
                <div className={classes.socialLinks}>
                  <SocialLink
                    link={['web_url', project?.project_url || EMPTY_STRING]}
                    styles={classes.socialLink + ' web-icon'}
                  />
                  {project?.social_links &&
                    Object.entries(normalizeIcons(project.social_links)).map(
                      (link: [string, string], ind) => (
                        <SocialLink
                          width={28}
                          height={28}
                          key={ind}
                          link={link}
                          styles={classes.socialLink}
                        />
                      )
                    )}
                </div>
              </div>
            </div>
          )}
          <div className={classes.projectInfo}>
            <Button
              extraClass={classes.editBtn}
              label="controls.editProject"
              handleClick={redirectToProjectCabinet}
            />
            {!isOffChainProject(project) && (
              <div className={classes.tokenInfo}>
                <label>
                  <Translate value="projectCabinetPage.ftToken" />:
                </label>
                <span className={classes.tokenData}>
                  <span>{tokenData.symbol}</span>
                  <img src={tokenData.icon} loading="lazy" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.bottomLine} />
    </div>
  );
};
