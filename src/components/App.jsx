import React, { useState } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import Loader from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

const API_KEY = '44190966-0aa6bbea47325323a5628291c';
const perPage = 40;

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = (searchQuery, pageNumber = 1) => {
    setLoading(true);

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setImages(prevImages =>
            pageNumber === 1 ? data.hits : [...prevImages, ...data.hits]
          );
          setTotalHits(data.totalHits);
          if (pageNumber === 1) {
            Notiflix.Notify.success(
              `Hooray! We found ${data.totalHits} images.`
            );
          }
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        Notiflix.Notify.failure(
          'Something went wrong. Please try again later.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      <Button onClick={loadMore} show={images.length < totalHits} />
      <Modal images={images} />
    </div>
  );
};
