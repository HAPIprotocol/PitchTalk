import { ITeam } from '@pitchtalk/contract-api-js/dist/interfaces/team';
import { FormikProps } from 'formik';
import { t } from 'i18next';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { ValidationError } from 'yup';

import { usePitchTalkServiceContext } from 'providers/PitchTalkServiceProvider';
import { Button } from 'shared/components/button/Button';
import { TextInput } from 'shared/components/inputs/TextInput';
import { Translate } from 'shared/components/translate/Translate';
import { EMPTY_STRING } from 'shared/constants';
import { classNames } from 'shared/styles/theme';
import yup from 'shared/utils/yupUtils';

import { useStyles } from './styles';
import { newTeamMember } from '../../helpers';

interface IAddNewMemberProps {
  formik: FormikProps<ITeam>;
  projectTeam: ITeam;
  isOnChain: boolean;
}

export const AddNewMember: React.FC<IAddNewMemberProps> = ({
  formik: { values, setValues },
  projectTeam,
  isOnChain,
}) => {
  const classes = useStyles();
  const [newMemberId, setNewMemberId] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string>(EMPTY_STRING);
  const { pitchTalkService } = usePitchTalkServiceContext();

  const projectTeamMembers = Object.keys(projectTeam);
  const formikTeamMembers = Object.keys(values);

  const inputClasses = () => ({
    inputExtraClass: classNames(classes.input),
    containerExtraClass: classNames(
      classes.inputContainer,
      error ? classes.errorBorder : ''
    ),
    errorExtraClass: classNames(classes.error),
  });

  const checkIsValidAccount = async (walletId: string) => {
    if (!isOnChain) {
      return await yup
        .string()
        .email(t('participantForm.validation.validEmail'))
        .required(t('participantForm.validation.requiredField'))
        .notOneOf(
          [...projectTeamMembers, ...formikTeamMembers],
          'This account is using already'
        )
        .validate(walletId)
        .then(() => setError(EMPTY_STRING))
        .catch((e) => {
          const error = e as ValidationError;
          setError(error.message);
        });
    }
    if (!walletId) {
      setError('Wallet id is required');
      return Promise.reject('Wallet id is required');
    }
    if (
      projectTeamMembers.includes(walletId) ||
      formikTeamMembers.includes(walletId)
    ) {
      setError('This account is using already');
      return Promise.reject('This account is using already');
    }
    if (!pitchTalkService)
      return Promise.reject('Cannot find pitchTalkService');

    const data = await pitchTalkService.getAccountData(walletId);
    if (!data) {
      setError('This account doesn`t exists');
      return Promise.reject('This account doesn`t exists');
    }
    setError(EMPTY_STRING);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkIsValidAccountDebounced = useCallback(
    debounce((walletId) => checkIsValidAccount(walletId), 1000),
    []
  );

  const onWalletIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const walletId = e.target.value;
    setNewMemberId(walletId);
    checkIsValidAccountDebounced(walletId);
  };

  const addNewMember = () => {
    if (error || !newMemberId)
      return setError(t('participantForm.validation.requiredField'));

    checkIsValidAccount(newMemberId)
      .then(() => {
        setValues({ ...values, [newMemberId]: { ...newTeamMember } });
        setNewMemberId('');
      }) // eslint-disable-next-line no-console
      .catch(console.error);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div
          className={!error ? classes.inputWrapper : classes.inputWrapperError}
        >
          <label>
            <Translate
              value={`projectCabinetPage.${isOnChain ? 'walletId' : 'email'}`}
            />
          </label>
          <TextInput
            value={newMemberId}
            onChange={onWalletIdChange}
            error={error}
            {...inputClasses()}
          />
        </div>
        <Button
          label="actions.add"
          disabled={!!error}
          handleClick={addNewMember}
        />
      </div>
    </div>
  );
};
