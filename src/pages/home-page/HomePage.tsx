import { EventTypes } from '@pitchtalk/contract-api-js/dist/interfaces';
import { useEffect, useMemo, useState } from 'react';
import { Slide, toast } from 'react-toastify';

import { setupEventsFormUrl } from 'services/config';
import { Announcements } from 'shared/components/announcements/Announcements';
import BigBanner from 'shared/components/banners/big-banner/BigBanner';
import { InvestPanel } from 'shared/components/invest-panel/InvestPanel';
import { Loader } from 'shared/components/loader/Loader';
import { Partners } from 'shared/components/partners/Partners';
import { Translate } from 'shared/components/translate/Translate';
import { TranslationTitle } from 'shared/components/translation-title/TranslationTitle';
import { VideoPlayer } from 'shared/components/video-player/VideoPlayer';
import { ONE_SECOND_IN_MS, PARTICIPATE_BANNER_SHOWN } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { useProjectUpdate } from 'shared/hooks/useProjectUpdate';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';
import {
  isDesktop as checkIsDesktop,
  useWindowDimensions,
} from 'shared/hooks/useWindowDimension';
import { EPreviewType } from 'shared/interfaces';
import { isInvestmentsAvailable } from 'shared/utils/pitchUtils';
import { selectClosestEvent } from 'store/selectors/events';
import { selectClosestPitch } from 'store/slices/closestPitch';
import { selectPitches } from 'store/slices/pitches';
import { selectUserProject } from 'store/slices/user';
import { selectProjectVesting } from 'store/slices/vesting';
import { getHomePageEventsData } from 'store/thunks/events';

import { EventsByTypeBlock } from './components/EventsByTypeBlock/EventsByTypeBlock';
import { HeaderInfo } from './components/HeaderInfo/HeaderInfo';
import { HeaderMetaInfo } from './components/HeaderMetaInfo/HeaderMetaInfo';
import { NextEvents } from './components/NextEvents/NextEvents';
import { useStyles } from './styles';

const previewType = EPreviewType.EVENT as EPreviewType;

const onSetupEventClick = () =>
  window.open(setupEventsFormUrl, 'blank', 'noopener noreferrer');

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOverlay, setIsOverlay] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const pitchesList = useAppSelector(selectPitches);
  const userProject = useAppSelector(selectUserProject);
  const { pitch, status: pitchStatus } = useAppSelector(selectClosestPitch);
  const closestEvent = useAppSelector(selectClosestEvent);
  const dimension = useWindowDimensions();
  const isDesktop = checkIsDesktop(dimension);

  const announcements = useMemo(() => {
    const now = Date.now();
    return pitchesList.filter(
      (pitch) => pitch.starts_on + pitch.duration > now
    );
  }, [pitchesList]);

  const { project } = pitch || {};

  const vesting = useAppSelector((state) =>
    selectProjectVesting(state, project?.project_id)
  );

  const { investmentsAvailable, donationsAvailable } = isInvestmentsAvailable(
    project,
    Number(vesting?.amount) > 0
  );

  // Project auto refresh
  useProjectUpdate(project?.project_id);

  useEffect(() => {
    const bannerShown = Boolean(localStorage.getItem(PARTICIPATE_BANNER_SHOWN));
    const bannerClasses = `banner-container ${!isDesktop ? 'noHover' : ''}`;

    if (bannerShown || !!userProject) return;

    const bannerInterval = setTimeout(() => {
      const Banner = <BigBanner />;
      toast.success(Banner, {
        toastId: 'banner',
        autoClose: false,
        theme: 'dark',
        transition: Slide,
        pauseOnHover: true,
        closeButton: false,
        hideProgressBar: true,
        icon: false,
        className: bannerClasses,
      });
      localStorage.setItem(PARTICIPATE_BANNER_SHOWN, 'true');
    }, ONE_SECOND_IN_MS * 2);

    return () => clearTimeout(bannerInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProject]);

  useScrollToTop();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getHomePageEventsData()).finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div>
          <HeaderInfo />
          <HeaderMetaInfo />
          <NextEvents />
          <div className={classes.events}>
            <h3 className={classes.eventsTitle}>
              <Translate value="mainPage.events.blockTitle" />
            </h3>
            <div className={classes.eventsList}>
              <EventsByTypeBlock
                type={EventTypes.LECTURE}
                onSetupEventBtnClick={onSetupEventClick}
              />
              <EventsByTypeBlock
                type={EventTypes.TOURNAMENT}
                onSetupEventBtnClick={onSetupEventClick}
              />
              <EventsByTypeBlock
                type={EventTypes.HACKATHON}
                onSetupEventBtnClick={onSetupEventClick}
              />
            </div>
          </div>
          <div className={classes.playerContentWrapper}>
            <div className={classes.playerContent}>
              {!(pitch && project) ? (
                <Loader styles={{ margin: '200px auto' }} />
              ) : (
                <>
                  <TranslationTitle
                    titleStatus={
                      previewType === EPreviewType.PITCH
                        ? pitchStatus
                        : closestEvent?.status
                    }
                    item={
                      previewType === EPreviewType.PITCH ? pitch : closestEvent
                    }
                  />
                  <div className={classes.playerHolder}>
                    <VideoPlayer
                      item={
                        previewType === EPreviewType.PITCH
                          ? pitch
                          : closestEvent
                      }
                      isOverlay={isOverlay}
                      isPlaying={isPlaying}
                      handleChangeIsPlaying={setIsPlaying}
                      handleChangeIsOverlay={setIsOverlay}
                    />
                    {previewType === EPreviewType.PITCH && (
                      <InvestPanel
                        projectId={project.project_id}
                        investmentsAvailable={investmentsAvailable}
                        donationsAvailable={donationsAvailable}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <Announcements announcements={announcements} isHomePage />
          </div>
          <div className={classes.partnersWrapper}>
            <Partners />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
