import Pagination from 'tui-pagination'; // плагін пагінації
import 'tui-pagination/dist/tui-pagination.min.css';
import refs from '../../JS/refs';
import { Spinner } from 'spin.js'; // плагін спінера
import opts from '../options/spinner'; // імпорт опцій спінера
import setItemsPerPage from '../transformData/setItemsPerPage';
import { searchResultsMarkup } from '../render/searchResultsMarkup';
import getMovies from '../getMovies';
import createPagination from './createPagination';

function keyWordPagination({ results, total_results }, searchQuery) {
  const { visiblePaginationPages } = setItemsPerPage(results);
  createPagination(total_results, 20, visiblePaginationPages, onPagination);

  function onPagination(event) {
    const spinner = new Spinner(opts).spin(refs.targetSpinner);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=bf08c0c07642287cbabe383c02818eb3&language=en-US&page=${event.page}&include_adult=false&query=${searchQuery}`;

    getMovies(url, event.page)
      .then(({ results }) => {
        refs.moviesContainer.innerHTML = '';
        searchResultsMarkup(results);
      })
      .finally(() => {
        spinner.stop();
      });
  }

  return results;
}

export default keyWordPagination;
