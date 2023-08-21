import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { APP_ROUTES } from 'routes';
import { useLocation, useNavigate } from 'services/router';
import { Translate } from 'shared/components/translate/Translate';
import { useScrollToTop } from 'shared/hooks/useScrollToTop';
import { Question } from 'shared/interfaces';

import { useStyles } from './styles';
import { HOW_TO_SECTIONS } from '../data/investors/data';

const QuestionPage: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [qsState, setQsState] = useState<Question>();
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const getQuestionData = async () => {
      const questionUrl = location.pathname.replace('/how-to/', '');
      try {
        const currentQuestion = HOW_TO_SECTIONS.map((section) =>
          section.questions.find((qs) => qs.url === questionUrl)
        ).filter(Boolean)[0];

        if (!currentQuestion) {
          navigate(APP_ROUTES.HOW_TO_INVESTORS);
          return;
        }
        const answer = await currentQuestion.answer;

        setQsState(currentQuestion);
        setAnswer(answer);
      } catch (error) {
        console.warn(error);
        setAnswer('');
      }
    };
    getQuestionData();
  }, []);

  useScrollToTop();

  return (
    <div className={classes.container}>
      <div className={classes.pageWrapper}>
        <h4 className={classes.questionPath}>
          <span onClick={() => navigate(APP_ROUTES.HOW_TO_INVESTORS)}>
            <Translate value={'navigation.howTo'} />
          </span>
          <span> / {qsState?.question}</span>
        </h4>
        <h2 className={classes.question}>{qsState?.question}</h2>
        <ReactMarkdown children={answer} className={classes.answer} />
        <div className={classes.imagesWrapper}>
          {qsState?.answerImages?.map((img, ind) => (
            <img
              src={img.url}
              style={{ objectPosition: img.position }}
              key={ind}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
