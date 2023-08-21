import { useEffect } from 'react';

import {
  Header,
  Tablets,
  WhatIsBlock,
  HowItWorkBlock,
  CalendarBlock,
  FeaturesBlock,
  GrantsBlock,
  Partners,
} from './components';
import { useStyles } from './styles';

const AboutPage: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={classes.pageContainer}>
      <Header />
      <Tablets />
      <WhatIsBlock />
      <HowItWorkBlock />
      <CalendarBlock />
      <FeaturesBlock />
      <GrantsBlock />
      <Partners />
    </div>
  );
};

export default AboutPage;
