import React from 'react';
import SimpleLightbox from 'simplelightbox';

export const Modal = ({ images }) => {
  React.useEffect(() => {
    const lightbox = new SimpleLightbox('.gallery a', {
      /* options */
    });
    return () => {
      lightbox.destroy();
    };
  }, [images]);

  return null;
};
