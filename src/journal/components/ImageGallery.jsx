import { memo } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = memo(({ images }) => (
  <ImageList cols={4}>
    {images?.map(img => (
      <ImageListItem key={img}>
        <img src={img} srcSet={img} alt={img} loading="lazy" />
      </ImageListItem>
    ))}
  </ImageList>
));
