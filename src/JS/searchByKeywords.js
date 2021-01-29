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

  // ------------показывает  предупреждение при вводе рандомного набора символов---------------
  fetchMovies(inputValue).then(data => {
    if (data.length === 0) {
      refs.warningString.classList.remove('is-hidden');
      return;
    }
    refs.warningString.classList.add('is-hidden');
    refs.movieRef.innerHTML = '';
    searchResultsMarkup(data);
  });
  // fetchMovies(inputValue).then(searchResultsMarkup);
});
