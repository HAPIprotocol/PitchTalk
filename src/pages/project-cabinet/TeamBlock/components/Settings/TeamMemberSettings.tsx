import {
  ITeam,
  ITeamMember,
} from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import omit from 'lodash/omit';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Tooltip } from 'react-tooltip';
import ValidationError from 'yup/lib/ValidationError';

import { ReactComponent as QuestionIcon } from 'assets/images/icons/question-icon.svg';
import { TooltipWrapper } from 'pages/project-cabinet/components/Tooltips';
import { ETeamSettingsTooltips } from 'pages/project-cabinet/constants';
import { inputLabelUtils } from 'pages/project-cabinet/utils';
import { Button } from 'shared/components/button/Button';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING, readOnlyOnChange } from 'shared/constants';
import { classNames } from 'shared/styles/theme';
import YUP from 'shared/utils/yupUtils';

import { useStyles } from './styles';

interface ITeamMemberSettingsProps {
  id: string;
  formik: FormikProps<ITeam>;
  teamMember: ITeamMember;
  isEdit: boolean;
  isUpdated: boolean;
  isFailed: boolean;
  projectTeam: ITeam;
  userProjectTeam: ITeam;
  setPreviewImages: Dispatch<SetStateAction<Record<string, string>>>;
  setIPFSImages: Dispatch<SetStateAction<Record<string, File | null>>>;
}

