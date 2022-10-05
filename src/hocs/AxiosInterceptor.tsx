import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getToken, setAccessToken } from '@src/utils/auth.utils';
import { appAxios } from '@src/utils/axios';
import axios, { AxiosError } from 'axios';

interface AxiosInterceptorProps {
  children: React.ReactElement;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  useEffect(() => {
    appAxios.interceptors.request.use(
      (config) => {
        const token = getToken();
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
          toast('Login session expired', { type: 'error' });
          setAccessToken(null);
          return Promise.reject(error);
        }

        if (response?.status === 500) {
          toast('There has been an error', {
            type: 'error',
          });
        }

        return Promise.reject(error);
      },
    );
  }, []);

  return children;
};

export default AxiosInterceptor;
