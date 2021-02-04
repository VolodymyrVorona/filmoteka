// плагін пагінації
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import refs from './refs';

function createPagination(totalResults, elementsOnPage, visiblePages, cb) {
  const options = {
    totalItems: totalResults,
    itemsPerPage: elementsOnPage,
    visiblePages: visiblePages,
  };
  const pagination = new Pagination(refs.divPagination, options);
  pagination.on('afterMove', cb);
}

export default createPagination;
