import { FormikErrors, FormikTouched, useFormik } from 'formik';
import { t } from 'i18next';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import {
  IPreviewLogoModel,
  SocialPlaceholdersName,
} from 'pages/participant-form/interfaces';
import { TooltipWrapper } from 'pages/project-cabinet/components/Tooltips';
import { EGeneralSettingsTooltips } from 'pages/project-cabinet/constants';
import { ipfsService } from 'services/ipfs';
import { Button } from 'shared/components/button/Button';
import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';
import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { IUploadLogoModal } from 'shared/interfaces';
import { classNames } from 'shared/styles/theme';
import YUP from 'shared/utils/yupUtils';

import { useStyles } from './styles';
import PreviewLogo from '../../../../pages/institutional-submission/components/preview-logo/Previewlogo';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export enum ESubPictures {
  LOGO_LINK = 'LOGO_LINK',
}

const isImgUrl = async (url: string): Promise<boolean> => {
  return fetch(url, { method: 'HEAD' }).then((res) => {
    return !!res?.headers?.get('Content-Type')?.startsWith('image');
  });
};

const validationSchema = YUP.object({
  [ESubPictures.LOGO_LINK]: YUP.string()
    .startWithHTTP()
    .url(t('participantForm.validation.invalidUrl')),
});

type ProjectPicturesForm = {
  [ESubPictures.LOGO_LINK]?: string;
};

const initialLinks: IPreviewLogoModel = {
  logo: '',
};

