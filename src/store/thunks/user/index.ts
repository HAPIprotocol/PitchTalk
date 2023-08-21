/* eslint-disable no-console */
import { SDKProvider } from '@metamask/sdk/dist/browser/es/src/provider/SDKProvider';
import { keyStores } from '@pitchtalk/contract-api-js';
import { EUserRoles } from '@pitchtalk/contract-api-js/dist/interfaces';
import { compose, createAsyncThunk } from '@reduxjs/toolkit';

import * as authAPI from 'services/api/authAPI';
import * as userAPI from 'services/api/userAPI';
import { networkId } from 'services/config';
import { ToastType } from 'services/toast/constants';
import web3Service from 'services/web3';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import { EMPTY_STRING } from 'shared/constants';
import { ESTORAGE_KEYS, getItem, setItem } from 'shared/utils/storage';
import {
  setOffChainUserData,
  setOffChainUserProjects,
  setUserDisplayName,
  setUserImg,
  setUserOffChainId,
  setUserProvider,
  setUserRole,
} from 'store/slices/user';
import { AppDispatch } from 'store/store';
import { EProviders } from 'store/types/user';

export const authWithGoogle = () => () => authAPI.fetchLoginWithGoogle();

export const authWithTwitter = () => () =>
  authAPI.fetchLoginWithTwitter().catch(console.error);

export const authWithFaceBook = () => () =>
  authAPI.fetchLoginWithFacebook().catch(console.error);

export const getUserData = () => (dispatch: AppDispatch) =>
  userAPI
    .fetchUserData()
    .then(compose(dispatch, setOffChainUserData))
    .catch(console.error);

export const getUserProjects = createAsyncThunk(
  'offchain/user/projects',
  (_, { dispatch }) =>
    userAPI.fetchUserProjects().then(compose(dispatch, setOffChainUserProjects))
);

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
  localStorage.removeItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN);
  localStorage.removeItem(ESTORAGE_KEYS.NEAR_ACCESS_TOKEN);
  localStorage.removeItem(ESTORAGE_KEYS.NEAR_REFRESH_TOKEN);
  dispatch(setOffChainUserData(null));
  dispatch(setUserOffChainId(null));
  dispatch(setUserRole(EUserRoles.USER));
  dispatch(setUserImg(EMPTY_STRING));
  dispatch(setUserDisplayName(EMPTY_STRING));
  dispatch(setUserProvider(EProviders.NEAR));
  dispatch(setOffChainUserProjects({ subProject: null, project: null }));
};

export const authWithMetamask = () => async (dispatch: AppDispatch) => {
  const address = await web3Service.getMetamaskAddress();
  if (!address) return;
  const nonce = await authAPI.fetchMetamaskNonce(address);
  const signed = await web3Service.signMessage(nonce, address);

  const { accessToken, refreshToken } = await authAPI.loginWithMetamask(
    address,
    signed
  );

  if (accessToken && refreshToken) {
    setItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);
    setItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN, refreshToken);
  }
  const accessTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
  const refreshTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN);
  if (accessTokenStorage && refreshTokenStorage) {
    dispatch(getUserData());
    dispatch(getUserProjects());
  }
};

export const authWithMetamaskSDK = () => async (dispatch: AppDispatch) => {
  try {
    if (!window.ethereum) {
      await web3Service.initMetamaskSDK();
    }
    const ethereum = window.ethereum as SDKProvider;
    const addresses = await ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    });
    const address: string = (addresses as any)?.[0] || '';
    if (!address) return;
    const nonce = await authAPI.fetchMetamaskNonce(address);
    const message = web3Service.prepareMessage(nonce);

    const toast = ToastLink(
      '',
      'Confirm your action in Metamask',
      ToastType.Success
    );
    const signed = await ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });

    const { accessToken, refreshToken } = await authAPI.loginWithMetamask(
      address,
      signed as string
    );

    if (accessToken && refreshToken) {
      setItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);
      setItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN, refreshToken);
    }
    const accessTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
    const refreshTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN);
    if (accessTokenStorage && refreshTokenStorage) {
      dispatch(getUserData());
      dispatch(getUserProjects());
    }
  } catch (error) {
    const toast = ToastLink(
      '',
      'Something when wrong. Please, try again',
      ToastType.Error
    );
  }
};

export const authWithNear =
  (accountId: string) => async (dispatch: AppDispatch) => {
    const keystore = await new keyStores.BrowserLocalStorageKeyStore().getKey(
      networkId,
      accountId
    );

    const nonce = await authAPI
      .fetchMetamaskNonce(accountId)
      .catch(() => console.log('Error when login'));
    if (!nonce) return;

    const uint8Array = new TextEncoder().encode(nonce);
    const { signature } = keystore.sign(uint8Array);

    const publicKey = keystore.getPublicKey();
    const message = Buffer.from(signature).toString('base64');

    const nonceHash = new TextEncoder().encode(nonce);
    const signature8 = Buffer.from(message, 'base64');
    const isValid = publicKey.verify(nonceHash, signature8);

    const res = await authAPI
      .loginWithNear(accountId, message, publicKey.toString())
      .catch(() => console.log('Error when login'));

    if (res?.accessToken && res?.refreshToken) {
      setItem(ESTORAGE_KEYS.NEAR_ACCESS_TOKEN, res.accessToken);
      setItem(ESTORAGE_KEYS.NEAR_REFRESH_TOKEN, res.refreshToken);
      userAPI.fetchUserData().then((user) => {
        dispatch(setUserOffChainId(user.id));
        dispatch(setUserRole(user.role));
        dispatch(setUserImg(user.picture));
        dispatch(setUserDisplayName(user.display_name));
        dispatch(setUserProvider(user.provider as EProviders));
      });
    }
  };

export const updateUserDisplayName =
  (displayName: string) => (dispath: AppDispatch) =>
    userAPI
      .fetchChangeDisplayName(displayName)
      .then(({ display_name }) => dispath(setUserDisplayName(display_name)));
