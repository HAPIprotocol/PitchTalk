import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import tabletScreenIcon from 'assets/images/about-page/tablet/tablet-screen-bg-icon.png';
import tabletScreenBg from 'assets/images/about-page/tablet/tablet-screen-bg.png';
import { TabletLeft } from 'assets/images/about-page/tablet/TabletLeft';
import { TabletRight } from 'assets/images/about-page/tablet/TabletRight';
import { ReactComponent as PlayIcon } from 'assets/images/icons/play-icon.svg';
import { TIME_PERIODS } from 'pages/about-page/styles';
import { pitchTalkSocialLinks } from 'services/config';
import { SocialLink } from 'shared/components/social-link/SocialLink';
import { Translate } from 'shared/components/translate/Translate';
import { EDimensions } from 'shared/constants';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import { normalizeIcons } from 'shared/utils/socialLinkUtils';

import { useStyles } from './styles';

const PitchTalkLinks: React.FC<{ classes: Record<string, string> }> = ({
  classes,
}) => (
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
);

export const Tablets: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const dimension = useWindowDimensions();
  const isInView = useInView(ref, { once: true });

  const tabletsTranslate = dimension === EDimensions.SMALL ? 30 : 40;

  return (
    <div>
      {dimension === EDimensions.SMALL && <PitchTalkLinks classes={classes} />}
      <motion.div ref={ref} className={classes.screensContainer}>
        <motion.div
          initial={{ transform: `translateX(${-tabletsTranslate})` }}
          animate={{
            transform: isInView
              ? 'translateX(0%)'
              : `translateX(${-tabletsTranslate})'`,
          }}
          transition={{
            ease: 'linear',
            duration: TIME_PERIODS.ONE_SEC,
            delay: TIME_PERIODS.HALF_SEC,
          }}
          className={classes.tabletWrapper + ' left'}
        >
          <TabletLeft>
            <div className={classes.screenLeft}>
              <div className={classes.bgContent}>
                <img src={tabletScreenBg} alt="" className={classes.bgImg} />
                <img src={tabletScreenIcon} alt="" className={classes.bgIcon} />
              </div>
              <div className={classes.playButton}>
                <PlayIcon />
              </div>
              <div className={classes.screenLeftContent}>
                {dimension !== EDimensions.SMALL && (
                  <PitchTalkLinks classes={classes} />
                )}
                <div className={classes.screenLeftTextContent}>
                  <h3 className={classes.contentTitle}>
                    <Translate value="aboutPage.screenLeft.title" />
                  </h3>
                  <h4 className={classes.contentSubTitle}>
                    <Translate value="aboutPage.screenLeft.subTitle" />
                  </h4>
                  <h6 className={classes.contentText}>
                    <Translate value="aboutPage.screenLeft.content" />
                  </h6>
                </div>
              </div>
            </div>
          </TabletLeft>
        </motion.div>
        <motion.div
          initial={{ transform: `translateX(${tabletsTranslate})` }}
          animate={{
            transform: isInView
              ? 'translateX(0%)'
              : `translateX(${tabletsTranslate})'`,
          }}
          transition={{
            ease: 'linear',
            duration: TIME_PERIODS.ONE_SEC,
            delay: TIME_PERIODS.HALF_SEC,
          }}
          className={classes.tabletWrapper + ' right'}
        >
          <TabletRight />
        </motion.div>
      </motion.div>
    </div>
  );
};
