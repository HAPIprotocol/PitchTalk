import { Translate } from 'shared/components/translate/Translate';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { IAuthModal } from 'shared/interfaces';
import {
  authWithGoogle,
  // authWithMetamask,
  authWithMetamaskSDK
} from 'store/thunks/user';

import { AuthBtn } from './AuthBtn/AuthBtn';
import { useStyles } from './styles';
import { EAuthModalType, EAuthorizationlType } from './types';
import { CloseBtn } from '../components/CloseBtn/CloseBtn';
import ModalWrapper from '../modal-wrapper/ModalWrapper';

export const AuthModal: React.FC<IAuthModal> = ({
  title = EAuthModalType.Default,
  closeModal,
  signInWithOnChain,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const signInWithGoogle = () => {
    dispatch(authWithGoogle());
  };
  // const signInWithMetamask = async () => {
  //   await dispatch(authWithMetamask());
  //   closeModal();
  // };
  const signInWithMetamaskSDK = async () => {
    await dispatch(authWithMetamaskSDK());
    closeModal();
  };
  const signInWithOnChainNear = async () => {
    signInWithOnChain();
    closeModal();
  };

  const AUTH_MODAL_CONFIG = [
    { type: EAuthorizationlType.Google, onLogin: signInWithGoogle },
    // { type: EAuthorizationlType.Metamask, onLogin: signInWithMetamask },
    { type: EAuthorizationlType.MetamaskSDK, onLogin: signInWithMetamaskSDK },
    { type: EAuthorizationlType.Near, onLogin: signInWithOnChainNear },
  ];

  return (
    <ModalWrapper closeModal={closeModal} modalStyles={classes.modal}>
      <div className={classes.container}>
        <div className={classes.modalHead}>
          <h3 className={classes.title}>
            <Translate value={`authModal.${title}`} />
          </h3>
          <p className={classes.subTitle}>
            <Translate value="authModal.subTitle" />
          </p>
        </div>
        <div className={classes.modalBody}>
          {AUTH_MODAL_CONFIG.map((auth, i) => (
            <AuthBtn key={i} type={auth.type} onLogin={auth.onLogin} />
          ))}
        </div>
      </div>
      <CloseBtn onClick={closeModal} />
    </ModalWrapper>
  );
};
