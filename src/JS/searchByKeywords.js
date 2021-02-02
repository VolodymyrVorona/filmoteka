import refs from './refs';

import fetchMovies from './fetchByKeyWords';
import searchResultsMarkup from './searchResultsMarkup';

// плагин спинера
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';

// --------слушатель на форму поиска-------
refs.linkInput.addEventListener('submit', event => {
  event.preventDefault();
  // запуск спиннера
  var spinner = new Spinner(opts).spin(refs.targetSpinner);
  const form = event.currentTarget;
  console.log(form.elements);
  const inputValue = form.elements.query.value;
  console.log(inputValue);
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
    spinner.stop();
  });
});
