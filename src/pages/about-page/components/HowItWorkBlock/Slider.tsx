import {
  motion,
  animate,
  useMotionValue,
  AnimationPlaybackControls,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { EDimensions, ONE_SECOND_IN_MS } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';

import { useStyles } from './styles';
import { usePitchesSlide } from './userPitchesSlide';

const sliderPaddingY = {
  [EDimensions.DESKTOP]: 56,
  [EDimensions.LAPTOP]: 43,
  [EDimensions.MEDIUM]: 25,
  [EDimensions.SMALL]: 0,
  [EDimensions.UNKNOWN]: 0,
};

const sliderPaddingX = {
  [EDimensions.DESKTOP]: 0,
  [EDimensions.LAPTOP]: 0,
  [EDimensions.MEDIUM]: 0,
  [EDimensions.SMALL]: 10,
  [EDimensions.UNKNOWN]: 0,
};

export const Slider: React.FC = () => {
  const classes = useStyles();
  const dimension = useWindowDimensions();
  const isMobileDim = dimension === EDimensions.SMALL;
  const x = useMotionValue(sliderPaddingX[dimension]);
  const y = useMotionValue(sliderPaddingY[dimension]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const pitches = usePitchesSlide();

  const calculateNewCoord = (newInd: number) =>
    isMobileDim
      ? -newInd * (containerRef?.current?.clientWidth || 0) +
        sliderPaddingX[dimension]
      : -newInd * (containerRef?.current?.clientHeight || 0) +
        sliderPaddingY[dimension];

  useEffect(() => {
    let animationControls: AnimationPlaybackControls;

    const timeoutId = setTimeout(() => {
      setIndex(index + 1);
      animationControls = animate(
        isMobileDim ? x : y,
        calculateNewCoord(index + 1),
        { type: 'spring', bounce: 0, duration: 2.5 }
      );
    }, 5 * ONE_SECOND_IN_MS);

    return () => {
      animationControls?.stop;
      clearTimeout(timeoutId);
    };
  }, [index, isMobileDim]);

  return (
    <motion.div className={classes.slideContainer} ref={containerRef}>
      {[-1, 0, 1].map((i) => {
        const modulo = (i + index) % pitches.length;
        const currentIndex = modulo < 0 ? pitches.length + modulo : modulo;
        const newPos = `${(i + index) * 100}%`;

        return (
          <motion.div
            key={i}
            style={{
              x: isMobileDim ? x : 0,
              y: !isMobileDim ? y : 0,
              top: !isMobileDim ? newPos : 0,
              bottom: !isMobileDim ? newPos : 0,
              left: isMobileDim ? newPos : 0,
              right: isMobileDim ? newPos : 0,
              position: 'absolute',
            }}
          >
            {pitches[currentIndex]}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
