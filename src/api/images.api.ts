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

// NOTE FOR REVIEW: There are a lot of issues on BE, that needs to be resolved
// on FE. For instance: image deleting, in my opinion it's a BE part
export const deleteImage = async (imageId: string, articleId?: string) => {
  const res = await appAxios.delete<void>(`/images/${imageId}`);
  await queryClient.invalidateQueries(getImageQueryKey(imageId));
  if (articleId) {
    await queryClient.invalidateQueries(getArticleMoreInfoQueryKey(articleId));
  }
  return res;
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
