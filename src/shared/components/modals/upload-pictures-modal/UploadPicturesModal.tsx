import { FormikErrors, FormikTouched, useFormik } from 'formik';
import { t } from 'i18next';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import successImg from 'assets/images/icons/checkmark-icon.png';
import { PreviewImage } from 'pages/participant-form/components/preview-image/PreviewImage';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import {
  IPreviewImageModel,
  SocialPlaceholdersName,
} from 'pages/participant-form/interfaces';
import { ipfsService } from 'services/ipfs';
import { Button } from 'shared/components/button/Button';
import { ErrorHandler } from 'shared/components/ErrorHandler/ErrorHandler';
import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { IUploadPicturesModal } from 'shared/interfaces';
import { classNames } from 'shared/styles/theme';
import YUP from 'shared/utils/yupUtils';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export enum EProjectPictures {
  BANNER_LINK = 'BANNER_LINK',
  LOGO_LINK = 'LOGO_LINK',
}

const isImgUrl = async (url: string): Promise<boolean> => {
  return fetch(url, { method: 'HEAD' }).then((res) => {
    return !!res?.headers?.get('Content-Type')?.startsWith('image');
  });
};

const validationSchema = YUP.object({
  [EProjectPictures.BANNER_LINK]: YUP.string()
    .startWithHTTP()
    .url(t('participantForm.validation.invalidUrl')),
  [EProjectPictures.LOGO_LINK]: YUP.string()
    .startWithHTTP()
    .url(t('participantForm.validation.invalidUrl')),
});

type ProjectPicturesForm = {
  [EProjectPictures.BANNER_LINK]?: string;
  [EProjectPictures.LOGO_LINK]?: string;
};

const initialLinks: IPreviewImageModel = {
  banner: '',
  logo: '',
};

