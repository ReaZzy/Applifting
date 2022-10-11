import axios from 'axios';

export const appAxios = axios.create({
  baseURL: process.env.API_HOST || 'https://fullstack.exercise.applifting.cz',
  headers: {
    ['X-API-KEY']: process.env.API_SECRET_KEY ?? '',
  },
});

export const shouldIgnoreInterception = (url?: string, _method = 'get') => {
  if (!url) return true;
  if (url.includes('/images') || url.includes('/comments')) {
    return true;
  }
};
