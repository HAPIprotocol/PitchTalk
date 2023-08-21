import { useRef } from 'react';
import ReactPlayer from 'react-player';

import { APP_ROUTES } from 'routes';
import { useLocation, useNavigate } from 'services/router';
import i18n from 'services/translation';
import { Translate } from 'shared/components/translate/Translate';
import { useWindowDimensions } from 'shared/hooks/useWindowDimension';
import getPlayerSize from 'shared/utils/getPlayerSize';

import { HOW_TO_SECTIONS, INVESTOR_VIDEO_URL } from './data/investors/data';
import { Navigation } from './navigation/Navigation';
import { useStyles } from './styles';

const HowToPage: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dimension = useWindowDimensions();
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const redirectToQuestionPage = (question: { url: string }) => {
    navigate(APP_ROUTES.HOW_TO.replace(':section/:question', question.url));
  };
  const { playerWidth, playerHeight } = getPlayerSize(dimension, pathname);
  const links = [
    `${i18n.t('howToPage.investorsPage.sections.video')}`,
    ...HOW_TO_SECTIONS.map((section) => section.tag),
  ];

  return (
    <div className={classes.container}>
      <div className={classes.pageWrapper}>
        <div className={classes.pageHeader}>
          <h2 className={classes.pageTitle}>
            <Translate value="howToPage.investorsPage.title" />
          </h2>
          <h2 className={classes.pageSubTitle}>
            <Navigation wrapperRef={wrapperRef} links={links} />
          </h2>
        </div>
        <div ref={wrapperRef} className={classes.sectionsWrapper}>
          <section className={classes.videoSection}>
            <div className={classes.videoInfo}>
              <label>
                / <Translate value="howToPage.investorsPage.sections.video" />
              </label>
              <h5>
                <Translate value="howToPage.investorsPage.questions.video" />
              </h5>
            </div>
            <div className={classes.playerHolder}>
              <ReactPlayer
                url={INVESTOR_VIDEO_URL}
                controls
                width={playerWidth}
                height={playerHeight}
              />
            </div>
          </section>
          {HOW_TO_SECTIONS.map((section, ind) => (
            <section className={classes.infoSection} key={section.tag + ind}>
              <div className={classes.sectionTitle}>
                <label>/ {section.tag}</label>
                <hr />
              </div>
              <div className={classes.infoItems}>
                {section.questions.map((question, ind) => (
                  <div
                    className={classes.infoItem}
                    onClick={() => redirectToQuestionPage(question)}
                    key={question.url + ind}
                  >
                    <img src={question.img} loading="lazy" />
                    <div>{section.tag}</div>
                    <h5>{question.question}</h5>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToPage;
