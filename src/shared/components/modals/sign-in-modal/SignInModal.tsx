import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { ISignInModal } from 'shared/interfaces';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const SignInModal: React.FC<ISignInModal> = ({
  closeModal,
  handleConfirm,
}) => {
  const classes = useStyles();
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Translate value="account.signInRequire" />
        </div>
        <Button
          label="navigation.connectWallet"
          extraClass={classes.button}
          handleClick={handleConfirm}
        />
      </div>
    </ModalWrapper>
  );
};
