import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH_AUTH } from '@src/router/paths';
import {
  accessTokenSelector,
  setAccessToken,
} from '@src/store/slices/auth.slice';
import { useTypedDispatch, useTypedSelector } from '@src/store/store.hooks';
import { getTokenFromLocalStorage } from '@src/utils/auth.utils';
import { appAxios } from '@src/utils/axios';
import axios, { AxiosError } from 'axios';

interface AxiosInterceptorProps {
  children: React.ReactElement;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const accessToken = useTypedSelector(accessTokenSelector);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  useEffect(() => {
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
          });
        const { response } = error;
        if (response.status === 403 || response?.data.code === 'UNAUTHORIZED') {
          toast('Unauthorized', { type: 'error' });
          dispatch(setAccessToken(null));
          navigate(PATH_AUTH.login);
          return Promise.reject(error);
        }

        if ([500, 415].includes(response?.status)) {
          toast('There has been an error', {
            type: 'error',
          });
        }

        return Promise.reject(error);
      },
    );
  }, [accessToken, dispatch, navigate]);

  return children;
};

export default AxiosInterceptor;