export const UploadLogoModal: React.FC<IUploadLogoModal> = ({
  closeModal,
  submitPicture,
  projectPicture = initialLinks,
  submissionName,
}) => {
  const correctPictures = getCorrectIPFSLinks({
    logo: projectPicture.logo,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exitCheck, setExitCheck] = useState(false);

  const classes = useStyles({ isLoading: isLoading });
  const {
    errors,
    touched,
    setFieldValue,
    handleBlur,
    setFieldTouched,
    values,
    isValid,
    setErrors,
  } = useFormik<ProjectPicturesForm>({
    initialValues: {
      [ESubPictures.LOGO_LINK]: correctPictures.logo,
    },
    validationSchema,
    onSubmit: () => undefined,
  });

  const [projectLogo, setProjectLogo] = useState<File | null>();

  const [logoLink, setLogoLink] = useState(correctPictures.logo);

  const logoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!projectLogo) return;
    const logoUrl = URL.createObjectURL(projectLogo);
    setLogoLink(logoUrl);
  }, [projectLogo]);

  const handleSubmit = async () => {
    try {
      if (!projectLogo) throw new Error('Cannot find files to upload');

      setIsLoading(true);
      const logoName = submissionName + ' logo' + projectLogo?.name;
      const projectLogoCid = projectLogo
        ? await ipfsService.uploadFile([projectLogo], {
            name: logoName,
          })
        : undefined;

      submitPicture({ projectLogoCid });
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    try {
      const url = values[ESubPictures.LOGO_LINK] || '';
      const isValidImage = await isImgUrl(url);
      if (!isValidImage) throw new Error('Can`t upload data');
      const data = await fetch(url);
      const blob = await data.blob();
      const file = new File([blob], 'uploaded_file');

      setProjectLogo(file);
      setLogoLink(values[ESubPictures.LOGO_LINK] || '');
    } catch (error) {
      setErrors({
        [ESubPictures.LOGO_LINK]: t(
          'participantForm.validation.uploadImageError'
        ),
      });
      console.error('error');
    }
  };

  const uploadFile = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const { logoError, disableLogoPreviewButton } = getImagesMeta(
    errors,
    touched,
    values,
    correctPictures
  );

  const preventCloseModal = () => {
    if (exitCheck) closeModal();
    else setExitCheck(true);
  };

  return (
    <ModalWrapper
      closeModal={preventCloseModal}
      modalStyles={classes.modalWrapper}
      wrapperStyles={classes.wrapperStyles}
    >
      <div className={classes.container}>
        {isLoading && (
          <Loader
            styles={{
              zIndex: 2,
              position: 'absolute',
              top: '30%',
            }}
            backgroundColor={'darkGrey'}
          />
        )}
        <div className={classes.title}>
          <Translate value="uploadPicturesModal.title" />
        </div>
        <div
          className={classNames(classes.pictureInputs, classes.pictureCenter)}
        >
          <div className={classes.uploadImageContainer}>
            <p className={classes.uploadImageTitle}>
              <Translate value="uploadPicturesModal.logo" />
              <QuestionIcon
                data-tooltip-id={EGeneralSettingsTooltips.LOGO_IMG_SIZE}
              />
            </p>
            <input
              className={classes.fileInput}
              type="file"
              name="project-logo"
              accept="image/*"
              ref={logoRef}
              onChange={() => {
                setProjectLogo(logoRef?.current?.files?.[0]);
              }}
            />
            <div className={classes.uploadImageInputContainer}>
              <input
                className={classes.uploadImageInput}
                placeholder={t('participantForm.insertLink', {
                  placeholder: SocialPlaceholdersName.LOGO,
                })}
                value={values[ESubPictures.LOGO_LINK]}
                type="url"
                name={ESubPictures.LOGO_LINK}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldTouched(ESubPictures.LOGO_LINK, true);
                  setFieldValue(ESubPictures.LOGO_LINK, e.target.value.trim());
                }}
              />
              <button
                disabled={disableLogoPreviewButton}
                className={`${classes.formBtn} ${classes.formUploadBtn}`}
                onClick={() => handlePreview()}
              >
                <Translate value="controls.preview" />
              </button>
              {logoError && (
                <ErrorHandler
                  styles={{
                    position: 'absolute',
                    marginTop: 42,
                    top: 0,
                  }}
                  error={errors?.[ESubPictures.LOGO_LINK] || ''}
                />
              )}
            </div>
            <p className={classes.uploadImageTitle}>
              <Translate value="uploadPicturesModal.or" />
            </p>
            <Button
              label="uploadPicturesModal.uploadFile"
              extraClass={classes.button}
              handleClick={() => uploadFile(logoRef)}
            />
          </div>
        </div>
        <div className={classes.preview}>
          <PreviewLogo image={logoLink} />
          <div
            className={classNames(classes.buttons, exitCheck && 'exitCheck')}
          >
            {!exitCheck ? (
              <>
                <Button
                  label="uploadPicturesModal.submitFiles"
                  disabled={!isValid || isLoading || !projectLogo}
                  extraClass={classes.buttonSubmit}
                  handleClick={handleSubmit}
                />
                <Button
                  label="uploadPicturesModal.cancel"
                  extraClass={classes.buttonClose}
                  handleClick={() => setExitCheck(true)}
                />
              </>
            ) : (
              <>
                <p className={classes.awareTitle}>
                  <Translate value={'uploadPicturesModal.areYouSure'} />
                </p>
                <div className={classes.smallButtons}>
                  <button
                    className={classes.formBtn}
                    onClick={() => setExitCheck(false)}
                  >
                    <Translate value="uploadPicturesModal.continue" />
                  </button>
                  <button className={classes.formBtnRed} onClick={closeModal}>
                    <Translate value="uploadPicturesModal.close" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Tooltip id={EGeneralSettingsTooltips.BANNER_IMG_SIZE}>
        <TooltipWrapper
          value="tooltips.generalSettings.bannerImgSize"
          styles={{ maxWidth: 270 }}
        />
      </Tooltip>
      <Tooltip id={EGeneralSettingsTooltips.LOGO_IMG_SIZE}>
        <TooltipWrapper
          value="tooltips.generalSettings.logoImgSize"
          styles={{ maxWidth: 270 }}
        />
      </Tooltip>
    </ModalWrapper>
  );
};

function getImagesMeta(
  errors: FormikErrors<ProjectPicturesForm>,
  touched: FormikTouched<ProjectPicturesForm>,
  values: ProjectPicturesForm,
  correctPictures: { banner?: string; logo?: string }
): {
  logoError: any;
  disableLogoPreviewButton: any;
} {
  const logoError =
    errors[ESubPictures.LOGO_LINK] && touched[ESubPictures.LOGO_LINK];

  const disableLogoPreviewButton =
    !!logoError ||
    !values[ESubPictures.LOGO_LINK] ||
    !touched[ESubPictures.LOGO_LINK] ||
    correctPictures.logo === values[ESubPictures.LOGO_LINK];

  return {
    logoError,
    disableLogoPreviewButton,
  };
}
