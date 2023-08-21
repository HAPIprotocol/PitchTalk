import { useRef } from 'react';

import { ReactComponent as ArrowLeftIcon } from 'assets/images/icons/arrow-left-icon.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';
import img from 'assets/images/project-frame.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { APP_ROUTES } from 'routes';
import { Link, useNavigate } from 'services/router';
import { PitchWithProjectData } from 'shared/interfaces';
import { formatDuration } from 'shared/utils/dateUtils';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

declare interface IAnnouncements {
  announcements: PitchWithProjectData[];
  isHomePage?: boolean;
}

const SCROLL_AMOUNT = 194;

export const Announcements: React.FC<IAnnouncements> = ({
  announcements,
  isHomePage = false,
}) => {
  const classes = useStyles({ isHomePage });
  const announcementsRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const goToProjectPage = (projectId: number) => {
    navigate(`${APP_ROUTES.PROJECTS}/${projectId}`);
  };

  const scrollToLeft = () => {
    announcementsRef?.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };
  const scrollToRight = () => {
    announcementsRef?.current?.scrollBy({
      left: +SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };
  return (
    <div className={classes.announcements}>
      <div className={classes.announcementsHeader}>
        <div className={classes.title}>Up next</div>
        <Link className={classes.link} to={APP_ROUTES.EVENTS}>
          <Translate value="events.seeAll" />
        </Link>
      </div>
      {announcements.length ? (
        <div className={classes.announcementsContainer}>
          <div className={classes.scrollArrow} onClick={scrollToLeft}>
            <ArrowLeftIcon />
          </div>
          <div className={classes.announcementsItems} ref={announcementsRef}>
            {announcements.map(
              ({ project, ...pitch }: PitchWithProjectData) => {
                const { banner } = getCorrectIPFSLinks({
                  banner: project.banner,
                });
                return (
                  <div
                    className={classes.announcementItem}
                    key={project.project_id + pitch.starts_on}
                  >
                    <div
                      className={classes.announcementDescription}
                      onClick={() => goToProjectPage(project.project_id)}
                    >
                      <span className={classes.announcementProjectName}>
                        {project.name}
                      </span>
                      <span className={classes.announcementTime}>
                        {formatDuration(+pitch.starts_on, +pitch.duration)}
                      </span>
                    </div>
                    <img
                      className={classes.projectImage}
                      src={banner || img}
                      alt="Project banner"
                      loading="lazy"
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className={classes.scrollArrow} onClick={scrollToRight}>
            <ArrowRightIcon />
          </div>
        </div>
      ) : (
        <div className={classes.emptyAnnouncements}>
          <div className={classes.announcementsText}>
            <span>
              <Translate value="events.nextProjects" />
            </span>
            <span>
              <Translate value="events.comingSoon" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
