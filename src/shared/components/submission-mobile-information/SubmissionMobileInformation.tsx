import { Translate } from 'shared/components/translate/Translate';

import { useStyles } from './styles';

const SubmissionMobileInformation: React.FC = () => {
  const classes = useStyles();
  const btnClasses = `${classes.formBtn} ${classes.payBtn}`;
  return (
    <div className={classes.mobileContainer}>
      <div className={classes.mobileInputs}>
        <div className={classes.blurOverlay}>
          <span className={classes.mobileText}>
            <Translate value="participantForm.mobileSubmissionText" />
          </span>
        </div>
        <span className={classes.formGroupTitle}>
          <Translate value="participantForm.generalInformation" />
        </span>
        <input className={`${classes.formInput}`} />
        <span className={classes.formGroupTitle}>
          <Translate value="participantForm.generalInformation" />
        </span>
        <input className={`${classes.formInput}`} />
        <span className={classes.formGroupTitle}>
          <Translate value="participantForm.generalInformation" />
        </span>
        <div className={classes.formInputFlex}>
          <input className={`${classes.formInput}`} />
          <button className={`${classes.formBtn} ${classes.formUploadBtn}`}>
            <Translate value="participantForm.preview" />
          </button>
        </div>
        <button className={btnClasses}>
          <Translate value="participantForm.pay" />
        </button>
      </div>
    </div>
  );
};

export default SubmissionMobileInformation;
