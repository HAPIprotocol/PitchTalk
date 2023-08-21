import { ReduxRouter } from '@lagunovsky/redux-react-router';
import { Suspense, useEffect, useState, lazy } from 'react';
import { createUseStyles } from 'react-jss';
import { ToastContainer } from 'react-toastify';

import { ERatingTableType } from 'pages/rating-page/constants';
import { Routes, Route, Navigate, useLocation } from 'services/router';
import { BurgerMenu } from 'shared/components/burger-menu/BurgerMenu';
import { Footer } from 'shared/components/footer/Footer';
import { HackathonAttention } from 'shared/components/HackathonAttention';
import { Header } from 'shared/components/header/Header';
import { Loader } from 'shared/components/loader/Loader';
import { SubmissionBanner } from 'shared/components/submission-banner/SubmissionBanner';
import { PARAMS } from 'shared/constants';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { useAuth } from 'shared/hooks/useAuth';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { selectHistory } from 'store/selectors/history';
import { selectProjects } from 'store/selectors/projects';
import {
  selectAccountId,
  selectOffChainUserSubProject,
  selectUserProject,
} from 'store/slices/user';
import { selectVesting } from 'store/slices/vesting';
import { history } from 'store/store';

import { selectIsGrantUser } from '../store/slices/funds';
import { selectSubFundById } from '../store/slices/submission';

const HomePage = lazy(() => import('pages/home-page/HomePage'));
const CalendarPage = lazy(() => import('pages/calendar-page/CalendarPage'));
const EventsPage = lazy(() => import('pages/events-page/EventsPage'));
const EventPage = lazy(() => import('pages/event-page'));
const EventRatingPage = lazy(() => import('pages/event-rating-page'));
const EventRefereePage = lazy(() => import('pages/event-referee-page'));
const EventSchedulePage = lazy(() => import('pages/event-schedule-page'));
const HowToPage = lazy(() => import('pages/how-to/HowToPage'));
const QuestionPage = lazy(
  () => import('pages/how-to/question-page/QuestionPage')
);
const ProfilePage = lazy(() => import('pages/profile-page/ProfilePage'));
const ProjectPage = lazy(() => import('pages/project-page/ProjectPage'));
const ProjectsPage = lazy(() => import('pages/projects-page/ProjectsPage'));
const InstitutionalSubmissionPage = lazy(
  () => import('pages/institutional-submission/InstitutionalSubmission')
);
const FundCabinetPage = lazy(
  () => import('pages/fund-cabinet/SubmissionFundCabinet')
);
const ParticipantForm = lazy(
  () => import('pages/participant-form/ParticipantForm')
);
const ProjectCabinet = lazy(() => import('pages/project-cabinet'));
const AboutPage = lazy(() => import('pages/about-page'));
const RatingPage = lazy(() => import('pages/rating-page'));

export const APP_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROFILE: '/profile',
  EVENTS: '/events',
  EVENTS_BY_ID: `/events/${PARAMS.EVENT_ID}`,
  EVENTS_SCHEDULE_BY_ID: `/events-schedule/${PARAMS.EVENT_ID}`,
  EVENTS_RATING_BY_ID: `/events-rating/${PARAMS.EVENT_ID}`,
  EVENTS_REFEREE_BY_ID: `/events-referee/${PARAMS.EVENT_ID}`,
  EVENT_CALENDAR: '/event-calendar',
  PROJECTS: '/projects',
  PROJECTS_BY_ID: '/projects/:projectId',
  HOW_TO: '/how-to/:section/:question',
  HOW_TO_INVESTORS: '/how-to/investors',
  HOW_TO_PROJECTS: '/how-to/projects',
  INSTITUTIONAL_SUBMISSION: '/institutional-submission',
  PROJECT_CABINET: '/project-cabinet',
  FUND_CABINET: '/fund-cabinet',
  PARTICIPANT: '/participant',
  RATING_PROJECTS: '/rating-projects',
  RATING_FUNDS: '/rating-funds',
  DEFAULT: '*',
};

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  pages: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100vw',
  },
});

const HIDE_BANNER_LOCATIONS = [
  APP_ROUTES.PARTICIPANT,
  APP_ROUTES.PROJECT_CABINET,
];

const withRoutes = (App: React.FC) => () =>
  (
    <ReduxRouter history={history} routerSelector={selectHistory}>
      <App />
    </ReduxRouter>
  );

