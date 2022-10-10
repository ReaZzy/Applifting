import { useQuery } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { ImagesAPIResponse } from '@src/types/images.api.types';
import { appAxios } from '@src/utils/axios';
import { AxiosError, AxiosResponse } from 'axios';

export const createImageRequest = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return appAxios.post<ImagesAPIResponse>('/images', formData);
};

export const getImageQueryKey = (imageId?: string) => ['image', imageId];

export const getImage = (imageId: string) =>
  appAxios.get<Blob>(`/images/${imageId}`, {
    responseType: 'blob',
  });

export const deleteImage = (imageId: string) =>
  appAxios.delete<void>(`/images/${imageId}`);

export const useImageQuery = (
  imageId: string,
  options: Omit<
    UseQueryOptions<AxiosResponse<Blob>, AxiosError>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<AxiosResponse<Blob>, AxiosError>(
    getImageQueryKey(imageId),
    () => {
      return appAxios.get<Blob>(`/images/${imageId}`, {
        responseType: 'blob',
      });
    },
    options,
  );
