import { memo } from 'react';

import { ReactComponent as AboutIcon } from 'assets/images/icons/about-icon.svg';
import { ReactComponent as AddProjectIcon } from 'assets/images/icons/add-project-icon.svg';
import { ReactComponent as ArrowRight } from 'assets/images/icons/arrow-right-icon.svg';
import { ReactComponent as BurgerButton } from 'assets/images/icons/burger-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { ReactComponent as EventsIcon } from 'assets/images/icons/events-icon.svg';
import { ReactComponent as HowToIcon } from 'assets/images/icons/how-to-icon.svg';
import { ReactComponent as SignedInAccountIcon } from 'assets/images/icons/person-active-icon.svg';
import { ReactComponent as SignedOutAccountIcon } from 'assets/images/icons/person-icon.svg';
import { ReactComponent as ProjectsIcon } from 'assets/images/icons/projects-icon.svg';
import { ReactComponent as PitchtalkLogo } from 'assets/images/logo.svg';
import { ReactComponent as TitleLogo } from 'assets/images/title-logo.svg';
import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { Link, NavLink, useLocation } from 'services/router';
import i18n from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { DropDownMenu } from 'shared/components/DropdownMenu/DropDownMenu';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useTransactionHash } from 'shared/hooks/useTransactionHash';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { useIconStyles } from 'shared/utils/iconsUtils';
import { selectIsGrantUser } from 'store/slices/funds';
import {
  selectAccountId,
  selectOffChainUserData,
  selectOffChainUserSubProject,
  selectUserProject,
} from 'store/slices/user';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

interface IHeaderProps {
  isOpened: boolean;
  toggleIsOpened: (v: boolean) => void;
}

export const Header: React.FC<IHeaderProps> = memo(
  ({ isOpened, toggleIsOpened }) => {
    const iconsClasses = useIconStyles();
    const { isSignedIn, openModal, signOut } = useWalletSelector();
    const { isGrantUser } = useAppSelector(selectIsGrantUser);
    const offChainUserData = useAppSelector(selectOffChainUserData);
    const offChainUserSubProject = useAppSelector(selectOffChainUserSubProject);
    const accountId = useAppSelector(selectAccountId);
    const userProject = useAppSelector(selectUserProject);
    const { showModal } = useModalContext();
    const classes = useStyles({ isGrantUser });

    const { search, pathname } = useLocation();
    useTransactionHash(search, accountId);

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

    const handleConnectButton = () =>
      isSignedIn() || offChainUserData
        ? signOut()
        : showModal(EModals.AUTH_MODAL, { signInWithOnChain: openModal });

    const connectButtonLabel = isSignedIn()
      ? accountId
      : offChainUserData
      ? offChainUserData.email
      : 'auth.logIn';

    return (
      <header className={classes.header}>
        <Link to={APP_ROUTES.HOME} className={classes.logoWrapper}>
          <PitchtalkLogo className={classes.pitchTalkLogo} />
          <TitleLogo className={classes.titleLogo} />
        </Link>
        <div className={classes.navigation}>
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
            position={{ top: '125%', left: '35%' }}
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
          <NavLink
            to={APP_ROUTES.ABOUT}
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
          >
            <AboutIcon className={iconsClasses.calendarIcon} />
            <span>
              <Translate value="navigation.about" />
            </span>
          </NavLink>
        </div>
        <div className={classes.account}>
          {isSignedIn() || offChainUserData ? (
            <NavLink to={APP_ROUTES.PROFILE} className={classes.buttonActive}>
              <SignedInAccountIcon />
            </NavLink>
          ) : (
            <span className={classes.button} onClick={handleConnectButton}>
              <SignedOutAccountIcon />
            </span>
          )}
          <Button
            handleClick={handleConnectButton}
            extraClass={classes.preventTooLong}
            label={connectButtonLabel}
            translate={!isSignedIn() && !offChainUserData}
            withTitle
          />
        </div>
        <BurgerButton
          className={classes.burgerButton}
          onClick={() => toggleIsOpened(!isOpened)}
        />
      </header>
    );
  }
);
