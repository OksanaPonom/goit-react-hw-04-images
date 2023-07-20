import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ largeUrl, url, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        className={css['ImageGalleryItem-image']}
        src={url}
        alt={tags}
      />
      {showModal && <Modal onClose={toggleModal} src={largeUrl} alt={tags} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
};
