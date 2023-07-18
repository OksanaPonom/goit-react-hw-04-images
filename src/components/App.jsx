import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages } from 'services/searchImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    showButton: false,
    isLoading: false,
  };
  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    const { value: prevValue, page: prevPage } = prevState;
    if (page !== prevPage || value !== prevValue) {
      this.getImages();
    }
  }

  async searchImageHandler() {
    const { value, page } = this.state;
    try {
      this.setState(({ isLoading }) => ({ isLoading: true }));
      const response = await searchImages(value, page);
      return response.data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState(({ isLoading }) => ({ isLoading: false }));
    }
  }

  async getImages() {
    const resp = await this.searchImageHandler();

    const data = resp.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    });
    const totalHits = resp.totalHits;
    const totalPages = Math.ceil(totalHits / 12);
    if (!resp.hits.length) {
      toast.warning(
        'Sorry, but nothing was foundfor your request. Try again, please'
      );
    }
    if (this.state.page === 1 && resp.hits.length) {
      toast.success(`Congrtulations, ${totalHits} image(s) have been found`);
    }
    if (this.state.page === totalPages) {
      toast.info('All image(s) for this request are already available');
    }
    this.setState(({ images, showButton }) => ({
      images: [...images, ...data],
      showButton: this.state.page < totalPages,
    }));
  }

  onClickLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  handlerSearch = value => {
    this.setState({ value, page: 1, images: [] });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSearch={this.handlerSearch} />
        <ImageGallery images={this.state.images} />
        {this.state.showButton && <Button onClick={this.onClickLoadMore} />}
        {this.state.isLoading && <Loader />}
        <ToastContainer theme="dark " autoClose={3000} position="top-right" />
      </div>
    );
  }
}
