import { getYear } from 'date-fns';
import { useMemo, memo } from 'react';

import { ReactComponent as AddProjectIcon } from 'assets/images/icons/add-project-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/images/icons/arrow-right-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { ReactComponent as EventsIcon } from 'assets/images/icons/events-icon.svg';
import { ReactComponent as HowToIcon } from 'assets/images/icons/how-to-icon.svg';
import { ReactComponent as ProjectsIcon } from 'assets/images/icons/projects-icon.svg';
import { ReactComponent as LogoColorless } from 'assets/images/logo-colorless.svg';
import ProtectedByHapi from 'assets/images/protectedByHapi.svg';
import { ReactComponent as Tagline } from 'assets/images/tagline.svg';
import { APP_ROUTES } from 'routes';
import { pitchTalkSocialLinks } from 'services/config';
import { Link, NavLink, useLocation } from 'services/router';
import i18n from 'services/translation';
import { EDimensions } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { useIconStyles } from 'shared/utils/iconsUtils';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';
import {
  selectOffChainUserSubProject,
  selectUserProject,
} from 'store/slices/user';

import { useStyles } from './styles';
import { DropDownMenu } from '../DropdownMenu/DropDownMenu';
import { SocialLink } from '../social-link/SocialLink';
import { Translate } from '../translate/Translate';

export const Footer: React.FC = memo(() => {
  const classes = useStyles();
  const userProject = useAppSelector(selectUserProject);
  const iconsClasses = useIconStyles();
  const { pathname } = useLocation();
  const dimension = useWindowDimensions();
  const offChainUserSubProject = useAppSelector(selectOffChainUserSubProject);

  const YEAR = useMemo(() => getYear(new Date()), []);
  const HOW_TO_LIST = [
    {
      label: `${i18n.t('howToPage.forProjects')}`,
      url: APP_ROUTES.HOW_TO_PROJECTS,
      disabled: true,
    },
    {
      label: `${i18n.t('howToPage.forInvestors')}`,
      url: APP_ROUTES.HOW_TO_INVESTORS,
    },
  ];

  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.itemsContainer}>
          <div className={classes.footerItem}>
            <div className={classes.copyrights}>
              <span>
                <Translate value="footer.platform" />
              </span>
              <span>
                <Translate value="footer.copyright" /> {YEAR}
              </span>
            </div>
          </div>
          <div className={classes.footerItem}>
            <div className={classes.footerNavigation}>
              <Link to={APP_ROUTES.HOME}>
                <Translate value="navigation.home" />
              </Link>
              <Link to={APP_ROUTES.EVENT_CALENDAR}>
                <Translate value="navigation.eventCalendar" />
              </Link>
              <Link to={APP_ROUTES.EVENTS}>
                <Translate value="navigation.events" />
              </Link>
              <Link to={APP_ROUTES.ABOUT}>
                <Translate value="navigation.about" />
              </Link>
              <Link to={APP_ROUTES.HOW_TO}>
                <Translate value="navigation.howTo" />
              </Link>
            </div>
          </div>
          <div className={classes.footerItemWithLinks}>
            <div className={classes.socialLinks}>
              {Object.entries(normalizeIcons(pitchTalkSocialLinks)).map(
                (link: [string, string], ind) => (
                  <SocialLink
                    key={ind}
                    link={link}
                    styles={classes.socialLink}
                  />
                )
              )}
            </div>
          </div>
          <div className={classes.footerItem}>
            <div className={classes.logos}>
              <LogoColorless />
              <Tagline />
            </div>
          </div>
          <div className={classes.footerItem}>
            <img
              src={ProtectedByHapi}
              className={classes.protectedImg}
              loading="lazy"
            />
          </div>
        </div>
      </footer>
      <>
        {dimension === EDimensions.SMALL ? (
          <div className={classes.mobileNavigation}>
            <NavLink
              to={APP_ROUTES.EVENTS}
              className={({ isActive }) =>
                isActive ? classes.navigationItemActive : classes.navigationItem
              }
            >
              <EventsIcon className={iconsClasses.eventsIcon} />
              <span>
                <Translate value="navigation.events" />
              </span>
            </NavLink>
            <NavLink
              to={APP_ROUTES.PROJECTS}
              className={({ isActive }) =>
                isActive ? classes.navigationItemActive : classes.navigationItem
              }
            >
              <ProjectsIcon className={iconsClasses.projectsIcon} />
              <span>
                <Translate value="navigation.projects" />
              </span>
            </NavLink>
            <NavLink
              to={APP_ROUTES.EVENT_CALENDAR}
              className={({ isActive }) =>
                isActive ? classes.navigationItemActive : classes.navigationItem
              }
            >
              <CalendarIcon className={iconsClasses.calendarIcon} />
              <span>
                <Translate value="navigation.eventCalendar" />
              </span>
            </NavLink>
            <DropDownMenu
              position={{ top: '-200%', left: '0' }}
              list={
                <>
                  {HOW_TO_LIST.map((link, ind) => (
                    <NavLink
                      key={ind}
                      to={link.url}
                      className={classes.dropdownItem}
                      style={{
                        pointerEvents: link?.disabled ? 'none' : 'all',
                        opacity: link?.disabled ? '0.5' : '1',
                      }}
                    >
                      <ArrowRight />
                      {link.label}
                    </NavLink>
                  ))}
                </>
              }
              onCloseDepArray={[pathname]}
              className={
                pathname.includes(APP_ROUTES.HOW_TO_INVESTORS) ||
                pathname.includes(APP_ROUTES.HOW_TO_PROJECTS)
                  ? classes.navigationItemActive
                  : classes.navigationItem
              }
            >
              <>
                <HowToIcon className={iconsClasses.howToIcon} />
                <span>
                  <Translate value="navigation.howTo" />
                </span>
              </>
            </DropDownMenu>
            <NavLink
              to={
                !userProject && !offChainUserSubProject
                  ? APP_ROUTES.PARTICIPANT
                  : APP_ROUTES.PROJECT_CABINET
              }
              className={({ isActive }) =>
                isActive ? classes.navigationItemActive : classes.navigationItem
              }
            >
              <AddProjectIcon className={iconsClasses.calendarIcon} />
              <span>
                <Translate
                  value={
                    !userProject && !offChainUserSubProject
                      ? 'navigation.createProject'
                      : 'navigation.manageProject'
                  }
                />
              </span>
            </NavLink>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
});
