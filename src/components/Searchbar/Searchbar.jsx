import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    const normQuery = e.target.query.value.toLowerCase().trim();
    const { onSearch } = this.props;
    onSearch(normQuery);
    if (!normQuery) {
      alert('Please, enter your search query.');
      return;
    }
    this.setState({ value: normQuery });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ value: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
