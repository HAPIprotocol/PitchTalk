import { useNavigate } from 'react-router-dom';

import { ReactComponent as HowToIcon } from 'assets/images/icons/how-to-icon.svg';
import { ReactComponent as PitchtalkLogo } from 'assets/images/logo.svg';
import { ReactComponent as TitleLogo } from 'assets/images/title-logo.svg';
import { APP_ROUTES } from 'routes';

import { useStyles } from './styles';
import { Button } from '../button/Button';
import { Translate } from '../translate/Translate';

export const SubmissionBanner = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const goToParticipatePage = () => {
    navigate(APP_ROUTES.PARTICIPANT);
  };
  const goToHowToPage = () => {
    navigate(APP_ROUTES.HOW_TO_PROJECTS);
  };
  return (
    <div className={classes.overlay}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>
              <Translate value="submissionBanner.title" />
            </div>
            <div className={classes.advantages}>
              <div className={classes.advantagesItem}>
                <Translate value="submissionBanner.getAccess" />
              </div>
              <div className={classes.advantagesItem}>
                <Translate value="submissionBanner.applyRegistration" />
              </div>
              <div className={classes.advantagesItem}>
                <Translate value="submissionBanner.manageProject" />
              </div>
              <div className={classes.howToItem} onClick={goToHowToPage}>
                <HowToIcon className={classes.howToIcon} />
                <span>
                  <Translate value="navigation.howTo" />
                </span>
              </div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              extraClass={classes.createProjectButton}
              label={'submissionBanner.createProject'}
              handleClick={goToParticipatePage}
            />
            <div className={classes.logoWrapper}>
              <PitchtalkLogo className={classes.pitchTalkLogo} />
              <TitleLogo className={classes.titleLogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
