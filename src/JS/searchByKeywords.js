import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import refs from './refs';

import fetchMovies from './fetchByKeyWords';
import searchResultsMarkup from './searchResultsMarkup';
import keyWordPagination from './keyWordPagination';

// плагин спинера
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';

// --------слушатель на форму поиска-------
refs.linkInput.addEventListener('submit', event => {
  event.preventDefault();
  // refs.divPagination.innerHTML = '';
  // запуск спиннера
  const spinner = new Spinner(opts).spin(refs.targetSpinner);
  const form = event.currentTarget;

  const inputValue = form.elements.query.value;

  form.reset();

  // ------------показывает  предупреждение при вводе рандомного набора символов---------------

  fetchMovies(inputValue)
    .then(data => {
      spinner.stop();
      if (data.errors) {
        // якщо не ввели дані в input, отримуємо помилку, виводимо її текст
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent = data.errors;
      } else if (data.results.length === 0) {
        // якщо ввели неіснуюче слово, від бекенду отримужмо порожній масив. Виводимо текст із макету
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent =
          'Search result not successful. Enter correct movie name';
      } else {
        // якщо отримали коректні результати, здійснюємо рендер розмітки
        refs.warningString.classList.add('is-hidden');
        refs.movieRef.innerHTML = '';
        searchResultsMarkup(data.results);
      }

      return data;
    })
    .then(data => keyWordPagination(data, inputValue))
    .catch(error => console.log(error))
    .finally(() => {
      spinner.stop();
      refs.searchForm.addEventListener('blur', () => {
        refs.warningString.textContent = '';
      });
    });
});
