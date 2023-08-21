import { ICloseModal } from 'shared/interfaces';

import { useStyles } from './styles';

const ModalWrapper: React.FC<ICloseModal> = ({
  children,
  closeModal,
  modalStyles = '',
  wrapperStyles = '',
}): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wrapper + ' ' + wrapperStyles} onClick={closeModal} />
      <div className={classes.modal + ' ' + modalStyles}>{children}</div>
    </>
  );
};

export default ModalWrapper;