export const TeamMemberSettings: React.FC<ITeamMemberSettingsProps> = ({
  id,
  formik: {
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    dirty,
  },
  teamMember,
  isEdit,
  isUpdated,
  isFailed,
  projectTeam,
  userProjectTeam,
  setPreviewImages,
  setIPFSImages,
}) => {
  const classes = useStyles();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [teamMemberImg, setTeamMemberImg] = useState<File | null>();

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

  const getError = (field: keyof Omit<ITeamMember, 'social_links'>) =>
    !!touched[id]?.[field] && !!errors[id]?.[field]
      ? errors[id]?.[field] ?? null
      : null;

  const getInputLabelStyles = inputLabelUtils.stylesFunc(
    isUpdated,
    isFailed,
    classes
  );
  const getInputInfoLabel = inputLabelUtils.labelFunc(isUpdated, isFailed);

  const isDiff = (field: keyof ITeamMember) =>
    projectTeam[id]?.[field] !== userProjectTeam[id]?.[field];

  const clearInput = () => {
    setFieldValue(`['${id}'].logo`, EMPTY_STRING);
    setTeamMemberImg(null);
    setPreviewImages((prev) => omit(prev, id));
    imgRef?.current?.setAttribute('type', 'text');
    imgRef?.current?.setAttribute('type', 'file');
  };

  const validateLogo = async (logoUrl: string) =>
    await YUP.string()
      .startWithHTTP()
      .url(t('participantForm.validation.invalidUrl'))
      .validate(logoUrl)
      .then(() => setFieldError(`['${id}'].logo`, undefined))
      .catch((e) => {
        const error = e as ValidationError;
        setFieldError(`['${id}'].logo`, error.message);
      });

  const onLogoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const logoUrl = e.target.value.trim();
    validateLogo(logoUrl);
    setFieldValue(`['${id}'].logo`, logoUrl);
  };

  useEffect(() => {
    if (!teamMemberImg) return;
    const logo = URL.createObjectURL(teamMemberImg);
    setFieldValue(`['${id}'].logo`, teamMemberImg.name);
    setIPFSImages((prev) => ({ ...prev, [id]: teamMemberImg }));
    setPreviewImages((prev) => ({ ...prev, [id]: logo }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMemberImg]);

  const getControls = () => (
    <>
      {!teamMemberImg ? (
        <>
          <Button
            extraClass={classes.uploadButton}
            label="controls.uploadFile"
            handleClick={() => imgRef?.current?.click()}
          />
          <Button
            disabled={(!!errors[id]?.logo && touched[id]?.logo) || !dirty}
            extraClass={classes.saveBtn}
            label={
              userProjectTeam[id]?.logo
                ? 'controls.editLink'
                : 'controls.uploadAsLink'
            }
            handleClick={() =>
              setPreviewImages((prev) => ({
                ...prev,
                [id]: values[id]?.logo,
              }))
            }
          />
        </>
      ) : (
        <Button
          extraClass={classes.clearButton}
          label="controls.clear"
          handleClick={() => clearInput()}
        />
      )}
    </>
  );

  return (
    <div className={classes.teamBlockContentSettings}>
      <div className={inputWrapperClasses(null)}>
        <label className={classes.inputLabel}>
          <Translate value="projectCabinetPage.walletId" />
        </label>
        <TextInput
          value={id}
          onChange={readOnlyOnChange}
          error={null}
          readOnly={true}
          {...inputClasses('')}
        />
      </div>
      <div className={inputWrapperClasses(errors[id]?.first_name ?? null)}>
        <label className={classes.inputLabel}>
          <Translate value="projectCabinetPage.firstName" />
        </label>
        <TextInput
          value={teamMember.first_name}
          onChange={(e) =>
            setFieldValue(`['${id}'].first_name`, e.target.value)
          }
          error={getError('first_name')}
          readOnly={!isEdit}
          inputProps={{
            onClick: () => setFieldTouched(`['${id}'].first_name`, true, false),
          }}
          {...inputClasses(getError('first_name'), {
            infoBorder: isDiff('first_name'),
          })}
          infoLabel={isDiff('first_name') ? getInputInfoLabel() : EMPTY_STRING}
        />
      </div>
      <div className={inputWrapperClasses(errors[id]?.last_name ?? null)}>
        <label className={classes.inputLabel}>
          <Translate value="projectCabinetPage.lastName" />
        </label>
        <TextInput
          value={teamMember.last_name}
          onChange={(e) => setFieldValue(`['${id}'].last_name`, e.target.value)}
          error={getError('last_name')}
          readOnly={!isEdit}
          inputProps={{
            onClick: () => setFieldTouched(`['${id}'].last_name`, true, false),
          }}
          {...inputClasses(getError('last_name'), {
            infoBorder: isDiff('last_name'),
          })}
          infoLabel={isDiff('last_name') ? getInputInfoLabel() : EMPTY_STRING}
        />
      </div>
      <div className={inputWrapperClasses(errors[id]?.position ?? null)}>
        <label className={classes.inputLabel}>
          <Translate value="projectCabinetPage.position" />
        </label>
        <TextInput
          value={teamMember.position}
          onChange={(e) => setFieldValue(`['${id}'].position`, e.target.value)}
          error={getError('position')}
          readOnly={!isEdit}
          inputProps={{
            onClick: () => setFieldTouched(`['${id}'].position`, true, false),
          }}
          {...inputClasses(getError('position'), {
            infoBorder: isDiff('position'),
          })}
          infoLabel={isDiff('position') ? getInputInfoLabel() : EMPTY_STRING}
        />
      </div>
      <div className={inputWrapperClasses(errors[id]?.logo ?? null)}>
        <label className={classes.inputLabelWithIcon}>
          <span>
            <Translate value="projectCabinetPage.imgUrl" />
          </span>
          <QuestionIcon
            data-tooltip-id={ETeamSettingsTooltips.TEAM_MEMBER_LOGO_SIZE}
          />
        </label>
        <input
          style={{ display: 'none' }}
          type="file"
          name="teamMember-img"
          ref={imgRef}
          onChange={() => setTeamMemberImg(imgRef?.current?.files?.[0] || null)}
        />
        <TextInput
          {...inputClasses(errors[id]?.logo ?? null, undefined)}
          value={teamMember.logo}
          onChange={onLogoInputChange}
          error={getError('logo')}
          readOnly={!isEdit || !!teamMemberImg}
          placeHolder={teamMemberImg?.name || t('placeHolders.insertImgLink')}
          infoLabel={isDiff('logo') ? getInputInfoLabel() : EMPTY_STRING}
          inputProps={{
            onClick: () => setFieldTouched(`['${id}'].logo`, true, false),
          }}
          {...inputClasses(getError('logo'), {
            infoBorder: isDiff('logo'),
          })}
        />
        {isEdit && (
          <div className={classes.buttonControls}>{getControls()}</div>
        )}
      </div>
      <Tooltip id={ETeamSettingsTooltips.TEAM_MEMBER_LOGO_SIZE}>
        <TooltipWrapper value="tooltips.teamSettings.logoImgSize" />
      </Tooltip>
    </div>
  );
};
