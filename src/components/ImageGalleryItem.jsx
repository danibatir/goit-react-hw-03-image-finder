import React from 'react';

export const ImageGalleryItem = ({ image }) => {
  return (
    <a href={image.largeImageURL} className="photo-card">
      <img src={image.webformatURL} alt={image.tags} loading="lazy" />
      <div className="info">
        <p className="info-item">
          <b>Likes</b> {image.likes}
        </p>
        <p className="info-item">
          <b>Views</b> {image.views}
        </p>
        <p className="info-item">
          <b>Comments</b> {image.comments}
        </p>
        <p className="info-item">
          <b>Downloads</b> {image.downloads}
        </p>
      </div>
    </a>
  );
};
