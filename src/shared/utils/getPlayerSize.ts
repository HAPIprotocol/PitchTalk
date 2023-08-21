import { APP_ROUTES } from 'routes';
import { EDimensions } from 'shared/constants';

interface IVideoPlayerConfig {
  playerWidth: number;
  playerHeight: number;
}
const HOME_PAGE_VIDEO_SIZES: { [key: string]: IVideoPlayerConfig } = {
  [EDimensions.DESKTOP]: { playerWidth: 848, playerHeight: 477 },
  [EDimensions.LAPTOP]: { playerWidth: 770, playerHeight: 433 },
  [EDimensions.MEDIUM]: { playerWidth: 568, playerHeight: 320 },
  [EDimensions.SMALL]: { playerWidth: 240, playerHeight: 136 },
  [EDimensions.UNKNOWN]: { playerWidth: 640, playerHeight: 320 },
};

const PROJECT_PAGE_VIDEO_SIZES: { [key: string]: IVideoPlayerConfig } = {
  [EDimensions.DESKTOP]: { playerWidth: 690, playerHeight: 391 },
  [EDimensions.LAPTOP]: { playerWidth: 690, playerHeight: 391 },
  [EDimensions.MEDIUM]: { playerWidth: 690, playerHeight: 391 },
  [EDimensions.SMALL]: { playerWidth: 320, playerHeight: 180 },
  [EDimensions.UNKNOWN]: { playerWidth: 690, playerHeight: 391 },
};

const PROFILE_PAGE_VIDEO_SIZES: { [key: string]: IVideoPlayerConfig } = {
  [EDimensions.DESKTOP]: { playerWidth: 848, playerHeight: 477 },
  [EDimensions.LAPTOP]: { playerWidth: 770, playerHeight: 433 },
  [EDimensions.MEDIUM]: { playerWidth: 558, playerHeight: 314 },
  [EDimensions.SMALL]: { playerWidth: 272, playerHeight: 153 },
  [EDimensions.UNKNOWN]: { playerWidth: 640, playerHeight: 320 },
};

const HOW_TO_PAGE_VIDEO_SIZES: { [key: string]: IVideoPlayerConfig } = {
  [EDimensions.DESKTOP]: { playerWidth: 690, playerHeight: 374 },
  [EDimensions.LAPTOP]: { playerWidth: 602, playerHeight: 326 },
  [EDimensions.MEDIUM]: { playerWidth: 400, playerHeight: 216 },
  [EDimensions.SMALL]: { playerWidth: 279, playerHeight: 151 },
  [EDimensions.UNKNOWN]: { playerWidth: 640, playerHeight: 320 },
};

export default function (
  dimension: EDimensions,
  path: string
): IVideoPlayerConfig {
  if (path.includes(`${APP_ROUTES.PROJECTS}/`)) {
    return PROJECT_PAGE_VIDEO_SIZES[dimension];
  } else if (path.includes(`${APP_ROUTES.PROFILE}`)) {
    return PROFILE_PAGE_VIDEO_SIZES[dimension];
  } else if (
    path.includes(APP_ROUTES.HOW_TO_INVESTORS) ||
    path.includes(APP_ROUTES.HOW_TO_PROJECTS)
  ) {
    return HOW_TO_PAGE_VIDEO_SIZES[dimension];
  } else {
    return HOME_PAGE_VIDEO_SIZES[dimension];
  }
}
