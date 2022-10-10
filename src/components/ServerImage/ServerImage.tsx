import React from 'react';
import PlaceholderImage from '@public/static/images/placeholder.jpg';
import { useImageQuery } from '@src/api/images.api';
import { Image } from '@src/components/styled';

type ServerImageProps = {
  imageId: string | null;
};

const ServerImage: React.FC<ServerImageProps> = React.memo(({ imageId }) => {
  const { data, isLoading } = useImageQuery(imageId, {
    staleTime: Infinity,
  });

  return (
    <Image
      width="100%"
      height="100%"
      src={
        !isLoading && data?.data
          ? URL.createObjectURL(data.data)
          : PlaceholderImage
      }
    />
  );
});

ServerImage.displayName = 'ServerImage';
export default ServerImage;
