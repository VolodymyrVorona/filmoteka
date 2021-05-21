import film from '../../templates/trendMovieTemplate.hbs';
import refs from '../../JS/refs';
import { Spinner } from 'spin.js'; // плагін спінера
import opts from '../options/spinner'; // імпорт опцій спінера
import getMovies from '../getMovies';
import changeGenre from '../transformData/changeGenre';
import changeData from '../transformData/changeData';
import setItemsPerPage from '../transformData/setItemsPerPage';
import { renderMarkup } from './searchResultsMarkup';

function mainPageRender() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3`;
  movieForHomePage(url);
}

function movieForHomePage(url) {
  const spinner = new Spinner(opts).spin(refs.targetSpinner); // запуск спінера
  getMovies(url)
    .then(data => data.results)
    .then(movies => {
      refs.moviesContainer.innerHTML = '';
      changeGenre(movies); // змінює жанр
      changeData(movies); // змінює дату

      // залежно від ширини viewport залишає необхідну кількість елементів
      const { newFilmsData } = setItemsPerPage(movies);
      renderMarkup(newFilmsData, film, refs.moviesContainer); // створення розмітки по шаблону
      spinner.stop(); // зупиняє спінер
    });
}

mainPageRender();

export { mainPageRender, movieForHomePage };
