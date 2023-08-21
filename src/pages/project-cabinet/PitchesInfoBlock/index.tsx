import {
  EPitchType,
  PitchArgsOffChain,
  PitchArgsOnChain,
} from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { ProjectPitches } from 'pages/project-page/constants';
import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { EProjectSettingsState } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { isOffChainProjectType } from 'shared/utils/projectUtils';
import {
  addNewPitch,
  updatePitch,
  updatePitchStatus,
} from 'store/thunks/user/project';

import { PitchSettings } from './components/PitchSettings';
import {
  getPitch,
  getPitchType,
  PitchesInfoBlockState,
  getValidationSchema,
  getOnChainPitchForSaving,
  getOffChainPitchForSaving,
} from './helpers';
import { useStyles } from './styles';
import { BlockHeader } from '../components';
import { ProjectCabinetStateRefs } from '../constants';
import { ISubmissionProject, ISubmissionSubProject } from '../interfaces';
import { handleSubInfoModal } from '../utils';

type PitchesInfoBlockProps = {
  project: ISubmissionProject;
  userProject: ISubmissionSubProject;
  cabinetState: ProjectCabinetStateRefs;
};

export const PitchesInfoBlock: React.FC<PitchesInfoBlockProps> = ({
  project,
  userProject,
  cabinetState,
}) => {
  const isOnChainProject = !isOffChainProjectType(project.type);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { showModal } = useModalContext();
  const [currentView, setCurrentView] = useState<EProjectSettingsState>(
    EProjectSettingsState.VIEW
  );
  const { subServiceActions } = usePitchTalkServiceContext();
  const formik = useFormik<PitchesInfoBlockState>({
    initialValues: {
      activePitch: ProjectPitches.INTRO,
      intro_pitch: getPitch(ProjectPitches.INTRO, project),
      update_pitch: getPitch(ProjectPitches.UPDATE, project),
      investors_pitch: getPitch(ProjectPitches.INVEST, project),
    },
    validationSchema: () =>
      getValidationSchema(
        getPitch(ProjectPitches.INTRO, project),
        getPitch(ProjectPitches.UPDATE, project),
        getPitch(ProjectPitches.INVEST, project),
        formik.values
      ),
    onSubmit: async (values) => {
      const projectId = userProject.id.toString();
      const activePitchType = values.activePitch;
      const pitchType = getPitchType(activePitchType);
      const activePitchId = isOnChainProject
        ? EMPTY_STRING
        : userProject[activePitchType]?.id || EMPTY_STRING;
      const pitch = isOnChainProject
        ? getOnChainPitchForSaving(values[activePitchType])
        : getOffChainPitchForSaving(values[activePitchType], pitchType);
      const comment = values[activePitchType].comment;

      if (!project[activePitchType] && !userProject[activePitchType]) {
        if (isOnChainProject) {
          subServiceActions.addNewPitch(pitch as PitchArgsOnChain, comment);
        } else {
          dispatch(
            addNewPitch({
              projectId,
              pitch: pitch as PitchArgsOffChain,
              comment,
            })
          ).then(handleSubInfoModal(showModal));
        }
      } else {
        if (isOnChainProject) {
          subServiceActions.updatePitch(
            pitch as PitchArgsOnChain,
            pitchType,
            comment
          );
        } else {
          dispatch(
            updatePitch({
              pitchId: activePitchId,
              pitch: pitch as PitchArgsOffChain,
              comment,
            })
          ).then(handleSubInfoModal(showModal));
        }
      }
    },
    enableReinitialize: true,
  });

  const handleActivationPitch = (pitchType: EPitchType, isActive: boolean) => {
    if (isOnChainProject) {
      subServiceActions[isActive ? 'activatePitch' : 'deactivatePitch'](
        pitchType
      );
    } else {
      const pitchId =
        userProject.pitches?.find((pitch) => pitch.stage === pitchType)?.id ||
        EMPTY_STRING;
      dispatch(updatePitchStatus({ pitchId, isActive })).then(
        handleSubInfoModal(showModal)
      );
    }
  };

  const isEdit = currentView === EProjectSettingsState.EDIT;
  const isResetting = userProject.status === EActionStatus.Resetting;

  useEffect(() => {
    if (cabinetState) cabinetState.current.pitchesState = setCurrentView;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <BlockHeader
        title="projectCabinetPage.pitches"
        currentView={currentView}
        setCurrentView={setCurrentView}
        showToggleBtn={!isResetting}
      />
      <div>
        <div className={classes.pitchesBlock}>
          <PitchSettings
            isActivationAvailable={
              isEdit && !!project[ProjectPitches.INTRO]?.name && !isResetting
            }
            isEdit={isEdit}
            formik={formik}
            project={project}
            userProject={userProject}
            pitchType={ProjectPitches.INTRO}
            handleActivationPitch={handleActivationPitch}
          />
          <PitchSettings
            isActivationAvailable={
              isEdit && !!project[ProjectPitches.UPDATE]?.name && !isResetting
            }
            isEdit={isEdit && !!project[ProjectPitches.INTRO]?.name}
            formik={formik}
            project={project}
            userProject={userProject}
            pitchType={ProjectPitches.UPDATE}
            handleActivationPitch={handleActivationPitch}
          />
          <PitchSettings
            isActivationAvailable={
              isEdit && !!project[ProjectPitches.INVEST]?.name && !isResetting
            }
            isEdit={isEdit && !!project[ProjectPitches.UPDATE]?.name}
            formik={formik}
            project={project}
            userProject={userProject}
            pitchType={ProjectPitches.INVEST}
            handleActivationPitch={handleActivationPitch}
          />
        </div>
      </div>
    </div>
  );
};
