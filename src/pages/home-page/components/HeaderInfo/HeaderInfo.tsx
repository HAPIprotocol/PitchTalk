import { t } from 'i18next';
import { memo } from 'react';

import { ReactComponent as MainImg } from 'assets/images/main-page.svg';
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
import {
  selectAccountId,
  selectOffChainUserData,
  selectOffChainUserProject,
  selectUserProjectId,
} from 'store/slices/user';
import { logoutUser } from 'store/thunks/user';

import { useStyles } from './styles';

export const HeaderInfo: React.FC = memo(() => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { showModal, closeModal } = useModalContext();
  const { openModal } = useWalletSelector();
  const dispatch = useAppDispatch();

  const { isGrantUser } = useAppSelector(selectIsGrantUser);
  const accountId = useAppSelector(selectAccountId);
  const offChainUserData = useAppSelector(selectOffChainUserData);
  const submissionFund = useAppSelector((state) =>
    selectSubFundById(state, accountId)
  );
  const offChainUserProject = useAppSelector(selectOffChainUserProject);
  const onChainUserProjectId = useAppSelector(selectUserProjectId);

  const isFundCabinet = !!submissionFund || isGrantUser;

  const redirectFundPages = () => {
    if (offChainUserData || !accountId) {
      showModal(EModals.INFO_MODAL, {
        text: t('auth.useNearWallet'),
        submitButtonText: !accountId ? t('auth.logIn') : t('auth.signOut'),
        submitAction: () => {
          if (offChainUserData) dispatch(logoutUser());
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
    <div className={classes.headerContainer}>
      <div className={classes.infoContainer}>
        <div className={classes.headerInfo}>
          <h2 className={classes.infoTitle}>
            <Translate value="mainPage.title" />
          </h2>
          <p className={classes.infoDescription}>
            <Translate value="mainPage.description" />
          </p>
        </div>
        <div className={classes.submissionBtns}>
          <Button
            extraClass={classes.submitBtn}
            label={
              onChainUserProjectId || offChainUserProject
                ? 'mainPage.manageProject'
                : 'mainPage.submitProject'
            }
            handleClick={() =>
              navigate(
                onChainUserProjectId || offChainUserProject
                  ? APP_ROUTES.PROJECT_CABINET
                  : APP_ROUTES.PARTICIPANT
              )
            }
          />
          <Button
            extraClass={classes.submitBtnOutlined}
            label={
              isGrantUser ? 'mainPage.managePartner' : 'mainPage.becamePartner'
            }
            handleClick={redirectFundPages}
          />
        </div>
      </div>
      <div>
        <MainImg className={classes.mainImg} />
      </div>
    </div>
  );
});
