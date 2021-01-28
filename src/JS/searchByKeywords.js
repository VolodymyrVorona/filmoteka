import refs from './refs';

import fetchMovies from './fetchByKeyWords';
import searchResultsMarkup from './searchResultsMarkup';

// --------слушатель на форму поиска-------
refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  const inputValue = form.elements.query.value;

  refs.movieRef.innerHTML = '';
  form.reset();

  fetchMovies(inputValue).then(searchResultsMarkup);
});
