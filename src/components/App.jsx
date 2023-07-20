import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages } from 'services/searchImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export function App() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) return;

    async function searchImageHandler() {
      try {
        setIsLoading(true);
        const response = await searchImages(value, page);
        return response.data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    async function getImages() {
      const resp = await searchImageHandler();

      const data = resp.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        }
      );
      const totalHits = resp.totalHits;
      const totalPages = Math.ceil(totalHits / 12);
      if (!resp.hits.length) {
        toast.warning(
          'Sorry, but nothing was foundfor your request. Try again, please'
        );
      }
      if (page === 1 && resp.hits.length) {
        toast.success(`Congrtulations, ${totalHits} image(s) have been found`);
      }
      if (page === totalPages) {
        toast.info('All image(s) for this request are already available');
      }
      setImages(images => [...images, ...data]);
      setShowButton(page < totalPages);
    }
    getImages();
  }, [page, value]);

  const handlerSearch = value => {
    setValue(value);
    setPage(1);
    setImages([]);
    // this.setState({ value, page: 1, images: [] });
  };

  return (
    <div className={css.App}>
      <Searchbar onSearch={handlerSearch} />
      <ImageGallery images={images} />
      {showButton && <Button onClick={() => setPage(page => page + 1)} />}
      {isLoading && <Loader />}
      <ToastContainer theme="dark " autoClose={3000} position="top-right" />
    </div>
  );
}
