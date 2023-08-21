import { motion, useInView } from 'framer-motion';
import { t } from 'i18next';
import { useRef } from 'react';

import { getDefaultFadeAnimation } from 'pages/about-page/styles';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';

import { useStyles } from './styles';

const FEATURE_LIST = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

const featureItemPadding = {
  [EDimensions.DESKTOP]: 90,
  [EDimensions.LAPTOP]: 68,
  [EDimensions.MEDIUM]: 40,
  [EDimensions.SMALL]: 40,
  [EDimensions.UNKNOWN]: 0,
};

export const FeaturesBlock: React.FC = () => {
  const classes = useStyles();
  const dimension = useWindowDimensions();
  const ref = useRef(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const marqueeStyles = {
    animate: {
      y: [
        featureItemPadding[dimension] / 2 + 2,
        -(marqueeRef?.current?.clientHeight || 0) / 2,
      ],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 25,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <motion.div {...getDefaultFadeAnimation(isInView)}>
      {dimension === EDimensions.SMALL && (
        <h4 className={classes.title}>
          <Translate value="aboutPage.featuresBlock.title" />
        </h4>
      )}
      <div className={classes.breakLine} />
      <motion.div ref={ref} className={classes.container}>
        <div className={classes.content}>
          {dimension !== EDimensions.SMALL && (
            <h4 className={classes.title}>
              <Translate value="aboutPage.featuresBlock.title" />
            </h4>
          )}
          <motion.div className={classes.featureListContainer}>
            <motion.div
              ref={marqueeRef}
              variants={marqueeStyles}
              animate="animate"
              className={classes.featureListContainerMarquee}
            >
              {FEATURE_LIST.map((featureInd, i) => (
                <div className={classes.featureItem} key={i}>
                  <span className={classes.featureTitle}>{featureInd}</span>
                  <p
                    className={classes.featureContent}
                    dangerouslySetInnerHTML={{
                      __html: t(
                        `aboutPage.featuresBlock.feature-${featureInd}`
                      ),
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div className={classes.breakLine} />
    </motion.div>
  );
};
