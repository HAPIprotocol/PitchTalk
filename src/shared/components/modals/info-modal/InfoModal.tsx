import { Button } from 'shared/components/button/Button';
import { IInfoModal } from 'shared/interfaces';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const InfoModal: React.FC<IInfoModal> = ({
  closeModal,
  text,
  submitAction,
  submitButtonText,
  isCloseModalBtn = true,
}) => {
  const classes = useStyles();
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className={classes.container}>
        <div className={classes.title}>{text}</div>
        <div className={classes.buttons}>
          {isCloseModalBtn && (
            <Button
              label="actions.closeModal"
              extraClass={classes.closeButton}
              handleClick={closeModal}
            />
          )}
          {submitButtonText && submitAction && (
            <Button
              label={submitButtonText}
              translate={false}
              extraClass={classes.button}
              handleClick={submitAction}
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
