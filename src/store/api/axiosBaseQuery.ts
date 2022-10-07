import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { appAxios } from '@src/utils/axios';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await appAxios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      if (axios.isAxiosError(axiosError)) {
        return {
          error: {
            status: axiosError.response?.status,
            data: axiosError.response?.data || axiosError.message,
          },
        };
      }
      return {
        error: {
          status: 500,
          data: 'Something went wrong',
        },
      };
    }
  };
