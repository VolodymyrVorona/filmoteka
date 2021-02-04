import film from '../templates/trendMovieTemplate.hbs';
import refs from './refs';
import { Spinner } from 'spin.js'; // плагін спінера
import opts from './spinner'; // імпорт опцій спінера
import setItemsPerPage from './setItemsPerPage';
import { changeGenreData, storageModal } from './commonFunction';

function mainPageRender() {
  const spinner = new Spinner(opts).spin(refs.targetSpinner); // запуск спінера

  // Запит на тренди
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3',
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(movies => {
      refs.movies.innerHTML = '';
      changeGenreData(movies); // змінює жанр та дату

      // залежно від ширини viewport залишає необхідну кількість елементів
      const { newFilmsData } = setItemsPerPage(movies);
      console.log('newFilmsData', newFilmsData);
      const markup = film(newFilmsData); // створення розмітки по шаблону
      refs.movies.insertAdjacentHTML('beforeend', markup);

      spinner.stop(); // зупиняє спінер
      storageModal();
    });
}
export default mainPageRender;
