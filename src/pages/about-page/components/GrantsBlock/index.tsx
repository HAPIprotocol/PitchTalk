import { motion, useInView } from 'framer-motion';
import { t } from 'i18next';
import { useRef } from 'react';

import { ReactComponent as ArrowIcon } from 'assets/images/about-page/arrow.svg';
import { OPACITY, TIME_PERIODS } from 'pages/about-page/styles';
import { pitchTalkSocialLinks } from 'services/config';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';

const GRANTS_INFO_CONTENT = [1, 2, 3];
const GRANTS_INFO_LIST = [1, 2, 3, 4, 1, 2, 3, 4];

const MARQUEE_PADDINGS = {
  [EDimensions.DESKTOP]: { itemWidth: 276, titleWidth: 440 },
  [EDimensions.LAPTOP]: { itemWidth: 296, titleWidth: 336 },
  [EDimensions.MEDIUM]: { itemWidth: 300, titleWidth: 203 },
  [EDimensions.SMALL]: { itemWidth: 310, titleWidth: 0 },
  [EDimensions.UNKNOWN]: { itemWidth: 276, titleWidth: 0 },
};

export const GrantsBlock: React.FC = () => {
  const classes = useStyles();
  const dimension = useWindowDimensions();
  const ref = useRef(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const marqueeStyles = {
    animate: {
      x: [
        -(marqueeRef.current?.clientWidth || 0) -
          MARQUEE_PADDINGS[dimension].itemWidth,
        MARQUEE_PADDINGS[dimension].titleWidth,
      ],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear',
        },
      },
    },
  };

  const fadeAnimation = {
    initial: { opacity: OPACITY.NO_OPACITY },
    animate: { opacity: isInView ? OPACITY.FULL : OPACITY.NO_OPACITY },
    transition: {
      ease: 'linear',
      duration: TIME_PERIODS.ONE_SEC,
      delay: TIME_PERIODS.HALF_SEC,
    },
  };

  return (
    <motion.div ref={ref} className={classes.container}>
      <div className={classes.content}>
        <h4 className={classes.title}>
          <Translate value="aboutPage.grantsBlock.title" />
        </h4>
        <div className={classes.mainContent}>
          <motion.div {...fadeAnimation} className={classes.leftContent}>
            {GRANTS_INFO_CONTENT.map((i) => (
              <p
                key={i}
                className={classes.contentText}
                dangerouslySetInnerHTML={{
                  __html: t(`aboutPage.grantsBlock.content-${i}`),
                }}
              />
            ))}
          </motion.div>
          <motion.div className={classes.rightContent}>
            <h4 className={classes.subContentTitle}>
              <Translate value="aboutPage.grantsBlock.subTitle" />
            </h4>
            <div className={classes.subContentContainer}>
              {GRANTS_INFO_CONTENT.map((i) => (
                <p className={classes.subContentText + ` i-${i}`} key={i}>
                  <Translate value={`aboutPage.grantsBlock.subContent-${i}`} />
                </p>
              ))}
            </div>
            {dimension === EDimensions.SMALL && (
              <div className={classes.socialLinks}>
                {Object.entries(normalizeIcons(pitchTalkSocialLinks)).map(
                  (link: [string, string], ind) => (
                    <SocialLink
                      key={link[0] + ind}
                      link={link}
                      styles={classes.socialLink}
                    />
                  )
                )}
              </div>
            )}
          </motion.div>
        </div>
        {dimension === EDimensions.SMALL && (
          <div className={classes.summaryTitleContainer}>
            <p className={classes.summaryTitle}>
              <Translate value="aboutPage.grantsBlock.summaryTitle" />
            </p>
          </div>
        )}
        <motion.div {...fadeAnimation} className={classes.summaryContainer}>
          {dimension !== EDimensions.SMALL && (
            <div className={classes.summaryTitleContainer}>
              <p className={classes.summaryTitle}>
                <Translate value="aboutPage.grantsBlock.summaryTitle" />
              </p>
            </div>
          )}
          <motion.div
            variants={marqueeStyles}
            animate="animate"
            className={classes.marqueeContainer}
            ref={marqueeRef}
          >
            {GRANTS_INFO_LIST.map((infoInd, i) => (
              <div className={classes.grantInfo} key={i}>
                <p
                  className={classes.grantInfoContent + ` i-${infoInd}`}
                  dangerouslySetInnerHTML={{
                    __html: t(`aboutPage.grantsBlock.summary-${infoInd}`),
                  }}
                />
                <ArrowIcon className={classes.arrowIcon} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
