import { useFormik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';

import { ReactComponent as SuccessIcon } from 'assets/images/icons/success-icon.svg';
import { Button } from 'shared/components/button/Button';
import { EMPTY_STRING } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { IUserNameModal } from 'shared/interfaces';
import { ESTORAGE_KEYS, setItem } from 'shared/utils/storage';
import YUP from 'shared/utils/yupUtils';
import { selectUserDisplayName, selectUserOffChainId } from 'store/slices/user';
import { updateUserDisplayName } from 'store/thunks/user';

import { useStyles } from './styles';
import { CloseBtn } from '../components/CloseBtn/CloseBtn';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

const MIN_USERNAME = 3;
const MAX_USERNAME = 20;

enum EModalSteps {
  CURRENT_NAME,
  CHANGE_NAME,
  SUCCESS_CHANGE_NAME,
}

export const UserNameModal: React.FC<IUserNameModal> = ({
  closeModal,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const userId = useAppSelector(selectUserOffChainId);
  const userName = useAppSelector(selectUserDisplayName);
  const formik = useFormik({
    initialValues: { userName: EMPTY_STRING },
    onSubmit: ({ userName }, helpers) => {
      helpers.setSubmitting(true);
      dispatch(updateUserDisplayName(userName))
        .then(() => setStep(EModalSteps.SUCCESS_CHANGE_NAME))
        .finally(() => helpers.setSubmitting(false));
    },
    validationSchema: YUP.object({
      userName: YUP.string()
        .min(MIN_USERNAME, t('events.validation.tooShortUserName'))
        .max(MAX_USERNAME, t('events.validation.tooLongUserName'))
        .required(t('events.validation.requiredUserName')),
    }),
  });

  const [step, setStep] = useState(EModalSteps.CURRENT_NAME);
  let content = null;

  const setShowModal = () =>
    setItem(`${ESTORAGE_KEYS.SHOWED_USER_NAME_MODAL}__${userId}`, true);

  switch (step) {
    case EModalSteps.CURRENT_NAME:
      content = (
        <>
          <div className={classes.contentContainer}>
            <p className={classes.subContent}>{`${t(
              'events.userNameModal.beforeContinue'
            )}`}</p>
            <p className={classes.userName}>{userName}</p>
          </div>
          <div className={classes.controlsButtons}>
            <Button
              extraClass={classes.primaryBtn}
              label="events.userNameModal.changeUserName"
              handleClick={() => setStep(EModalSteps.CHANGE_NAME)}
            />
            <Button
              extraClass={classes.secondaryBtn}
              label="events.userNameModal.keepUserName"
              handleClick={() => {
                setShowModal();
                onSubmit();
                closeModal();
              }}
            />
          </div>
        </>
      );
      break;
    case EModalSteps.CHANGE_NAME:
      content = (
        <>
          <div className={classes.contentContainer}>
            <h3 className={classes.contentTitle}>{`${t(
              'events.userNameModal.changeUserName'
            )}`}</h3>
            <p className={classes.subContent}>{`${t(
              'events.userNameModal.doubleCheck'
            )}`}</p>
            <div className={classes.userNameContainer}>
              <label
                className={classes.userNameInputLabel}
                htmlFor="userName-input"
              >{`${t('events.userNameModal.userName')}`}</label>
              <input
                name="userName-input"
                className={classes.userNameInput}
                value={formik.values.userName}
                onChange={(e) =>
                  formik.setFieldValue('userName', e.target.value)
                }
                placeholder={t('events.userNameModal.diseredUserName', {
                  min: MIN_USERNAME,
                  max: MAX_USERNAME,
                })}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className={classes.userNameError}>
                  {formik.errors.userName}
                </p>
              )}
            </div>
          </div>
          <div className={classes.controlsButtons}>
            <Button
              extraClass={classes.primaryBtn}
              label="events.userNameModal.saveUserName"
              disabled={
                !(formik.isValid || formik.dirty) || formik.isSubmitting
              }
              handleClick={() => formik.handleSubmit()}
            />
            <Button
              extraClass={classes.secondaryBtn}
              label="actions.goBack"
              handleClick={() => setStep(EModalSteps.CURRENT_NAME)}
            />
          </div>
        </>
      );
      break;
    case EModalSteps.SUCCESS_CHANGE_NAME:
      content = (
        <>
          <div className={classes.contentContainer}>
            <SuccessIcon />
            <p className={classes.successTitle}>{`${t(
              'events.userNameModal.userNameSuccess'
            )}`}</p>
          </div>
          <div className={classes.controlsButtons}>
            <Button
              extraClass={classes.primaryBtn}
              label="actions.ok"
              handleClick={() => {
                setShowModal();
                closeModal();
                onSubmit();
              }}
            />
          </div>
        </>
      );
      break;
  }

  return (
    <ModalWrapper closeModal={closeModal} modalStyles={classes.modalContainer}>
      <div className={classes.container}>{content}</div>
      <CloseBtn onClick={closeModal} />
    </ModalWrapper>
  );
};
