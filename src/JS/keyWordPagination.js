// шаблон фильма
import film from '../templates/trendMovieTemplate.hbs';
// плагин пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import fetchMovies from './fetchByKeyWords';
import refs from './refs';
// плагин спинера
import { Spinner } from 'spin.js';
// импорт опций спинера
import opts from './spinner';
import setItemsPerPage from './setItemsPerPage';
// импорт общих функций
import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
} from './commonFunction';

export default function createPagination(
  { results, total_results },
  searchQuery,
) {
  const container = document.getElementById('tui-pagination-container');
  const { visiblePaginationPages } = setItemsPerPage(results);

  const pagination = new Pagination(container, {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: visiblePaginationPages,
  });

  pagination.on('afterMove', evt => {
    const spinner = new Spinner(opts).spin(refs.targetSpinner);

    fetchMovies(searchQuery, evt.page)
      .then(result => {
        refs.movies.innerHTML = '';
        const { newFilmsData } = setItemsPerPage(result.results);
        changeGenreData(newFilmsData);

        const markup = film(newFilmsData);
        refs.movies.insertAdjacentHTML('beforeend', markup);

        storageModal();
        return newFilmsData;
      })
      .finally(() => {
        spinner.stop();
      });
  });

  return results;
}
