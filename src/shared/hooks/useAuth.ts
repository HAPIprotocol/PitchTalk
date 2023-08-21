import { useEffect } from 'react';

import { useLocation, useNavigate } from 'services/router';
import { setItem, ESTORAGE_KEYS, getItem } from 'shared/utils/storage';
import { getUserData, getUserProjects } from 'store/thunks/user';

import { useAppDispatch } from './redux-hooks';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = location.search;
    const queryParams = new URLSearchParams(query);
    const accessToken = queryParams?.get(ACCESS_TOKEN);
    const refreshToken = queryParams?.get(REFRESH_TOKEN);
    if (accessToken && refreshToken) {
      setItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN, accessToken);
      setItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN, refreshToken);

      queryParams.delete(ACCESS_TOKEN);
      queryParams.delete(REFRESH_TOKEN);
      navigate({ search: queryParams.toString() });
    }
    const accessTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_ACCESS_TOKEN);
    const refreshTokenStorage = getItem(ESTORAGE_KEYS.GOOGLE_REFRESH_TOKEN);
    if (accessTokenStorage && refreshTokenStorage) {
      dispatch(getUserData());
      dispatch(getUserProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
