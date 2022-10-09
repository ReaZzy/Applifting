import { ImagesAPIResponse } from '@src/types/images.api.types';
import { appAxios } from '@src/utils/axios';

export const createImageRequest = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return appAxios.post<ImagesAPIResponse>('/images', formData);
};
