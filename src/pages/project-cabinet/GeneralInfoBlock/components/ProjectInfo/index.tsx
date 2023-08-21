import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import projectFrame from 'assets/images/project-frame.png';
import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { IPreviewImageModel } from 'pages/participant-form/interfaces';
import { ImagesPreviewMeta } from 'pages/project-cabinet/components/ImagesPreviewMeta/ImagesPreviewMeta';
import { EGeneralSettingsTooltips } from 'pages/project-cabinet/constants';
import {
  GeneralInfoBlockState,
  getProjectForUpdating,
} from 'pages/project-cabinet/GeneralInfoBlock/helpers';
import {
  ISubmissionProject,
  ISubmissionSubProject,
} from 'pages/project-cabinet/interfaces';
import {
  handleSubInfoModal,
  inputLabelUtils,
} from 'pages/project-cabinet/utils';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { ITranslationKeys } from 'services/translation';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Logo } from 'shared/components/Logo';
import { EProjectPictures } from 'shared/components/modals/upload-pictures-modal/UploadPicturesModal';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { classNames } from 'shared/styles/theme';
import { selectProjectVesting } from 'store/slices/vesting';
import { updateProjectSubmission } from 'store/thunks/user/project';

import { useStyles } from './styles';

type ProjectInfoProps = {
  isEdit: boolean;
  formik: FormikProps<GeneralInfoBlockState>;
  project: ISubmissionProject | undefined;
  userProject: ISubmissionSubProject;
};

