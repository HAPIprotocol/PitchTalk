import { t } from 'i18next';

import { useWalletSelector } from 'providers/WalletProvider';
import { APP_ROUTES } from 'routes';
import { useNavigate } from 'services/router';
import { Button } from 'shared/components/button/Button';
import { Translate } from 'shared/components/translate/Translate';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { selectIsGrantUser } from 'store/slices/funds';
import { selectSubFundById } from 'store/slices/submission';
import { selectAccountId, selectOffChainUserData } from 'store/slices/user';
import { logoutUser } from 'store/thunks/user';

import { useStyles } from './styles';

export const FundNavigation: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isGrantUser } = useAppSelector(selectIsGrantUser);
  const accountId = useAppSelector(selectAccountId);
  const offChainUserData = useAppSelector(selectOffChainUserData);
  const submissionFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );
  const { showModal, closeModal } = useModalContext();
  const { openModal } = useWalletSelector();

  const isFundCabinet = !!submissionFund || isGrantUser;

  const buttonLabel = isFundCabinet
    ? 'profilePage.goToFundCabinet'
    : 'profilePage.goToFundRegister';

  const redirectFundPages = () => {
    if (offChainUserData) {
      showModal(EModals.INFO_MODAL, {
        text: t('auth.useNearWallet'),
        submitButtonText: t('auth.signOut'),
        submitAction: () => {
          dispatch(logoutUser());
          closeModal();
          openModal();
        },
        isCloseModalBtn: false,
      });
      return;
    }
    if (isFundCabinet) {
      navigate(`${APP_ROUTES.FUND_CABINET}`);
      return;
    }
    navigate(`${APP_ROUTES.INSTITUTIONAL_SUBMISSION}`);
  };

  return (
    <div className={classes.wrapper}>
      <Button label={buttonLabel} handleClick={redirectFundPages} />
      <span className={classes.text}>
        <Translate value="profilePage.fundMessage" />
      </span>
    </div>
  );
};
