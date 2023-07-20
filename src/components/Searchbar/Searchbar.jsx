import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export function Searchbar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normQuery = e.target.query.value.toLowerCase().trim();

    if (!normQuery) {
      toast.warning('Please, enter your search query.');
      return;
    }
    onSearch(normQuery);
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>
        <input
          name="query"
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
