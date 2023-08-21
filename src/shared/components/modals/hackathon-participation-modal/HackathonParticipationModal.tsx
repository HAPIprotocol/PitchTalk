import { useFormik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';

import { Button } from 'shared/components/button/Button';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Loader } from 'shared/components/loader/Loader';
import { Translate } from 'shared/components/translate/Translate';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { IHackathonParticipation } from 'shared/interfaces/modals';
import YUP from 'shared/utils/yupUtils';
import { updateEventProjectSubmission } from 'store/thunks/events';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const HackathonParticipationModal: React.FC<IHackathonParticipation> = ({
  closeModal,
  eventId,
  submissionId,
  projectType,
  videoUrl,
  repoUrl,
  projectId,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<{ video_url: string; repo_url: string }>({
    initialValues: { video_url: videoUrl || '', repo_url: repoUrl || '' },
    onSubmit: ({ video_url, repo_url }) => {
      setIsLoading(true);
      dispatch(
        updateEventProjectSubmission({
          eventId,
          submissionId,
          projectType,
          video_url,
          repo_url,
          projectId,
        })
      ).finally(() => {
        setIsLoading(false);
        closeModal();
      });
    },
    validationSchema: YUP.object({
      video_url: YUP.string()
        .url(t('institutionalSubmission.validation.invalidUrl'))
        .required(t('participantForm.validation.requiredField')),
      repo_url: YUP.string()
        .url(t('institutionalSubmission.validation.invalidUrl'))
        .required(t('participantForm.validation.requiredField')),
    }),
  });

  return (
    <ModalWrapper closeModal={closeModal} modalStyles={classes.modal}>
      <div className={classes.container}>
        {isLoading && (
          <div className={classes.blurOverlay}>
            <Loader />
          </div>
        )}
        <div className={classes.wrapper}>
          <h2 className={classes.headText}>
            <Translate value="events.hackathon.solution" />
          </h2>
          <div className={classes.controlInputWrapper}>
            <label>
              <Translate value="events.hackathon.repoUrl" />
            </label>
            <TextInput
              value={formik.values.repo_url}
              onChange={(e) => formik.setFieldValue('repo_url', e.target.value)}
              error={
                !!formik.touched?.repo_url && !!formik.errors?.repo_url
                  ? formik.errors?.repo_url
                  : null
              }
              inputProps={{
                onClick: () => formik.setFieldTouched('repo_url', true, false),
              }}
            />
          </div>
          <div className={classes.controlInputWrapper}>
            <label>
              <Translate value="events.hackathon.videoUrl" />
            </label>
            <TextInput
              value={formik.values.video_url}
              onChange={(e) =>
                formik.setFieldValue('video_url', e.target.value)
              }
              error={
                !!formik.touched?.video_url && !!formik.errors?.video_url
                  ? formik.errors?.video_url
                  : null
              }
              inputProps={{
                onClick: () => formik.setFieldTouched('video_url', true, false),
              }}
            />
          </div>
          <Button
            label="controls.submit"
            handleClick={() => formik.handleSubmit()}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
