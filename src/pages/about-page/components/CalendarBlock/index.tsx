import { motion, useInView } from 'framer-motion';
import { t } from 'i18next';
import { useRef } from 'react';

import { ReactComponent as CalendarIcon } from 'assets/images/icons/calendar-icon.svg';
import { OPACITY, TIME_PERIODS } from 'pages/about-page/styles';
import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

export const CalendarBlock: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fadeAnimation = {
    initial: { opacity: OPACITY.FULL },
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
        <div className={classes.mainContent}>
          <motion.div
            initial={{
              opacity: OPACITY.FULL / 4,
              transform: 'translateX(-70%)',
            }}
            animate={{
              opacity: OPACITY.FULL,
              transform: 'translateX(0%)',
            }}
            transition={{
              ease: 'linear',
              duration: TIME_PERIODS.ONE_SEC,
              delay: TIME_PERIODS.ONE_SEC + TIME_PERIODS.HALF_SEC,
            }}
            className={classes.calendarLayout}
          />
          <motion.div {...fadeAnimation} className={classes.calendarContent}>
            <CalendarIcon className={classes.calendarContentIcon} />
            <p
              className={classes.calendarContentText}
              dangerouslySetInnerHTML={{
                __html: t('aboutPage.calendarBlock.mainContent'),
              }}
            />
          </motion.div>
        </div>
        <motion.div {...fadeAnimation} className={classes.subContent}>
          <p className={classes.subContentText}>
            <Translate value="aboutPage.calendarBlock.subContent" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