export const UploadPicturesModal: React.FC<IUploadPicturesModal> = ({
  closeModal,
  submitPictures,
  projectPictures = initialLinks,
  projectName,
  modalType,
}) => {
  const correctPictures = getCorrectIPFSLinks({
    banner: projectPictures.banner,
    logo: projectPictures.logo,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exitCheck, setExitCheck] = useState(false);
  const isProjectCabinet = !!modalType;

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
      [EProjectPictures.BANNER_LINK]: correctPictures.banner,
      [EProjectPictures.LOGO_LINK]: correctPictures.logo,
    },
    // validateOnBlur: true,
    validationSchema,
    onSubmit: () => undefined,
  });

  const [projectBanner, setProjectBanner] = useState<File | null>();
  const [projectLogo, setProjectLogo] = useState<File | null>();

  const [bannerLink, setBannerLink] = useState(correctPictures.banner);
  const [logoLink, setLogoLink] = useState(correctPictures.logo);

  const bannerRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const isEditBannerSettings =
    (isProjectCabinet && modalType === EProjectPictures.BANNER_LINK) ||
    !isProjectCabinet;
  const isEditLogoSettings =
    (isProjectCabinet && modalType === EProjectPictures.LOGO_LINK) ||
    !isProjectCabinet;

  const classes = useStyles({
    isLoading: isLoading,
    isFullModal: isEditLogoSettings && isEditBannerSettings,
  });

  useEffect(() => {
    if (!projectBanner) return;
    const bannerUrl = URL.createObjectURL(projectBanner);
    setBannerLink(bannerUrl);
  }, [projectBanner]);

  useEffect(() => {
    if (!projectLogo) return;
    const logoUrl = URL.createObjectURL(projectLogo);
    setLogoLink(logoUrl);
  }, [projectLogo]);

  const handleSubmit = async () => {
    try {
      if (
        (!isProjectCabinet && (!projectBanner || !projectLogo)) ||
        (isEditBannerSettings && !projectBanner) ||
        (isEditLogoSettings && !projectLogo)
      )
        throw new Error('Cannot find files to upload');

      setIsLoading(true);
      const logoName = projectName + ' logo' + projectLogo?.name;
      const bannerName = projectName + ' banner' + projectBanner?.name;
      const projectBannerCid = projectBanner
        ? await ipfsService.uploadFile([projectBanner], {
            name: bannerName,
          })
        : undefined;
      const projectLogoCid = projectLogo
        ? await ipfsService.uploadFile([projectLogo], {
            name: logoName,
          })
        : undefined;

      submitPictures({ projectBannerCid, projectLogoCid });
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async (path: EProjectPictures) => {
    try {
      const url = values[path] || '';
      const isValidImage = await isImgUrl(url);
      if (!isValidImage) throw new Error('Can`t upload data');
      const data = await fetch(url);
      const blob = await data.blob();
      const file = new File([blob], 'uploaded_file');

      if (path === EProjectPictures.BANNER_LINK) {
        setProjectBanner(file);
        setBannerLink(values[path] || '');
      } else if (path === EProjectPictures.LOGO_LINK) {
        setProjectLogo(file);
        setLogoLink(values[path] || '');
      }
    } catch (error) {
      setErrors({
        [path]: t('participantForm.validation.uploadImageError'),
      });
      console.error('error');
    }
  };

  const uploadFile = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (!inputRef?.current) return;
    inputRef.current.click();
  };

  const {
    bannerError,
    logoError,
    disableBannerPreviewButton,
    disableLogoPreviewButton,
  } = getImagesMeta(errors, touched, values, correctPictures);

  const isFilesUploaded = isProjectCabinet
    ? isEditBannerSettings
      ? projectBanner
      : projectLogo
    : projectBanner && projectLogo;

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
          className={classNames(
            classes.pictureInputs,
            isProjectCabinet && classes.pictureCenter
          )}
        >
          {isEditBannerSettings && (
            <div className={classes.uploadImageContainer}>
              <div className={classes.uploadImageTitle}>
                {projectBanner && (
                  <img
                    src={successImg}
                    style={{ marginRight: '8px' }}
                    alt="Image uploaded"
                    height={16}
                    width={16}
                  />
                )}
                <p className={classes.uploadImageTitleInfo}>
                  <span className={classes.uploadImageTitleHead}>
                    <Translate value="uploadPicturesModal.banner" />
                  </span>
                  <span className={classes.uploadImageTitleBody}>
                    <Translate value="tooltips.generalSettings.bannerImgSize" />
                  </span>
                </p>
              </div>
              <input
                className={classes.fileInput}
                type="file"
                name="project-banner"
                accept="image/*"
                ref={bannerRef}
                onChange={() => {
                  setProjectBanner(bannerRef?.current?.files?.[0]);
                }}
              />
              <div className={classes.uploadImageInputContainer}>
                <input
                  className={classes.uploadImageInput}
                  placeholder={t('participantForm.insertLink', {
                    placeholder: SocialPlaceholdersName.BANNER,
                  })}
                  value={values[EProjectPictures.BANNER_LINK]}
                  type="url"
                  name={EProjectPictures.BANNER_LINK}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldTouched(EProjectPictures.BANNER_LINK, true);
                    setFieldValue(
                      EProjectPictures.BANNER_LINK,
                      e.target.value.trim()
                    );
                  }}
                />
                <button
                  disabled={
                    disableBannerPreviewButton ||
                    values[EProjectPictures.BANNER_LINK] === bannerLink
                  }
                  className={classes.formBtn}
                  onClick={() => handlePreview(EProjectPictures.BANNER_LINK)}
                >
                  <Translate value="controls.preview" />
                </button>
                {bannerError && (
                  <ErrorHandler
                    styles={{
                      position: 'absolute',
                      marginTop: 42,
                      top: 0,
                    }}
                    error={errors?.[EProjectPictures.BANNER_LINK] || ''}
                  />
                )}
              </div>
              <p className={classes.uploadImageTitle}>
                <Translate value="uploadPicturesModal.or" />
              </p>
              <Button
                label="uploadPicturesModal.uploadFile"
                extraClass={classes.button}
                handleClick={() => uploadFile(bannerRef)}
              />
            </div>
          )}
          {!isProjectCabinet && <div className={classes.delimiter} />}
          {isEditLogoSettings && (
            <div className={classes.uploadImageContainer}>
              <div className={classes.uploadImageTitle}>
                {projectLogo && (
                  <img
                    src={successImg}
                    style={{ marginRight: '8px' }}
                    alt="Image uploaded"
                    height={16}
                    width={16}
                  />
                )}
                <p className={classes.uploadImageTitleInfo}>
                  <span className={classes.uploadImageTitleHead}>
                    <Translate value="uploadPicturesModal.logo" />
                  </span>
                  <span className={classes.uploadImageTitleBody}>
                    <Translate value="tooltips.generalSettings.logoImgSize" />
                  </span>
                </p>
              </div>
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
                  value={values[EProjectPictures.LOGO_LINK]}
                  type="url"
                  name={EProjectPictures.LOGO_LINK}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldTouched(EProjectPictures.LOGO_LINK, true);
                    setFieldValue(
                      EProjectPictures.LOGO_LINK,
                      e.target.value.trim()
                    );
                  }}
                />
                <button
                  disabled={disableLogoPreviewButton}
                  className={`${classes.formBtn} ${classes.formUploadBtn}`}
                  onClick={() => handlePreview(EProjectPictures.LOGO_LINK)}
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
                    error={errors?.[EProjectPictures.LOGO_LINK] || ''}
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
          )}
        </div>
        <div className={classes.preview}>
          <PreviewImage
            values={{
              project_name: projectName,
              project_banner: bannerLink,
              project_logo: logoLink,
            }}
            previewImage={{
              banner: bannerLink,
              logo: logoLink,
            }}
          />
          <div
            className={classNames(
              classes.buttons,
              exitCheck && 'exitCheck',
              isProjectCabinet && 'projectCabinet'
            )}
          >
            {!exitCheck ? (
              <>
                <Button
                  label="uploadPicturesModal.submitFiles"
                  disabled={!isValid || isLoading || !isFilesUploaded}
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
    </ModalWrapper>
  );
};

function getImagesMeta(
  errors: FormikErrors<ProjectPicturesForm>,
  touched: FormikTouched<ProjectPicturesForm>,
  values: ProjectPicturesForm,
  correctPictures: { banner?: string; logo?: string }
): {
  bannerError: any;
  logoError: any;
  disableBannerPreviewButton: any;
  disableLogoPreviewButton: any;
} {
  const bannerError =
    errors[EProjectPictures.BANNER_LINK] &&
    touched[EProjectPictures.BANNER_LINK];
  const logoError =
    errors[EProjectPictures.LOGO_LINK] && touched[EProjectPictures.LOGO_LINK];

  const disableBannerPreviewButton =
    !!bannerError ||
    !values[EProjectPictures.BANNER_LINK] ||
    !touched[EProjectPictures.BANNER_LINK] ||
    correctPictures.banner === values[EProjectPictures.BANNER_LINK];

  const disableLogoPreviewButton =
    !!logoError ||
    !values[EProjectPictures.LOGO_LINK] ||
    !touched[EProjectPictures.LOGO_LINK] ||
    correctPictures.logo === values[EProjectPictures.LOGO_LINK];

  return {
    bannerError,
    logoError,
    disableBannerPreviewButton,
    disableLogoPreviewButton,
  };
}
