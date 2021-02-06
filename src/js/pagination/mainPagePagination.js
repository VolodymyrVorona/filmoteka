import setItemsPerPage from '../transformData/setItemsPerPage';
import createPagination from './createPagination';
import { movieForHomePage } from '../render/mainPageRender';

const { visiblePaginationPages } = setItemsPerPage();
createPagination(20000, 20, visiblePaginationPages, onPagination);

function onPagination(eventData) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3&page=${eventData.page}`;

  movieForHomePage(url);
}

export default onPagination;
