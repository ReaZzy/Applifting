import React, { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH_AUTH, PATH_ERROR_PAGE } from '@src/router/paths';
import {
  accessTokenSelector,
  setAccessToken,
} from '@src/store/slices/auth.slice';
import { useTypedDispatch, useTypedSelector } from '@src/store/store.hooks';
import { getTokenFromLocalStorage } from '@src/utils/auth.utils';
import { appAxios, shouldIgnoreInterception } from '@src/utils/axios.utils';
import axios, { AxiosError } from 'axios';

interface AxiosInterceptorProps {
  children: React.ReactElement;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const accessToken = useTypedSelector(accessTokenSelector);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useLayoutEffect(() => {
    appAxios.interceptors.request.use(
      (config) => {
        const token = accessToken ?? getTokenFromLocalStorage();
        if (config && config.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    appAxios.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (!axios.isAxiosError(error) || !error.response)
          return toast('There has been an error', {
            type: 'error',
            toastId: 'axios-error',
          });
        const { response } = error;
        if (response.status === 403 || response?.data.code === 'UNAUTHORIZED') {
          toast('Unauthorized', {
            type: 'error',
            toastId: 'unauthorized-error',
          });
          dispatch(setAccessToken(null));
          navigate(PATH_AUTH.login);
          return Promise.reject(error);
        }

        if ([500, 415].includes(response?.status)) {
          toast('There has been an error', {
            type: 'error',
            toastId: 'server-error',
          });
        }

        if (
          !shouldIgnoreInterception(
            response?.config?.url,
            response?.config?.method,
          ) &&
          response?.status === 404
        ) {
          toast(`Page ${location.pathname} was not found`, {
            type: 'error',
            toastId: 'page-not-found-error',
          });
          navigate(PATH_ERROR_PAGE.page404, {
            state: { ...location.state, from: location.pathname },
          });
        }

        return Promise.reject(error);
      },
    );
  }, [accessToken, dispatch, location.pathname, location.state, navigate]);

  return children;
};

export default AxiosInterceptor;