export const AppRoutes: React.FC = withRoutes(() => {
  const classes = useStyles();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const accountId = useAppSelector(selectAccountId);
  const projects = useAppSelector(selectProjects);
  const vestingData = useAppSelector(selectVesting);
  const userProject = useAppSelector(selectUserProject);
  const userOffChainSubProject = useAppSelector(selectOffChainUserSubProject);

  const submissionFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );
  const { isGrantUser } = useAppSelector(selectIsGrantUser);

  const { pathname } = useLocation();
  const { modal, closeModal } = useModalContext();
  const showBanner =
    !userProject &&
    !userOffChainSubProject &&
    !HIDE_BANNER_LOCATIONS.includes(pathname);
  const isFundCabinet = !!submissionFund || isGrantUser;

  useEffect(() => {
    setIsDataLoaded(!!projects?.length && !!Object.keys(vestingData).length);
  }, [projects.length, vestingData]);

  useEffect(() => {
    const root = document.getElementById('root');
    const body = document.getElementsByTagName('body');
    if (root) {
      root.style.overflow = isOpened ? 'hidden' : 'unset';
      body[0].style.overflow = isOpened ? 'hidden' : 'unset';
    }
  }, [isOpened]);

  useEffect(() => {
    if (
      modal &&
      modal === EModals.AUTH_MODAL &&
      !pathname.includes(APP_ROUTES.PARTICIPANT)
    ) {
      closeModal();
    }
  }, [pathname]);

  useAuth();

  return (
    <>
      <div className={classes.container}>
        <HackathonAttention />
        <Header isOpened={isOpened} toggleIsOpened={setIsOpened} />
        <div className={classes.pages}>
          <Suspense fallback={<Loader />}>
            <>
              <BurgerMenu
                closeHandle={() => setIsOpened(false)}
                isOpened={isOpened}
              />

              {!isDataLoaded ? (
                <Loader />
              ) : (
                <Routes>
                  <Route path={APP_ROUTES.HOME} element={<HomePage />} />
                  <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
                  <Route
                    path={APP_ROUTES.EVENTS_BY_ID}
                    element={<EventPage />}
                  />
                  <Route
                    path={APP_ROUTES.EVENTS_SCHEDULE_BY_ID}
                    element={<EventSchedulePage />}
                  />
                  <Route
                    path={APP_ROUTES.EVENTS_RATING_BY_ID}
                    element={<EventRatingPage />}
                  />
                  <Route
                    path={APP_ROUTES.EVENTS_REFEREE_BY_ID}
                    element={<EventRefereePage />}
                  />
                  <Route path={APP_ROUTES.EVENTS} element={<EventsPage />} />
                  <Route
                    path={APP_ROUTES.PROJECTS_BY_ID}
                    element={<ProjectPage />}
                  />
                  <Route
                    path={APP_ROUTES.PROJECTS}
                    element={<ProjectsPage />}
                  />
                  <Route path={APP_ROUTES.HOW_TO} element={<QuestionPage />} />
                  <Route
                    path={APP_ROUTES.HOW_TO_INVESTORS}
                    element={<HowToPage />}
                  />
                  <Route
                    path={APP_ROUTES.HOW_TO_PROJECTS}
                    element={<HowToPage />}
                  />
                  <Route
                    path={APP_ROUTES.EVENT_CALENDAR}
                    element={<CalendarPage />}
                  />
                  {(userProject || userOffChainSubProject) && (
                    <Route
                      path={APP_ROUTES.PROJECT_CABINET}
                      element={<ProjectCabinet />}
                    />
                  )}
                  <Route
                    path={APP_ROUTES.DEFAULT}
                    element={<Navigate replace to={APP_ROUTES.HOME} />}
                  />
                  {!userProject && !userOffChainSubProject && (
                    <Route
                      path={APP_ROUTES.PARTICIPANT}
                      element={<ParticipantForm />}
                    />
                  )}
                  {!isFundCabinet && (
                    <Route
                      path={APP_ROUTES.INSTITUTIONAL_SUBMISSION}
                      element={<InstitutionalSubmissionPage />}
                    />
                  )}
                  {isFundCabinet && (
                    <Route
                      path={APP_ROUTES.FUND_CABINET}
                      element={<FundCabinetPage />}
                    />
                  )}

                  <Route path={APP_ROUTES.ABOUT} element={<AboutPage />} />
                  <Route
                    path={APP_ROUTES.RATING_PROJECTS}
                    element={<RatingPage />}
                  />
                  <Route
                    path={APP_ROUTES.RATING_FUNDS}
                    element={<RatingPage tableType={ERatingTableType.FUNDS} />}
                  />
                </Routes>
              )}
            </>
          </Suspense>
        </div>
        {showBanner && <SubmissionBanner />}
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
});
