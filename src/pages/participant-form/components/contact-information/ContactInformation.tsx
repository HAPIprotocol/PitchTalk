import { FormikProps } from 'formik';
import { t } from 'i18next';

import { useStyles } from 'pages/participant-form/styles';
import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';
import { Translate } from 'shared/components/translate/Translate';

import {
  InputFieldsName,
  IParticipantFormModel,
  SocialPlaceholdersName
} from '../../interfaces';

interface IContactInformationModel {
  errorClasses: any;
  formik: FormikProps<IParticipantFormModel>;
}
export const ContactInformation: React.FC<IContactInformationModel> = ({
  formik: {
    values,
    errors,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
  },
  errorClasses,
}) => {
  const classes = useStyles();

  const classesScope = {
    telegram: `${classes.formInput} 
        ${classes.inputWidth} 
        ${errorClasses.contact_information.telegram}`,
    email: `${classes.formInput}
        ${classes.inputWidth} 
        ${errorClasses.contact_information.email}`,
  };

  return (
    <>
      <span className={classes.formGroupTitle}>
        <Translate value="participantForm.creatorsContactInformation" />
      </span>
      <div className={classes.formInputWrapper}>
        <div className={classes.errorHeight}>
          <label className={classes.formInputLabel}>
            <Translate value="participantForm.telegram" />
          </label>
          <input
            className={classesScope.telegram}
            placeholder={t('participantForm.insertLink', {
              placeholder: SocialPlaceholdersName.TELEGRAM,
            })}
            value={values.contact_information.telegram}
            name={InputFieldsName.TELEGRAM}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldTouched(InputFieldsName.TELEGRAM, true);
              setFieldValue(InputFieldsName.TELEGRAM, e.target.value.trim());
            }}
            type="url"
            autoComplete='off'
          />
          {errors?.contact_information?.telegram &&
             (isSubmitting || touched?.contact_information?.telegram) && (
              <ErrorHandler error={errors?.contact_information?.telegram} />
            )}
        </div>
        <div className={classes.errorHeight}>
          <label className={classes.formInputLabel}>
            <Translate value="participantForm.email" />
          </label>
          <input
            className={classesScope.email}
            placeholder={t('participantForm.insertLink', {
              placeholder: SocialPlaceholdersName.EMAIL,
            })}
            value={values.contact_information.email}
            name={InputFieldsName.EMAIL}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldTouched(InputFieldsName.EMAIL, true);
              setFieldValue(InputFieldsName.EMAIL, e.target.value.trim());
            }}
            type="email"
            autoComplete='off'
          />
          {errors?.contact_information?.email &&
            (isSubmitting || touched?.contact_information?.email) && (
              <ErrorHandler error={errors?.contact_information?.email} />
            )}
        </div>
      </div>
    </>
  );
};
