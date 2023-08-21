import { EProjectType } from '@pitchtalk/contract-api-js/dist/interfaces';
import {
  PitchArgsOffChain,
  PitchArgsOnChain,
  Pitch,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import msToSec from 'date-fns/millisecondsToSeconds';
import { t } from 'i18next';

import { ProjectPitches } from 'pages/project-page/constants';
import {
  EMPTY_STRING,
  MAX_PITCH_DURATION_MINUTES,
  MIN_PITCH_DURATION_MINUTES,
  ONE_MINUTE_IN_MS,
  ONE_SECOND_IN_MS,
  TIME_PERIOD,
  URL_CONST,
} from 'shared/constants';
import { isPitchStarted } from 'shared/utils/pitchUtils';
import YUP from 'shared/utils/yupUtils';

import { ISubmissionProject } from '../interfaces';

type PitchWithComment = Pitch & { comment?: string };

export type PitchesInfoBlockState = {
  activePitch: ProjectPitches;
  [ProjectPitches.INTRO]: PitchWithComment;
  [ProjectPitches.UPDATE]: PitchWithComment;
  [ProjectPitches.INVEST]: PitchWithComment;
};

export const getPitchType = (projectPitchType: ProjectPitches) =>
  ({
    [ProjectPitches.INTRO]: EPitchType.Intro,
    [ProjectPitches.UPDATE]: EPitchType.Update,
    [ProjectPitches.INVEST]: EPitchType.Investment,
  }[projectPitchType]);

export const getPitch = (
  (now: number) =>
  (pitchType: ProjectPitches, project: ISubmissionProject) => ({
    is_active: !!project[pitchType]?.is_active,
    name: project[pitchType]?.name ?? EMPTY_STRING,
    speaker_name: project[pitchType]?.speaker_name ?? EMPTY_STRING,
    starts_on:
      project.type === EProjectType.OnChain
        ? project[pitchType]?.starts_on ?? now
        : new Date(project[pitchType]?.starts_on ?? now).valueOf(),
    duration: project[pitchType]?.duration
      ? (project[pitchType]?.duration || 0) / ONE_MINUTE_IN_MS
      : 0,
    video_url: project[pitchType]?.video_url ?? EMPTY_STRING,
    stage: project[pitchType]?.stage ?? EPitchType.Initial,
    comment: EMPTY_STRING,
  })
)(Date.now());

const defaultPitchValidation = {
  name: YUP.string().required(t('validation.pitch.name.required')),
  speaker_name: YUP.string().required(
    t('validation.pitch.speakerName.required')
  ),
  duration: YUP.number()
    .min(
      MIN_PITCH_DURATION_MINUTES,
      t('validation.pitch.duration.min', { min: MIN_PITCH_DURATION_MINUTES })
    )
    .max(
      MAX_PITCH_DURATION_MINUTES,
      t('validation.pitch.duration.max', { max: MAX_PITCH_DURATION_MINUTES })
    )
    .required(t('validation.pitch.duration.required'))
    .typeError(t('validation.incorrectField')),
  video_url: YUP.string()
    .url(t('participantForm.validation.invalidUrl'))
    .startWithHTTP()
    .matches(URL_CONST, t('validation.pitch.videoUrl.invalid'))
    .required(t('validation.pitch.videoUrl.required')),
  starts_on: YUP.number()
    .required(t('validation.pitch.startsOn.required'))
    .typeError(t('validation.incorrectDate')),
};

export const getValidationSchema = (
  intro: Pitch,
  update: Pitch,
  invest: Pitch,
  values: PitchesInfoBlockState
) =>
  YUP.object({
    [ProjectPitches.INTRO]:
      values.activePitch === ProjectPitches.INTRO
        ? YUP.object(defaultPitchValidation)
        : YUP.object(),
    [ProjectPitches.UPDATE]: YUP.object().when([ProjectPitches.INTRO], () =>
      intro.name && !update.name && values.activePitch === ProjectPitches.UPDATE
        ? YUP.object(defaultPitchValidation)
        : YUP.object()
    ),
    [ProjectPitches.INVEST]: YUP.object().when(ProjectPitches.UPDATE, () =>
      update.name &&
      !invest.name &&
      values.activePitch === ProjectPitches.INVEST
        ? YUP.object(defaultPitchValidation)
        : YUP.object()
    ),
  });

export const getOnChainPitchForSaving = (pitch: Pitch): PitchArgsOnChain => ({
  name: pitch.name,
  speaker_name: pitch.speaker_name,
  starts_on_sec: msToSec(pitch.starts_on),
  duration_sec: pitch.duration * TIME_PERIOD,
  video_url: pitch.video_url,
});

export const getOffChainPitchForSaving = (
  pitch: Pitch,
  pitchType: EPitchType
): PitchArgsOffChain => ({
  name: pitch.name,
  speaker_name: pitch.speaker_name,
  starts_on: new Date(pitch.starts_on),
  duration: pitch.duration * ONE_SECOND_IN_MS * TIME_PERIOD,
  video_url: pitch.video_url,
  stage: pitchType,
});
