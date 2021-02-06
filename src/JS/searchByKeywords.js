import refs from './refs';
import getMovies from './getMovies';
import { searchResultsMarkup } from './render/searchResultsMarkup';
import keyWordPagination from './pagination/keyWordPagination';
import { Spinner } from 'spin.js'; // плагін спінера
import opts from './options/spinner'; // імпорт опцій спінера

// слухач події на форму пошуку
refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const spinner = new Spinner(opts).spin(refs.targetSpinner); // запуск спінера
  const form = event.currentTarget;
  const inputValue = form.elements.query.value;

  form.reset();

  let page;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=bf08c0c07642287cbabe383c02818eb3&language=en-US&page=${page}&include_adult=false&query=${inputValue}`;

  getMovies(url, page)
    .then(data => {
      spinner.stop();
      if (data.errors) {
        // якщо не ввели дані в input, отримуємо помилку, виводимо її текст
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent = data.errors;
      } else if (!data.results.length) {
        // якщо ввели неіснуюче слово, від бекенду отримужмо порожній масив. Виводимо текст із макету
        refs.warningString.classList.remove('is-hidden');
        refs.warningString.textContent =
          'Search result not successful. Enter correct movie name';
      } else {
        // якщо отримали коректні результати, здійснюємо рендер розмітки
        refs.warningString.classList.add('is-hidden');
        refs.moviesContainer.innerHTML = '';
        searchResultsMarkup(data.results);
        keyWordPagination(data, inputValue);
      }

      return data;
    })
    .catch(error => console.log(error))
    .finally(() => {
      spinner.stop();
      refs.inputField.addEventListener('blur', () => {
        refs.warningString.textContent = '';
      });
    });
});
