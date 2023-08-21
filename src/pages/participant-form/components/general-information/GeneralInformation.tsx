import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import { useStyles } from 'pages/participant-form/styles';
import { EGeneralSettingsTooltips } from 'pages/project-cabinet/constants';
import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';
import { EProjectPictures } from 'shared/components/modals/upload-pictures-modal/UploadPicturesModal';
import { Translate } from 'shared/components/translate/Translate';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';

import {
  InputFieldsName,
  IParticipantFormModel,
  IPreviewImageModel,
} from '../../interfaces';
import { PreviewImage } from '../preview-image/PreviewImage';

interface IGeneralInformationModel {
  errorClasses: any;
  formik: FormikProps<IParticipantFormModel>;
}

export const GeneralInformation: React.FC<IGeneralInformationModel> = ({
  formik: {
    setFieldTouched,
    values,
    errors,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
  },
  errorClasses,
}) => {
  const [previewImage, setPreviewImage] = useState<IPreviewImageModel>({
    banner: '',
    logo: '',
  });
  const classes = useStyles();

  const { showModal } = useModalContext();

  const classesScope = {
    project_name: `${classes.formInput} 
        ${errorClasses.general_information.project_name}`,
    project_description: `${classes.formInput} ${classes.formTextarea}
        ${errorClasses.general_information.project_description}`,
    project_url: `${classes.formInput} 
        ${errorClasses.general_information.project_url}`,
    project_banner: `${classes.formInput} 
        ${errorClasses.general_information.project_banner}`,
    project_logo: `${classes.formInput} 
        ${errorClasses.general_information.project_logo}`,
  };

  const openUploadModal = (modalType?: EProjectPictures) =>
    showModal(EModals.UPLOAD_PICTURES_MODAL, {
      projectName: values.general_information.project_name,
      projectPictures: {
        banner: values.general_information.project_banner,
        logo: values.general_information.project_logo,
      },
      modalType,
      submitPictures: ({ projectBannerCid, projectLogoCid }) => {
        if (
          (modalType && modalType === EProjectPictures.BANNER_LINK) ||
          !modalType
        ) {
          setPreviewImage((prev) => ({ ...prev, banner: projectBannerCid! }));
          setFieldValue(InputFieldsName.PROJECT_BANNER, projectBannerCid);
        }
        if (
          (modalType && modalType === EProjectPictures.LOGO_LINK) ||
          !modalType
        ) {
          setPreviewImage((prev) => ({ ...prev, logo: projectLogoCid! }));
          setFieldValue(InputFieldsName.PROJECT_LOGO, projectLogoCid);
        }
      },
    });

  return (
    <>
      <span className={classes.formGroupTitle}>
        <Translate value="participantForm.generalInformation" />
      </span>
      <div className={classes.inputInformationBox}>
        <div className={classes.generalInputs}>
          <div className={classes.generalColumn}>
            <div className={`${classes.formInputBox}`}>
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.projectName" />
              </label>
              <input
                className={classesScope.project_name}
                placeholder={t('participantForm.typeProjectName')}
                value={values.general_information.project_name}
                name={InputFieldsName.PROJECT_NAME}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldTouched(InputFieldsName.PROJECT_NAME, true);
                  setFieldValue(InputFieldsName.PROJECT_NAME, e.target.value);
                }}
                type="text"
              />
              {!!errors?.general_information?.project_name &&
                (isSubmitting ||
                  !!touched.general_information?.project_name) && (
                  <ErrorHandler
                    error={errors?.general_information?.project_name}
                  />
                )}
            </div>
            <div className={`${classes.formTextareaBox}`}>
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.projectDescription" />
              </label>
              <textarea
                name={InputFieldsName.PROJECT_DESCRIPTION}
                className={classesScope.project_description}
                placeholder={t('participantForm.typeUpToSymbols')}
                value={values.general_information.project_description}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldTouched(InputFieldsName.PROJECT_DESCRIPTION, true);
                  setFieldValue(
                    InputFieldsName.PROJECT_DESCRIPTION,
                    e.target.value
                  );
                }}
              />
              {errors?.general_information?.project_description &&
                (isSubmitting ||
                  touched?.general_information?.project_description) && (
                  <ErrorHandler
                    error={errors?.general_information?.project_description}
                  />
                )}
            </div>
          </div>

          <div className={classes.generalColumn}>
            <div className={classes.projectUrlBox}>
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.projectUrl" />
                <QuestionIcon
                  data-tooltip-id={EGeneralSettingsTooltips.PROJECT_URL_EXAMPLE}
                />
              </label>
              <input
                className={classesScope.project_url}
                placeholder={t('participantForm.typeUpToUrl')}
                value={values.general_information.project_url}
                name={InputFieldsName.PROJECT_URL}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldTouched(InputFieldsName.PROJECT_URL, true);
                  setFieldValue(
                    InputFieldsName.PROJECT_URL,
                    e.target.value.trim()
                  );
                }}
                type="text"
              />
              {errors?.general_information?.project_url &&
                (isSubmitting || touched?.general_information?.project_url) && (
                  <ErrorHandler
                    error={errors?.general_information?.project_url}
                  />
                )}
            </div>
            <div
              className={`${classes.formInputBox}`}
              style={{ marginTop: '15px' }}
            >
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.uploadImagesTitle" />
              </label>
              <div className={classes.formInputFlex}>
                {!previewImage.banner && !previewImage.logo ? (
                  <button
                    className={classes.formUploadBtn}
                    onClick={() => openUploadModal()}
                  >
                    <Translate value="participantForm.uploadImages" />
                  </button>
                ) : (
                  <>
                    <button
                      className={classes.formUploadBtn}
                      onClick={() =>
                        openUploadModal(EProjectPictures.BANNER_LINK)
                      }
                    >
                      <Translate value="participantForm.uploadBanner" />
                    </button>
                    <button
                      className={classes.formUploadBtn}
                      onClick={() =>
                        openUploadModal(EProjectPictures.LOGO_LINK)
                      }
                    >
                      <Translate value="participantForm.uploadLogo" />
                    </button>
                  </>
                )}
              </div>
              {errors?.general_information?.project_banner && isSubmitting && (
                <ErrorHandler
                  error={errors?.general_information?.project_banner}
                />
              )}
              {errors?.general_information?.project_logo && isSubmitting && (
                <ErrorHandler
                  error={errors?.general_information?.project_logo}
                />
              )}
              {!(
                errors?.general_information?.project_logo ||
                errors?.general_information?.project_banner
              ) &&
                !values.general_information.project_name && (
                  <ErrorHandler
                    error={t('participantForm.validation.nameRecommendation')}
                  />
                )}
            </div>
          </div>
        </div>
        <PreviewImage
          values={{
            project_name: values?.general_information?.project_name || '',
            project_banner: values?.general_information?.project_banner || '',
            project_logo: values?.general_information?.project_logo || '',
          }}
          previewImage={previewImage}
        />
      </div>
    </>
  );
};
