import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ToastType } from 'services/toast/constants';
import { ToastLink } from 'shared/components/toast-link/ToastLink';
import { EMPTY_STRING } from 'shared/constants';
import { getItem, ESTORAGE_KEYS, setItem } from 'shared/utils/storage';

import { refreshToken } from './authAPI';
import { BASE_URL } from './config';

const config: AxiosRequestConfig<{ NEAR_AUTH: boolean }> = {
  baseURL: BASE_URL,
};

export const fetchAPI = axios.create(config);

fetchAPI.interceptors.request.use(
  async (config) => {
    const isNearAuthRoute = !!config.headers?.WITH_NEAR_AUTH;

    let token = null;
    if (isNearAuthRoute) {
      token = getItem(ESTORAGE_KEYS.NEAR_ACCESS_TOKEN);
      if (token) {
        config.headers['Authorization'] = ` bearer ${token}`;
        return config;
      }
    }

    token = getItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
    if (token) config.headers['Authorization'] = ` bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

fetchAPI.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await refreshToken();
      const accessToken = resp.response.accessToken;
      setItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);

      fetchAPI.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      return fetchAPI(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const parseData = <Data, Config>(resp: AxiosResponse<Data, Config>) =>
  resp.data;

export const parseSuccessSubmission =
  (successMsg?: string) =>
  <Data, Config>(resp: AxiosResponse<Data, Config>) => {
    if (successMsg) ToastLink(EMPTY_STRING, successMsg, ToastType.Success);
    return resp.data;
  };

export const parseErrorSubmission = (errorMsg?: string) => (er: unknown) => {
  if (errorMsg) ToastLink(EMPTY_STRING, errorMsg, ToastType.Error);
  return Promise.reject(er);
};
