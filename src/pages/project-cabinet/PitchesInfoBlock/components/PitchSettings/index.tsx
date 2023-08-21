import {
  Pitch,
  EPitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { EActionStatus } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { FormikProps } from 'formik';
import { t } from 'i18next';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import {
  ISubmissionProject,
  ISubmissionSubProject,
} from 'pages/project-cabinet/interfaces';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { ProjectPitches } from 'pages/project-page/constants';
import { ITranslationKeys } from 'services/translation';
import { Button } from 'shared/components/button/Button';
import { DateTimePicker } from 'shared/components/DateTimePicker/DateTimePicker';
import { AmountInput } from 'shared/components/inputs/AmountInput';
import { TextInput } from 'shared/components/inputs/TextInput';
import { PitchStatusLabel } from 'shared/components/pitch-status-label/PitchStatusLabel';
import { Switch } from 'shared/components/switch';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { classNames } from 'shared/styles/theme';

import { useStyles } from './styles';
import { getPitchType, PitchesInfoBlockState } from '../../helpers';

type PitchSettingsProps = {
  project: ISubmissionProject;
  userProject: ISubmissionSubProject;
  pitchType: ProjectPitches;
  isEdit: boolean;
  formik: FormikProps<PitchesInfoBlockState>;
  isActivationAvailable: boolean;
  handleActivationPitch: (pitchType: EPitchType, isActive: boolean) => void;
};

export const PitchSettings: React.FC<PitchSettingsProps> = ({
  pitchType,
  project,
  userProject,
  isEdit,
  formik: { values, setFieldValue, setFieldTouched, handleSubmit, ...formik },
  isActivationAvailable,
  handleActivationPitch,
}) => {
  const classes = useStyles();

  const touched = formik.touched?.[pitchType];
  const errors = formik.errors?.[pitchType];

  const inputWrapperClasses = (error: string | null, ...others: string[]) =>
    classNames(
      classes.controlInput,
      ...others,
      error && classes.errorContainer
    );

  const inputClasses = (
    error?: string | null,
    cl?: {
      inputClass?: string[];
      containerClass?: string[];
      errorClass?: string[];
      infoBorder: boolean | null;
    }
  ) => ({
    inputExtraClass: classNames(classes.input, ...(cl?.inputClass ?? [])),
    containerExtraClass: classNames(
      classes.inputContainer,
      ...(cl?.containerClass ?? []),
      error ? classes.errorBorder : '',
      cl?.infoBorder && getInputLabelStyles('border')
    ),
    errorExtraClass: classNames(classes.error, ...(cl?.errorClass ?? [])),
    infoLabelExtraClass: classNames(
      cl?.infoBorder && getInputLabelStyles('color')
    ),
  });

  const getError = (field: keyof Pitch) =>
    !!touched?.[field] && !!errors?.[field] ? errors?.[field] ?? null : null;

  const isUpdated =
    userProject[pitchType]?.status === EActionStatus.New ||
    userProject[pitchType]?.status === EActionStatus.Updated;
  const isFailed = userProject[pitchType]?.status === EActionStatus.Failed;

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  const isDiff = (field: keyof Pitch) =>
    project[pitchType]?.[field] !== userProject[pitchType]?.[field];

  return (
    <div className={classes.pitch}>
      <div className={classes.pitchName}>
        <label>{project?.[pitchType]?.name}</label>
        <QuestionIcon data-tooltip-id={pitchType} />
      </div>
      <div className={classes.pitchType}>
        <PitchStatusLabel
          stage={getPitchType(pitchType)}
          extraClasses={classes.pitchTypeLabel}
        />
        <div className={classes.line} />
        <Switch
          disabled={!isActivationAvailable}
          onChange={(isActive) => {
            handleActivationPitch(getPitchType(pitchType), isActive);
            setFieldValue(`${pitchType}.is_active`, isActive);
          }}
          checked={values[pitchType].is_active}
        />
      </div>
      <div>
        <div className={inputWrapperClasses(errors?.name ?? null)}>
          <label>
            <Translate value="projectCabinetPage.pitchName" />
          </label>
          <TextInput
            value={values[pitchType].name}
            onChange={(e) => setFieldValue(`${pitchType}.name`, e.target.value)}
            error={getError('name')}
            readOnly={!isEdit}
            inputProps={{
              onClick: () => setFieldTouched(`${pitchType}.name`, true, false),
            }}
            {...inputClasses(getError('name'), {
              infoBorder: isDiff('name'),
            })}
            infoLabel={isDiff('name') ? getInputInfoLabel() : EMPTY_STRING}
          />
        </div>
        <div className={inputWrapperClasses(errors?.speaker_name ?? null)}>
          <label>
            <Translate value="projectCabinetPage.speakerName" />
          </label>
          <TextInput
            value={values[pitchType].speaker_name}
            onChange={(e) =>
              setFieldValue(`${pitchType}.speaker_name`, e.target.value)
            }
            error={getError('speaker_name')}
            readOnly={!isEdit}
            inputProps={{
              onClick: () =>
                setFieldTouched(`${pitchType}.speaker_name`, true, false),
            }}
            {...inputClasses(getError('speaker_name'), {
              infoBorder: isDiff('speaker_name'),
            })}
            infoLabel={
              isDiff('speaker_name') ? getInputInfoLabel() : EMPTY_STRING
            }
          />
        </div>
        <div className={classes.controlDates}>
          <div className={inputWrapperClasses(errors?.starts_on ?? null)}>
            <label>
              <Translate value="projectCabinetPage.startTime" />
            </label>
            <div className={classes.processingWrapper}>
              <DateTimePicker
                date={values[pitchType].starts_on}
                setDate={(date) => {
                  setFieldTouched(`${pitchType}.starts_on`, true, false);
                  setFieldValue(`${pitchType}.starts_on`, date);
                }}
                readOnly={!isEdit}
                inputEC={classNames(classes.input, classes.smallDate)}
                containerEC={classNames(
                  classes.dateInputContainer,
                  !!getError('starts_on') && classes.errorBorder,
                  isDiff('starts_on') && getInputLabelStyles('border')
                )}
                inputProps={{
                  onClick: () =>
                    setFieldTouched(`${pitchType}.starts_on`, true, false),
                }}
              />
              {isDiff('starts_on') && (
                <label
                  className={classNames(
                    classes.processingLabel,
                    getInputLabelStyles('color')
                  )}
                >
                  <Translate value={getInputInfoLabel() as ITranslationKeys} />
                </label>
              )}
            </div>
            {!!getError('starts_on') && (
              <p className={classes.error}>{errors?.starts_on}</p>
            )}
          </div>
          <div className={inputWrapperClasses(errors?.duration ?? null)}>
            <label>
              <span>
                <Translate value="projectCabinetPage.duration" />
              </span>
              <span>
                <Translate value="projectCabinetPage.inMinutes" />
              </span>
            </label>
            <AmountInput
              value={values[pitchType].duration}
              onChange={(minutes) => {
                setFieldValue(
                  `${pitchType}.duration`,
                  Number(minutes).toFixed(0)
                );
              }}
              error={getError('duration')}
              isMaxBtn={false}
              {...inputClasses(getError('duration'), {
                inputClass: [classes.durationInput],
                infoBorder: isDiff('duration'),
              })}
              readOnly={!isEdit}
              inputProps={{
                placeholder: '0',
                onClick: () =>
                  setFieldTouched(`${pitchType}.duration`, true, false),
              }}
              infoLabel={
                isDiff('duration') ? getInputInfoLabel() : EMPTY_STRING
              }
            />
          </div>
        </div>
        <div className={inputWrapperClasses(errors?.video_url ?? null)}>
          <label>
            <Translate value="projectCabinetPage.videoUrl" />
          </label>
          <TextInput
            value={values[pitchType].video_url}
            onChange={(e) =>
              setFieldValue(`${pitchType}.video_url`, e.target.value.trim())
            }
            readOnly={!isEdit}
            error={getError('video_url')}
            {...inputClasses(getError('video_url'), {
              infoBorder: isDiff('video_url'),
            })}
            inputProps={{
              onClick: () =>
                setFieldTouched(`${pitchType}.video_url`, true, false),
            }}
            infoLabel={isDiff('video_url') ? getInputInfoLabel() : EMPTY_STRING}
          />
        </div>
      </div>
      {isEdit && (
        <div className={classes.controlsWrapper}>
          <div className={classes.controls}>
            <Button
              disabled={!userProject.is_active}
              extraClass={classes.saveBtn}
              label="controls.saveChanges"
              handleClick={() => {
                setFieldValue('activePitch', pitchType);
                setTimeout(() => handleSubmit());
              }}
            />
            <textarea
              value={values[pitchType].comment}
              onChange={(e) =>
                setFieldValue(`${pitchType}.comment`, e.target.value)
              }
              className={classes.comment}
              placeholder={t('placeHolders.comment')}
            />
          </div>
        </div>
      )}
    </div>
  );
};
