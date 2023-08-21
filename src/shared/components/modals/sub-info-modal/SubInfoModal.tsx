import { useEffect, useState } from 'react';

import { Button } from 'shared/components/button/Button';
import { Checkbox } from 'shared/components/checkbox/Checkbox';
import { Translate } from 'shared/components/translate/Translate';
import { IInfoModal } from 'shared/interfaces';
import { ESTORAGE_KEYS, setItem } from 'shared/utils/storage';

import { useStyles } from './styles';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const SubInfoModal: React.FC<IInfoModal> = ({ closeModal }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    return () => {
      setItem(ESTORAGE_KEYS.DO_NOT_SHOW_SUB_INFO_MODAL, !showModal);
    };
  });

  return (
    <ModalWrapper closeModal={closeModal} modalStyles={classes.modalStyles}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Translate value="projectCabinetPage.changeInfoModal.title" />
        </div>
        <div className={classes.checkBoxWrapper}>
          <Checkbox
            onChange={() => setShowModal((p) => !p)}
            checked={!showModal}
          />
          <Translate value="projectCabinetPage.changeInfoModal.subTitle" />
        </div>
        <Button
          label="actions.continue"
          extraClass={classes.button}
          handleClick={closeModal}
        />
      </div>
    </ModalWrapper>
  );
};
