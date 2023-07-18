import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { url, tags, largeUrl } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={this.toggleModal}
          className={css['ImageGalleryItem-image']}
          src={url}
          alt={tags}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} src={largeUrl} alt={tags} />
        )}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};
