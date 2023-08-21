/* eslint-disable no-console */
import { API_ROUTES, BASE_URL } from './config';
import { fetchAPI, parseData } from './index';

export const fetchLoginWithGoogle = () => {
  // TODO: Fetch authorization using fetchAPI
  window.location.href = BASE_URL + API_ROUTES.authGoogle;
};

export const fetchMetamaskNonce = async (address: string) =>
  fetchAPI
    .get<string>(API_ROUTES.authWeb3Nonce + `?address=${address}`)
    .then(parseData)

export const loginWithMetamask = async (address: string, message: string) => 
  fetchAPI
    .post(API_ROUTES.authWeb3, { address, message })
    .then(parseData)

export const loginWithNear = async (address: string, message: string, publicKey: string) => 
  fetchAPI
    .post(API_ROUTES.authNear, { accountId: address, message, publicKey })
    .then(parseData)

export const fetchLoginWithTwitter = () => fetchAPI.post(API_ROUTES.authGoogle);

export const fetchLoginWithFacebook = () =>
  fetchAPI.post(API_ROUTES.authGoogle);

export const refreshToken = () =>
  fetchAPI.get(API_ROUTES.authRefresh).then(parseData);
