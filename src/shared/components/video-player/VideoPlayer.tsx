import { SocialLinks } from '@pitchtalk/contract-api-js/dist/core';
import { subHours } from 'date-fns';
import { useMemo } from 'react';
import ReactPlayer from 'react-player/lazy';

import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { useLocation } from 'services/router';
import { EDimensions, EMPTY_STRING } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { PitchWithProjectData } from 'shared/interfaces';
import getPlayerSize from 'shared/utils/getPlayerSize';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';
import { IClosestEventData } from 'store/types/events';

import { useStyles } from './styles';
import { SocialLink } from '../social-link/SocialLink';

const checkIsPitchType = (
  item: PitchWithProjectData | (IClosestEventData | null)
): item is PitchWithProjectData => !!(item as PitchWithProjectData)?.project;

interface IVideoPlayer {
  isOverlay: boolean;
  isPlaying: boolean;
  handleChangeIsPlaying: (value: boolean) => void;
  handleChangeIsOverlay: (value: boolean) => void;
  emptyOverlay?: boolean;
  showPlayButton?: boolean;
  playBtnCenter?: boolean;
  item: PitchWithProjectData | (IClosestEventData | null);
  maxPlayerSize?: EDimensions;
}

export const VideoPlayer: React.FC<IVideoPlayer> = ({
  isOverlay,
  isPlaying,
  handleChangeIsPlaying,
  handleChangeIsOverlay,
  item,
  emptyOverlay = false,
  showPlayButton = false,
  playBtnCenter = false,
  maxPlayerSize = EDimensions.DESKTOP,
}) => {
  const { pathname } = useLocation();
  const windowDimension = useWindowDimensions();
  const { playerWidth: maxPlayerWidth, playerHeight: maxPlayerHeight } =
    useMemo(
      () => getPlayerSize(maxPlayerSize, pathname),
      [maxPlayerSize, pathname]
    );
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

  const isPitchType = checkIsPitchType(item);

  const { project, ...pitchData } = isPitchType
    ? item
    : ({} as PitchWithProjectData);

  const banner = getCorrectIPFSLinks({
    banner: isPitchType ? project?.banner : item?.banner,
  })?.banner || EMPTY_STRING;

  const classes = useStyles({
    banner,
    width: playerWidth,
    height: playerHeight,
    playBtnCenter,
  });

  const sizes = { width: playerWidth, height: playerHeight };

  const isItemAvailable = isPitchType
    ? pitchData && subHours(pitchData.starts_on, 1).getTime() < Date.now()
    : item && new Date(item.start_date).valueOf() < Date.now();

  return (
    <div className={classes.playerContainer} style={{ ...sizes }}>
      <div
        className={classes.playerOverlay}
        style={
          !isOverlay && isPlaying
            ? { visibility: 'hidden', ...sizes }
            : { ...sizes }
        }
      >
        {emptyOverlay ? (
          <>
            {showPlayButton && isItemAvailable && (
              <div className={classes.playButton}>
                <PlayIcon onClick={() => handleChangeIsPlaying(true)} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className={classes.overlayDark} />
            <div className={classes.playButton}>
              {isItemAvailable && (
                <PlayIcon onClick={() => handleChangeIsPlaying(true)} />
              )}
            </div>
            <div className={classes.projectDescription}>
              <div className={classes.socialLinks}>
                {(isPitchType ? project?.social_links : item?.social_links) &&
                  Object.entries(
                    normalizeIcons(
                      (isPitchType
                        ? project?.social_links
                        : item?.social_links) || ({} as SocialLinks)
                    )
                  ).map((link: [string, string], ind) => (
                    <SocialLink
                      width={28}
                      height={28}
                      key={ind}
                      link={link}
                      styles={classes.socialLink}
                    />
                  ))}
                {(isPitchType ? project?.project_url : item?.web_url) && (
                  <SocialLink
                    link={[
                      'web_url',
                      (isPitchType ? project?.project_url : item?.web_url) ||
                        '',
                    ]}
                    styles={classes.socialLink + ' web-icon'}
                  />
                )}
              </div>
              <abbr
                className={classes.projectName}
                title={isPitchType ? project?.name : item?.name}
              >
                {isPitchType ? project?.name : item?.name}
              </abbr>
              <abbr
                className={classes.speakerName}
                title={pitchData?.speaker_name}
              >
                {pitchData?.speaker_name}
              </abbr>
              <span className={classes.projectLegend}>
                {isPitchType ? project?.description : item?.short_description}
              </span>
            </div>
          </>
        )}
      </div>
      {pitchData && (
        <ReactPlayer
          className={classes.player}
          playing={isPlaying}
          url={isPitchType ? pitchData.video_url : item?.video_url}
          onReady={() => handleChangeIsOverlay(false)}
          controls
          width={playerWidth}
          height={playerHeight}
        />
      )}
    </div>
  );
};