enum EImgTypes {
  logo = 'logo',
  banner = 'banner',
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  formik: { values, setFieldValue, errors },
  project,
  userProject,
  isEdit,
}) => {
  const isOnChainProject = userProject.type === EProjectType.OnChain;
  const isUpdated =
    userProject.status === EActionStatus.Updated ||
    userProject.status === EActionStatus.New;
  const isFailed = userProject.status === EActionStatus.Failed;
  const isBannerUpdated = project?.banner !== userProject.banner;
  const isLogoUpdated = project?.logo !== userProject.logo;

  const dispatch = useAppDispatch();

  const classes = useStyles({ isUpdated, isFailed });
  const { subServiceActions } = usePitchTalkServiceContext();
  const { showModal } = useModalContext();
  const correctImages: IPreviewImageModel =
    getCorrectIPFSLinks<IPreviewImageModel>({
      banner: values.banner,
      logo: values.logo,
    });
  const [previewImage, setPreviewImage] =
    useState<IPreviewImageModel>(correctImages);
  const isVesting = !!useAppSelector((state) =>
    (project as Project)?.project_id
      ? selectProjectVesting(state, (project as Project)?.project_id)
      : false
  );

  const inputWrapperClasses = (error: string | null, ...others: string[]) =>
    classNames(
      classes.controlInput,
      ...others,
      error && classes.errorContainer
    );

  const inputClasses = (error: string | null, isDiff: boolean) => ({
    inputExtraClass: classes.input,
    containerExtraClass: classNames(
      classes.inputContainer,
      error && classes.errorBorder,
      isDiff && getInputLabelStyles('border')
    ),
    errorExtraClass: classes.error,
    infoLabelExtraClass: classNames(isDiff && getInputLabelStyles('color')),
  });

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  const saveImage = async ({
    banner,
    logo,
  }: {
    banner?: string;
    logo?: string;
  }) => {
    const projectId = userProject.id.toString();
    const project = getProjectForUpdating({
      ...userProject,
      [EImgTypes.logo]: logo || values.logo,
      [EImgTypes.banner]: banner || values.banner,
    } as GeneralInfoBlockState);

    if (isOnChainProject) {
      await subServiceActions.updateProject(project);
    } else {
      dispatch(updateProjectSubmission({ projectId, project })).then(
        handleSubInfoModal(showModal)
      );
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.controlsWrapper}>
        <div className={classes.controlsWrapperContainer}>
          <div
            className={inputWrapperClasses(
              errors.name ?? null,
              classes.inputName
            )}
          >
            <label>
              <Translate value="projectCabinetPage.projectName" />
            </label>
            <TextInput
              {...inputClasses(
                errors.name ?? null,
                project?.name !== userProject.name
              )}
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
              error={errors.name ?? null}
              readOnly={!isEdit || isVesting}
              placeHolder={t('placeHolders.typeProjectName')}
              infoLabel={
                project?.name !== userProject.name
                  ? getInputInfoLabel()
                  : EMPTY_STRING
              }
            />
          </div>
          <div
            className={inputWrapperClasses(
              errors.description ?? null,
              classes.inputDesc
            )}
          >
            <label>
              <Translate value="projectCabinetPage.projectDesc" />
            </label>
            <div className={classes.textAreaWrapper}>
              <textarea
                className={classNames(
                  classes.input,
                  classes.textArea,
                  project?.description !== userProject.description &&
                    getInputLabelStyles('border')
                )}
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
                readOnly={!isEdit}
                placeholder={t('placeHolders.typeUpTo1000Symbols')}
              />
              {errors?.description && (
                <p className={classes.error}>{errors.description}</p>
              )}
              {project?.description !== userProject.description &&
                (isUpdated || isFailed) && (
                  <label
                    className={classNames(
                      classes.infoLabel,
                      getInputLabelStyles('color')
                    )}
                  >
                    <Translate
                      value={getInputInfoLabel() as ITranslationKeys}
                    />
                  </label>
                )}
            </div>
          </div>
        </div>
        <div className={classes.controlsWrapperContainer}>
          <div
            className={inputWrapperClasses(
              errors.project_url ?? null,
              classes.inputUrl
            )}
          >
            <label className={classes.formInputLabel}>
              <Translate value="projectCabinetPage.projectURL" />
              <QuestionIcon
                data-tooltip-id={EGeneralSettingsTooltips.PROJECT_URL_EXAMPLE}
              />
            </label>
            <TextInput
              {...inputClasses(
                errors.project_url ?? null,
                project?.project_url !== userProject.project_url
              )}
              value={values.project_url}
              onChange={(e) =>
                setFieldValue('project_url', e.target.value.trim())
              }
              error={errors.project_url ?? null}
              readOnly={!isEdit}
              placeHolder={t('placeHolders.insertProjectLink')}
              infoLabel={
                project?.project_url !== userProject.project_url
                  ? getInputInfoLabel()
                  : EMPTY_STRING
              }
            />
          </div>
          <div
            className={inputWrapperClasses(
              errors.banner ?? null,
              classes.inputUrl,
              classes.imagesWrapper
            )}
          >
            <div className={classes.inputAndButtonWrapper}>
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.uploadImagesTitleBanner" />
              </label>
              <button
                className={classNames(
                  classes.formUploadBtn,
                  !isBannerUpdated && 'default'
                )}
                disabled={!isEdit}
                onClick={() =>
                  showModal(EModals.UPLOAD_PICTURES_MODAL, {
                    projectName: values.name,
                    projectPictures: {
                      banner: values.banner,
                      logo: values.logo,
                    },
                    modalType: EProjectPictures.BANNER_LINK,
                    submitPictures: async ({ projectBannerCid }) => {
                      const { banner } = getCorrectIPFSLinks({
                        banner: projectBannerCid!,
                      });
                      setPreviewImage((prev) => ({ ...prev, banner }));
                      setFieldValue(EImgTypes.banner, projectBannerCid);
                      await saveImage({ banner: projectBannerCid });
                    },
                  })
                }
              >
                <Translate value="participantForm.uploadBanner" />
              </button>
              <ImagesPreviewMeta
                imageName="banner"
                isImageUpdated={project?.banner !== userProject.banner}
                error={errors.banner}
                isUpdated={isUpdated}
                isFailed={isFailed}
              />
            </div>
            <div className={classes.inputAndButtonWrapper}>
              <label className={classes.formInputLabel}>
                <Translate value="participantForm.uploadImagesTitleLogo" />
              </label>
              <button
                className={classNames(
                  classes.formUploadBtn,
                  !isLogoUpdated && 'default'
                )}
                disabled={!isEdit}
                onClick={() =>
                  showModal(EModals.UPLOAD_PICTURES_MODAL, {
                    projectName: values.name,
                    projectPictures: {
                      banner: values.banner,
                      logo: values.logo,
                    },
                    modalType: EProjectPictures.LOGO_LINK,
                    submitPictures: async ({ projectLogoCid }) => {
                      const { logo } = getCorrectIPFSLinks({
                        logo: projectLogoCid!,
                      });
                      setPreviewImage((prev) => ({ ...prev, logo }));
                      setFieldValue(EImgTypes.logo, projectLogoCid);
                      await saveImage({ logo: projectLogoCid });
                    },
                  })
                }
              >
                <Translate value="participantForm.uploadLogo" />
              </button>
              <ImagesPreviewMeta
                imageName="logo"
                isImageUpdated={project?.logo !== userProject.logo}
                error={errors.logo}
                isUpdated={isUpdated}
                isFailed={isFailed}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.result}>
        <img
          className={classes.bannerWrapper}
          src={previewImage.banner || projectFrame}
        />
        <div className={classes.resultContent}>
          <Logo
            logo={previewImage.logo || projectFrame}
            logoContainerStyle={classes.projectLogo}
          />
          <span>{values.name}</span>
        </div>
      </div>
    </div>
  );
};
