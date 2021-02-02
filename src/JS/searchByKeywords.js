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

  const inputValue = form.elements.query.value;

  refs.movieRef.innerHTML = '';
  form.reset();

  // ------------показывает  предупреждение при вводе рандомного набора символов---------------

  fetchMovies(inputValue)
    .then(data => {
      spinner.stop();
      if (data.errors) {
        // якщо не ввели дані в input, отримуємо помилку, виводимо її текст
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent = data.errors;
      } else if (data.length === 0) {
        // якщо ввели неіснуюче слово, від бекенду отримужмо порожній масив. Виводимо текст із макету
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent =
          'Search result not successful. Enter the correct movie name';
      } else {
        // якщо отримали коректні результати, здійснюємо рендер розмітки
        refs.warningString.classList.add('is-hidden');
        // refs.movieRef.innerHTML = '';
        searchResultsMarkup(data);
      }
    })
    .catch(error => console.log(error));
});
