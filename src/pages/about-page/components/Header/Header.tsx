import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

export const Header: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: isInView ? 1 : 0.25 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={classes.aboutPageHeader}
    >
      <Translate value="aboutPage.blockchainHead" />
    </motion.header>
  );
};
