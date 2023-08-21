import { motion, useInView } from 'framer-motion';
import { t } from 'i18next';
import { useRef } from 'react';

import { ReactComponent as ArrowIcon } from 'assets/images/about-page/arrow.svg';
import { getDefaultFadeAnimation } from 'pages/about-page/styles';
import { Translate } from 'shared/components/translate/Translate';

import { Slider } from './Slider';
import { useStyles } from './styles';

export const HowItWorkBlock: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        ref={ref}
        {...getDefaultFadeAnimation(isInView)}
        className={classes.container}
      >
        <div className={classes.content}>
          <motion.div className={classes.leftContent}>
            <h3 className={classes.title}>
              <Translate value="aboutPage.howItWork.title" />
            </h3>
            <ArrowIcon className={classes.arrowIcon} />
            <h5
              className={classes.textContent}
              dangerouslySetInnerHTML={{
                __html: t('aboutPage.howItWork.content'),
              }}
            />
          </motion.div>
          <motion.div className={classes.rightContent}>
            <Slider />
          </motion.div>
        </div>
      </motion.div>
      <div className={classes.breakLine} />
    </>
  );
};
