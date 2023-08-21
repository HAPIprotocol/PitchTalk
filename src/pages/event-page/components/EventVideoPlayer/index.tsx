import { t } from 'i18next';
import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import noVideoImg from 'assets/images/no-video.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useLocation } from 'services/router';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions, ONE_MINUTE_IN_MS } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { isEventStarted as checkIsEventStarted } from 'shared/utils/eventsUtils';
import getPlayerSize from 'shared/utils/getPlayerSize';
import { IEventData } from 'store/types/events';

import { CountDown } from './CountDown';
import { useStyles } from './styles';
import { EventComments } from '../EventComments';
import { SectionTitle } from '../SectionTitle';

interface IEventVideoPlayer {
  event: IEventData;
}

export const EventVideoPlayer: React.FC<IEventVideoPlayer> = ({ event }) => {
  const [isOverlay, setIsOverlay] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { pathname } = useLocation();
  const windowDimension = useWindowDimensions();
  const { playerWidth: maxPlayerWidth, playerHeight: maxPlayerHeight } =
    useMemo(() => getPlayerSize(EDimensions.DESKTOP, pathname), [pathname]);
  const {
    playerWidth: playerWidthFromDimension,
    playerHeight: playerHeightFromDimension,
  } = useMemo(
    () => getPlayerSize(windowDimension, pathname),
    [windowDimension, pathname]
  );

  const { playerWidth, playerHeight } = {
    playerWidth:
      playerWidthFromDimension > maxPlayerWidth
        ? maxPlayerWidth
        : playerWidthFromDimension,
    playerHeight:
      playerHeightFromDimension > maxPlayerHeight
        ? maxPlayerHeight
        : playerHeightFromDimension,
  };

  const { banner } = getCorrectIPFSLinks({ banner: event?.banner });
  const sizes = { width: playerWidth, height: playerHeight };

  const isEventStarted = checkIsEventStarted(event);
  const classes = useStyles({ banner: isEventStarted ? banner : noVideoImg });

  return (
    <div className={classes.sectionWrapper}>
      <SectionTitle title={t('events.eventSection.liveStream')} />
      <div className={classes.playerContainer} style={{ ...sizes }}>
        <div
          className={classes.playerOverlay}
          style={
            !isOverlay && isPlaying
              ? { visibility: 'hidden', ...sizes }
              : { ...sizes }
          }
        >
          <div className={classes.overlayDark} />
          {isEventStarted ? (
            <div className={classes.playButton}>
              <PlayIcon onClick={() => setIsPlaying(true)} />
            </div>
          ) : (
            <div className={classes.countDownWrapper}>
              <p className={classes.soonText}>
                <Translate value="events.liveStreamStartSoon" />
              </p>
              <CountDown
                endDate={event.start_date}
                onCountDownEnd={() => setIsPlaying(true)}
              />
            </div>
          )}
        </div>
        {event && (
          <ReactPlayer
            className={classes.player}
            playing={isPlaying}
            url={event.video_url}
            onReady={() => setIsOverlay(false)}
            controls
            width={sizes.width}
            height={sizes.height}
          />
        )}
      </div>
      {isEventStarted && (
        <EventComments
          serverEventId={event.serverEvent.id}
          isLiveEvent={!!(Date.now() < event.end_date + 60 * ONE_MINUTE_IN_MS)}
        />
      )}
    </div>
  );
};
