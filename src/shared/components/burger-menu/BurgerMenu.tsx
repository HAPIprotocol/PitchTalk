import { ReactComponent as AddProjectIcon } from 'assets/images/icons/add-project-icon.svg';
import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { ReactComponent as CloseButton } from 'assets/images/icons/close-icon.svg';
import { ReactComponent as EventsIcon } from 'assets/images/icons/events-icon.svg';
import { ReactComponent as HowToIcon } from 'assets/images/icons/how-to-icon.svg';
import { ReactComponent as InfoIcon } from 'assets/images/icons/info-icon-fill.svg';
import { ReactComponent as SignedInAccountIcon } from 'assets/images/icons/person-active-icon.svg';
import { ReactComponent as ProjectsIcon } from 'assets/images/icons/projects-icon.svg';
import ProtectedByHapi from 'assets/images/protectedByHapi.svg';
import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { NavLink } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { selectIsGrantUser } from 'store/slices/funds';
import {
  selectAccountId,
  selectOffChainUserData,
  selectOffChainUserSubProject,
  selectUserProject,
} from 'store/slices/user';

import { useStyles } from './styles';
import { Translate } from '../translate/Translate';

export const BurgerMenu: React.FC<{
  closeHandle: () => void;
  isOpened: boolean;
}> = ({ closeHandle, isOpened }) => {
  const { showModal } = useModalContext();
  const { isSignedIn, openModal, signOut } = useWalletSelector();
  const { isGrantUser } = useAppSelector(selectIsGrantUser);
  const accountId = useAppSelector(selectAccountId);
  const classes = useStyles({ isGrantUser });
  const userProject = useAppSelector(selectUserProject);
  const offChainUserData = useAppSelector(selectOffChainUserData);
  const offChainUserSubProject = useAppSelector(selectOffChainUserSubProject);

  const handleOpenSignIn = () => {
    closeHandle();
    showModal(EModals.AUTH_MODAL, { signInWithOnChain: openModal });
  };

  const handleConnectButton = () =>
    isSignedIn() || offChainUserData ? signOut() : handleOpenSignIn();

  const connectButtonLabel = isSignedIn()
    ? accountId
    : offChainUserData
    ? offChainUserData.email
    : 'auth.logIn';

  return (
    <>
      {isOpened ? (
        <div className={classes.burgerMenu}>
          <CloseButton className={classes.closeButton} onClick={closeHandle} />
          {(isSignedIn() || offChainUserData) && (
            <NavLink
              to={APP_ROUTES.PROFILE}
              className={classes.userInfoWrapper}
              onClick={closeHandle}
            >
              <SignedInAccountIcon />
              <span>{accountId}</span>
            </NavLink>
          )}
          <Button
            handleClick={handleConnectButton}
            label={connectButtonLabel}
            extraClass={classes.connectButton}
            translate={!isSignedIn() && !offChainUserData}
            withTitle
          />
          <NavLink
            to={APP_ROUTES.EVENTS}
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
            onClick={closeHandle}
          >
            <span className={classes.iconContainer}>
              <EventsIcon style={{ width: 20, height: 27 }} />
            </span>
            <span>
              <Translate value="navigation.events" />
            </span>
          </NavLink>
          <NavLink
            to={APP_ROUTES.PROJECTS}
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
            onClick={closeHandle}
          >
            <span className={classes.iconContainer}>
              <ProjectsIcon style={{ width: 33, height: 27 }} />
            </span>
            <span>
              <Translate value="navigation.projects" />
            </span>
          </NavLink>
          <NavLink
            to={APP_ROUTES.EVENT_CALENDAR}
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
            onClick={closeHandle}
          >
            <span className={classes.iconContainer}>
              <CalendarIcon style={{ width: 27, height: 27 }} />
            </span>
            <span>
              <Translate value="navigation.eventCalendar" />
            </span>
          </NavLink>
          <NavLink
            to={APP_ROUTES.HOW_TO}
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
            onClick={closeHandle}
          >
            <span className={classes.iconContainer}>
              <HowToIcon style={{ width: 27, height: 27 }} />
            </span>
            <span>
              <Translate value="navigation.howTo" />
            </span>
          </NavLink>
          <NavLink
            to={
              !userProject && !offChainUserSubProject
                ? APP_ROUTES.PARTICIPANT
                : APP_ROUTES.PROJECT_CABINET
            }
            className={({ isActive }) =>
              isActive ? classes.navigationItemActive : classes.navigationItem
            }
            onClick={closeHandle}
          >
            <AddProjectIcon
              className={classes.projectIcon}
              style={{ width: 27, height: 27 }}
            />
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
            onClick={closeHandle}
          >
            <InfoIcon
              className={classes.projectIcon}
              style={{ width: 27, height: 27 }}
            />
            <span>
              <Translate value={'navigation.about'} />
            </span>
          </NavLink>
          <div className={classes.protectedImg}>
            <img src={ProtectedByHapi} loading="lazy" />
          </div>
        </div>
      ) : null}
    </>
  );
};
