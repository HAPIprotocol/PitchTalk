import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { BlockHeader, Title } from 'pages/project-cabinet/components';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Button } from 'shared/components/button/Button';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { EProjectSettingsState } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { updateProjectSubmission } from 'store/thunks/user/project';

import {
  SocialInfo,
  ProjectInfo,
  DocumentationInfo,
  TagsInfo,
} from './components';
import {
  GeneralInfoBlockState,
  getGeneralInfoBlockState,
  getProjectForUpdating,
  validationSchema,
} from './helpers';
import { useStyles } from './styles';
import { ProjectCabinetStateRefs } from '../constants';
import { ISubmissionProject, ISubmissionSubProject } from '../interfaces';
import { handleSubInfoModal } from '../utils';

type GeneralInfoBlockProps = {
  project: ISubmissionProject | undefined;
  userProject: ISubmissionSubProject;
  cabinetState: ProjectCabinetStateRefs;
};

export const GeneralInfoBlock: React.FC<GeneralInfoBlockProps> = ({
  project,
  userProject,
  cabinetState,
}) => {
  const isOnChainProject = userProject.type === EProjectType.OnChain;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { showModal } = useModalContext();
  const { subServiceActions } = usePitchTalkServiceContext();
  const [currentView, setCurrentView] = useState<EProjectSettingsState>(
    EProjectSettingsState.VIEW
  );
  const [comment, setComment] = useState('');
  const formik = useFormik<GeneralInfoBlockState>({
    initialValues: getGeneralInfoBlockState(project || userProject),
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { validateForm }) => {
      const isValid = validateForm();
      if (!isValid) return;
      if (isOnChainProject) {
        await subServiceActions.updateProject(
          getProjectForUpdating(values),
          comment
        );
      } else {
        dispatch(
          updateProjectSubmission({
            projectId: userProject.id.toString(),
            project: getProjectForUpdating(values),
          })
        ).then((data) => {
          handleSubInfoModal(showModal)(data);
          setCurrentView(EProjectSettingsState.VIEW);
        });
      }
    },
    enableReinitialize: true,
  });
  const isEdit = currentView === EProjectSettingsState.EDIT;
  const isResetting = userProject.status === EActionStatus.Resetting;

  useEffect(() => {
    if (cabinetState) cabinetState.current.generalState = setCurrentView;
  }, []);

  return (
    <div className={classes.container}>
      <BlockHeader
        title="projectCabinetPage.generalInformation"
        currentView={currentView}
        setCurrentView={setCurrentView}
        showToggleBtn={userProject.status !== EActionStatus.New && !isResetting}
      />
      <div>
        <div className={classes.projectInfoWrapper}>
          <Title
            label="projectCabinetPage.projectInfo"
            tooltipId="projectInfo"
          />
          <ProjectInfo
            formik={formik}
            project={project}
            userProject={userProject}
            isEdit={isEdit}
          />
        </div>
        <div className={classes.socialInfoWrapper}>
          <Title label="projectCabinetPage.social" tooltipId="social" />
          <SocialInfo
            formik={formik}
            project={project}
            userProject={userProject}
            isEdit={isEdit}
          />
        </div>
      </div>
      <div className={classes.tagsWrapper}>
        <Title label="projectCabinetPage.tags" tooltipId="tags" />
        <TagsInfo
          isEdit={isEdit}
          formik={formik}
          project={project}
          userProject={userProject}
        />
      </div>
      {isEdit && (
        <div className={classes.controlsWrapper}>
          <div className={classes.controls}>
            <Button
              disabled={
                !(formik.isValid && formik.dirty) || !userProject.is_active
              }
              extraClass={classes.saveBtn}
              label="controls.saveChanges"
              handleClick={() => formik.handleSubmit()}
            />
            <textarea
              className={classes.comment}
              placeholder={t('placeHolders.comment')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      )}
      {userProject.id && (
        <div className={classes.documentationWrapper}>
          <Title
            label="projectCabinetPage.documentation"
            tooltipId="documentation"
          />
          <DocumentationInfo
            formik={formik}
            project={project}
            userProject={userProject}
            isEdit={isEdit}
          />
        </div>
      )}
    </div>
  );
};
