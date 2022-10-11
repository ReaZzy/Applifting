import React from 'react';
import PlaceholderImage from '@public/static/images/placeholder.jpg';
import { useImageQuery } from '@src/api/images.api';
import { Image } from '@src/components/styled';

type ServerImageProps = {
  imageId: string | null;
  maxHeight?: string;
  maxWidth?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

const ServerImage: React.FC<ServerImageProps> = React.memo(
  ({ imageId, ...props }) => {
    const { data, isLoading } = useImageQuery(imageId, {
      staleTime: Infinity,
    });

    return (
      <Image
        width="100%"
        height="100%"
        objectFit="cover"
        src={
          !isLoading && data?.data
            ? URL.createObjectURL(data.data)
            : PlaceholderImage
        }
        {...props}
      />
    );
  },
);

ServerImage.displayName = 'ServerImage';
export default ServerImage;
