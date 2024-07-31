import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const PhotoSwipeComponent = ({ images }) => {
  return (
    <Gallery>
      {images.map((image, index) => (
        <Item
          key={index}
          original={image.src}
          thumbnail={image.src}
          width={750}
          height={450}
        >
          {({ ref, open }) => (
            <img ref={ref} onClick={open} src={image.src} alt={image.alt} />
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default PhotoSwipeComponent;
