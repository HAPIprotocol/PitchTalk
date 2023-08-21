import { Pitch as PitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import format from 'date-fns/format';
import { memo, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import getPlayerSize from 'shared/utils/getPlayerSize';

import { useStyles } from './styles';

interface IPitchProps {
  ind: number;
  pitch: PitchType;
  isPlaying: boolean;
  setIsPlaying: () => void;
  banner: string;
  isOnChainProject: boolean;
}

export const Pitch: React.FC<IPitchProps> = memo(
  ({ ind, pitch, isPlaying, setIsPlaying, banner, isOnChainProject }) => {
    const classes = useStyles({ banner });
    const [isOverlay, setIsOverlay] = useState<boolean>(true);

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

    const sizes = { width: playerWidth, height: playerHeight };

    const pitchStart = isOnChainProject
      ? pitch.starts_on ?? Date.now()
      : new Date(pitch?.starts_on ?? Date.now()).valueOf();

    return (
      <div className={classes.pitchContainer}>
        <div className={classes.playerContainer} style={{ ...sizes }}>
          <div
            className={classes.playerOverlay}
            style={
              !isOverlay && isPlaying
                ? { visibility: 'hidden', ...sizes }
                : { ...sizes }
            }
          >
            <div className={classes.playButton}>
              <PlayIcon onClick={setIsPlaying} />
            </div>
          </div>
          {pitch.video_url && (
            <ReactPlayer
              className={classes.player}
              playing={isPlaying}
              url={pitch.video_url}
              onReady={() => setIsOverlay(false)}
              controls
              width={sizes.width}
              height={sizes.height}
            />
          )}
        </div>
        <div className={classes.pitchInfo}>
          <h3 className={classes.pitchName}>
            <span>#{ind} </span>
            {pitch.name}
          </h3>
          <p className={classes.pitchMeta}>
            <span>By {pitch.speaker_name}</span>
            <span>{format(pitchStart, 'PP p')}</span>
          </p>
        </div>
      </div>
    );
  }
);
