import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { ISignOutModal } from 'shared/interfaces';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const SignOutModal: React.FC<ISignOutModal> = ({
  closeModal,
  accountId,
  handleConfirm,
}) => {
  const classes = useStyles();

  const confirmHandler = () => {
    handleConfirm();
    closeModal();
  };
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Translate value="account.signOutConfirm" />
        </div>
        <div className={classes.account}>{accountId}</div>
        <Button
          label="auth.signOut"
          extraClass={classes.button}
          handleClick={confirmHandler}
        />
      </div>
    </ModalWrapper>
  );
};
