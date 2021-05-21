import Pagination from 'tui-pagination'; // плагін пагінації
import 'tui-pagination/dist/tui-pagination.min.css';
import refs from '../../JS/refs';

function createPagination(totalResults, elementsOnPage, visiblePages, cb) {
  const options = {
    totalItems: totalResults,
    itemsPerPage: elementsOnPage,
    visiblePages: visiblePages,
    centerAlign: true,
  };
  const pagination = new Pagination(refs.divPagination, options);
  pagination.on('afterMove', cb);
}

export default createPagination;
