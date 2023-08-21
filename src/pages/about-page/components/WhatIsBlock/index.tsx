import {
  motion,
  useInView,
  animate,
  useMotionValue,
  AnimationPlaybackControls,
} from 'framer-motion';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import { ReactComponent as Arrows } from 'assets/images/about-page/what-is/arrows.svg';
import { ReactComponent as Chain } from 'assets/images/about-page/what-is/chain.svg';
import { ReactComponent as Listing } from 'assets/images/about-page/what-is/listing.svg';
import { Translate } from 'shared/components/translate/Translate';
import { ONE_SECOND_IN_MS } from 'shared/constants';

import { useStyles } from './styles';

const Slider: React.FC = () => {
  const classes = useStyles();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const calculateNewX = (newInd: number) =>
    -newInd * (containerRef.current?.clientWidth || 0);

  useEffect(() => {
    let animationControls: AnimationPlaybackControls;

    const timeoutId = setTimeout(() => {
      setIndex(index + 1);
      animationControls = animate(x, calculateNewX(index + 1), {
        type: 'spring',
        bounce: 0,
        duration: 2.5,
      });
    }, 5 * ONE_SECOND_IN_MS);

    return () => {
      animationControls?.stop;
      clearTimeout(timeoutId);
    };
  }, [index]);

  const items = [
    <div className={classes.scrollBlockContainer}>
      <Arrows className={classes.scrollBlockIcon} />
      <p className={classes.scrollBlockTextContent}>
        <Translate value="aboutPage.whatIsBlock.scrollBlockContent-1" />
      </p>
    </div>,
    <div className={classes.scrollBlockContainer}>
      <Chain className={classes.scrollBlockIcon} />
      <p className={classes.scrollBlockTextContent}>
        <Translate value="aboutPage.whatIsBlock.scrollBlockContent-2" />
      </p>
    </div>,
    <div className={classes.scrollBlockContainer}>
      <Listing className={classes.scrollBlockIcon} />
      <p className={classes.scrollBlockTextContent}>
        <Translate value="aboutPage.whatIsBlock.scrollBlockContent-3" />
      </p>
    </div>,
  ];

  return (
    <motion.div className={classes.slideContainer} ref={containerRef}>
      {[-1, 0, 1].map((i) => {
        const modulo = (i + index) % items.length;
        const currentIndex = modulo < 0 ? items.length + modulo : modulo;

        return (
          <motion.div
            key={i}
            style={{
              x,
              left: `${(i + index) * 100}%`,
              right: `${(i + index) * 100}%`,
              position: 'absolute',
            }}
          >
            {items[currentIndex]}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const WhatIsBlock: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: isInView ? 1 : 0.25 }}
        transition={{ ease: 'linear', duration: 1 }}
        className={classes.container}
      >
        <div className={classes.content}>
          <motion.div className={classes.leftContent}>
            <div className={classes.gradient}>
              <Slider />
            </div>
          </motion.div>
          <motion.div>
            <h3 className={classes.title}>
              <Translate value="aboutPage.whatIsBlock.title" />
            </h3>
            <h5
              className={classes.textContent}
              dangerouslySetInnerHTML={{
                __html: t('aboutPage.whatIsBlock.content-1'),
              }}
            />
            <h5
              className={classes.textContent}
              dangerouslySetInnerHTML={{
                __html: t('aboutPage.whatIsBlock.content-2'),
              }}
            />
          </motion.div>
        </div>
      </motion.div>
      <div className={classes.breakLine} />
    </>
  );
};
