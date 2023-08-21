import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { getDefaultFadeAnimation, TIME_PERIODS } from 'pages/about-page/styles';
import { Translate } from 'shared/components/translate/Translate';

import { PARTNERS } from './data';
import { useStyles } from './styles';

export const Partners: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className={classes.container}>
      <motion.h3
        {...getDefaultFadeAnimation(isInView)}
        className={classes.title}
      >
        <Translate value="aboutPage.partners.title" />
      </motion.h3>
      <div className={classes.partnersContainer}>
        {PARTNERS.map(({ imgUrl, name }, i) => (
          <div className={classes.partnerItem} key={name + i}>
            <motion.div
              {...getDefaultFadeAnimation(isInView)}
              transition={{
                ease: 'linear',
                duration: 0.4,
                delay: TIME_PERIODS.ONE_SEC,
              }}
              style={{ backgroundImage: `url(${imgUrl})` }}
              key={name}
              className={classes.partnerItemImg}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
