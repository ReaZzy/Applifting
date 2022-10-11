import { useQuery } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';
import { getArticleMoreInfoQueryKey } from '@src/api/articles.api';
import { queryClient } from '@src/api/queryClient';
import { ImagesAPIResponse } from '@src/types/images.api.types';
import { appAxios } from '@src/utils/axios.utils';
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

export const deleteImage = async (imageId: string, articleId?: string) => {
  try {
    const res = await appAxios.delete<void>(`/images/${imageId}`);
    await queryClient.invalidateQueries(getImageQueryKey(imageId));
    if (articleId) {
      await queryClient.invalidateQueries(
        getArticleMoreInfoQueryKey(articleId),
      );
    }
    return res;
  } catch (e) {
    console.warn(e);
  }
};

export const useImageQuery = (
  imageId: string | null,
  options: Omit<
    UseQueryOptions<AxiosResponse<Blob>, AxiosError>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery<AxiosResponse<Blob>, AxiosError>(
    getImageQueryKey(imageId!),
    () => getImage(imageId!),
    { ...options, enabled: !!imageId },
  );
