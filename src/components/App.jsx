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
        const resp = await searchImages(value, page);

        const { totalHits, hits } = resp;
        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        const totalPages = Math.ceil(totalHits / 12);
        if (!hits.length) {
          toast.warning(
            'Sorry, but nothing was found for your request. Try again, please'
          );
          return;
        }
        
        if (page === 1) {
          toast.success(
            `Congratulations, ${totalHits} image(s) have been found`
          );
        }
        if (page === totalPages) {
          toast.info('All image(s) for this request are already available');
        }
        
        setImages(prevImages => [...prevImages, ...data]);
        setShowButton(images.length < totalHits);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    searchImageHandler();
  }, [page, value, images]);

  const handlerSearch = value => {
    if (value !== "") {
      setValue(value);
      setPage(1);
      setImages([]);
    }
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
