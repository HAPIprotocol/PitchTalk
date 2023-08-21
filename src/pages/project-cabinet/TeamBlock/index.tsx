import {
  ITeam,
  ITeamMemberOffChain,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { useFormik } from 'formik';
import { t } from 'i18next';
import omit from 'lodash/omit';
import { useEffect, useState } from 'react';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { EProjectSettingsState } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { isOffChainProjectType } from 'shared/utils/projectUtils';
import { updateTeam } from 'store/thunks/user/project';

import { AddNewMember } from './components/AddNewMember/AddNewMember';
import { TeamMemberSettings } from './components/Settings/TeamMemberSettings';
import { SocialLinks } from './components/SocialLinksSettings/SocialLinks';
import { TeamMemberPreview } from './components/TeamMemberPreview/TeamMemberPreview';
import { saveImgToIPFS, validateSchema } from './helpers';
import { useStyles } from './styles';
import { BlockHeader } from '../components';
import { Loader } from '../components/Loader';
import { ProjectCabinetStateRefs } from '../constants';
import { ISubmissionProject, ISubmissionSubProject } from '../interfaces';
import { handleSubInfoModal } from '../utils';

const TEAM_MEMBER_LIMIT = 10;

interface ITeamBlockProps {
  project: ISubmissionProject;
  userProject: ISubmissionSubProject;
  cabinetState: ProjectCabinetStateRefs;
}

export const TeamBlock: React.FC<ITeamBlockProps> = ({
  project,
  userProject,
  cabinetState,
}) => {
  const isOnChainProject = !isOffChainProjectType(project.type);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { showModal } = useModalContext();
  const { subServiceActions } = usePitchTalkServiceContext();
  const [comment, setComment] = useState<string>('');
  const [previewImages, setPreviewImages] = useState<Record<string, string>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ipfsImages, setIPFSImages] = useState<Record<string, File | null>>({});
  const initialTeam = userProject?.team || {};
  const projectTeam = project?.team || {};

  const [currentView, setCurrentView] = useState<EProjectSettingsState>(
    EProjectSettingsState.VIEW
  );

  const formik = useFormik<ITeam>({
    initialValues: initialTeam,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const team: ITeam = {};

      setIsLoading(true);
      // Saving Images to ipfs, if it is necessary
      for (const [id, member] of Object.entries(values)) {
        const memberImg = ipfsImages[id];
        const imgCID = await saveImgToIPFS(
          memberImg,
          id,
          member.first_name,
          userProject.name
        );
        team[id] = { ...member, logo: imgCID || member.logo };
      }
      setIsLoading(false);

      if (isOnChainProject) {
        await subServiceActions.updateTeam(team, comment);
      } else {
        const teamForSaving = Object.entries(team).map(
          ([email, member]) => ({ email, ...member } as ITeamMemberOffChain)
        );
        dispatch(
          updateTeam({
            projectId: userProject.id.toString(),
            team: teamForSaving,
            comment,
          })
        ).then(handleSubInfoModal(showModal));
      }
    },
    validate: validateSchema,
  });

  const isEdit = currentView === EProjectSettingsState.EDIT;
  const isResetting = userProject.status === EActionStatus.Resetting;

  const isUpdated =
    userProject.status === EActionStatus.New ||
    userProject.status === EActionStatus.Updated;
  const isFailed = userProject.status === EActionStatus.Failed;

  useEffect(() => {
    if (cabinetState) cabinetState.current.teamState = setCurrentView;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const withEditClass = (styleClass: string) =>
    styleClass + (isEdit ? ' isEdit' : '');

  return (
    <>
      <div className={classes.container}>
        {isLoading && <Loader />}
        <BlockHeader
          title="projectCabinetPage.projectTeam"
          currentView={currentView}
          setCurrentView={setCurrentView}
          showToggleBtn={!isResetting}
        />
        {!Object.keys(formik.values).length && !isEdit && (
          <p className={classes.noTeam}>
            <Translate value="projectCabinetPage.noTeam" />
          </p>
        )}
        <div className={withEditClass(classes.teamBlockContentWrapper)}>
          {Object.entries(formik.values).map(([id, teamMember]) => {
            return (
              <div className={withEditClass(classes.teamMember)} key={id}>
                <div className={withEditClass(classes.teamBlockContent)}>
                  {isEdit && (
                    <TeamMemberSettings
                      formik={formik}
                      teamMember={teamMember}
                      id={id}
                      isEdit={isEdit}
                      isUpdated={isUpdated}
                      isFailed={isFailed}
                      projectTeam={project?.team || {}}
                      userProjectTeam={userProject?.team || {}}
                      setPreviewImages={setPreviewImages}
                      setIPFSImages={setIPFSImages}
                    />
                  )}
                  <TeamMemberPreview
                    formik={formik}
                    id={id}
                    teamMember={{
                      ...teamMember,
                      logo: previewImages[id] || teamMember.logo,
                    }}
                    onDelete={
                      isEdit
                        ? () => formik.setValues(omit(formik.values, id))
                        : undefined
                    }
                    isProcessing={
                      isUpdated &&
                      project?.team?.[id] !== userProject?.team?.[id]
                    }
                    isDeclined={
                      isFailed &&
                      project?.team?.[id] !== userProject?.team?.[id]
                    }
                  />
                </div>
                {isEdit && (
                  <SocialLinks
                    formik={formik}
                    id={id}
                    isEdit={isEdit}
                    isUpdated={isUpdated}
                    isFailed={isFailed}
                    project={project}
                    userProject={userProject}
                  />
                )}
              </div>
            );
          })}
          {Object.keys(formik.values).length < TEAM_MEMBER_LIMIT && isEdit && (
            <AddNewMember
              formik={formik}
              projectTeam={projectTeam}
              isOnChain={isOnChainProject}
            />
          )}
        </div>
        {isEdit && (
          <div className={classes.controlsWrapper}>
            <div className={classes.controls}>
              <Button
                disabled={
                  !userProject.is_active || !!Object.keys(formik.errors).length
                }
                extraClass={classes.saveBtn}
                label="controls.saveChanges"
                handleClick={() => formik.handleSubmit()}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.comment}
                placeholder={t('placeHolders.comment')}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
