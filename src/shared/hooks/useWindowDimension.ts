import { useState, useEffect } from 'react';

import {
  DESKTOP_WIDTH,
  EDimensions,
  LAPTOP_WIDTH,
  TABLET_WIDTH,
} from 'shared/constants';

export const isDesktop = (dimension: EDimensions) =>
  dimension !== EDimensions.SMALL &&
  dimension !== EDimensions.MEDIUM &&
  dimension !== EDimensions.UNKNOWN;

function getWindowDimensions() {
  const { matchMedia } = window;

  if (matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`).matches)
    return EDimensions.DESKTOP;
  if (
    matchMedia(
      `(min-width: ${LAPTOP_WIDTH}px) and (max-width: ${DESKTOP_WIDTH}px)`
    ).matches
  )
    return EDimensions.LAPTOP;
  else if (
    matchMedia(
      `(min-width: ${TABLET_WIDTH}px) and (max-width: ${LAPTOP_WIDTH}px)`
    ).matches
  )
    return EDimensions.MEDIUM;
  else if (matchMedia(`(max-width: ${TABLET_WIDTH}px)`).matches)
    return EDimensions.SMALL;

  return EDimensions.UNKNOWN;
}

export const useWindowDimensions = () => {
  const [windowDimension, setWindowDimension] = useState<EDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      const dimension = getWindowDimensions();
      if (dimension !== windowDimension) setWindowDimension(dimension);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimension]);

  return windowDimension;
};
