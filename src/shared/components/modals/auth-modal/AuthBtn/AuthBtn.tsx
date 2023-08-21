import { t } from 'i18next';
import React from 'react';

import { ReactComponent as GoogleIcon } from 'assets/images/auth/google.svg';
import { ReactComponent as MetaMaskIcon } from 'assets/images/auth/metamask.svg';
import { ReactComponent as NearIcon } from 'assets/images/auth/near.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/images/icons/arrow-right-icon.svg';

import { useStyles } from './styles';
import { EAuthorizationlType } from '../types';

interface IAuthBtnProps {
  type: EAuthorizationlType;
  onLogin: () => void;
}

export const AuthBtn: React.FC<IAuthBtnProps> = ({ type, onLogin }) => {
  const classes = useStyles({ type });
  const icon = {
    [EAuthorizationlType.Google]: <GoogleIcon className={classes.authIcon} />,
    [EAuthorizationlType.Metamask]: (
      <MetaMaskIcon className={classes.authIcon} />
    ),
    [EAuthorizationlType.MetamaskSDK]: (
      <MetaMaskIcon className={classes.authIcon} />
    ),
    [EAuthorizationlType.Near]: <NearIcon className={classes.authIcon} />,
  }[type];

  return (
    <div className={classes.btnContainer} onClick={onLogin}>
      <div className={classes.btnContent}>
        <div className={classes.authIconWrapper}>{icon}</div>
        {`${t('authModal.continueWith', { auth: type })}`}
      </div>
      <ArrowRightIcon className={classes.btnArrow} />
    </div>
  );
};
