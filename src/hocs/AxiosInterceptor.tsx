import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH_ERROR_PAGE } from '@src/router/paths';
import globalAxios from 'axios';

interface AxiosInterceptorProps {
  children: React.ReactElement;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    globalAxios.interceptors.request.use(
      (config) => {
        if (config && config.headers) {
          config.headers.Authorization = `AUTH`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    globalAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const { response } = error;

        if (error.response) {
          toast('Login session expired', { type: 'error' });
          //TODO: LOGOUT
          return Promise.reject(error);
        }

        if (response?.status === 500) {
          toast('There has been an error', {
            type: 'error',
          });
        }

        if (response?.status === 404) {
          navigate(PATH_ERROR_PAGE.page404);
        }

        return Promise.reject(error);
      },
    );
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
