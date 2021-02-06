import film from '../../templates/trendMovieTemplate.hbs';
import refs from '../refs';
import setItemsPerPage from '../transformData/setItemsPerPage';
import changeGenre from '../transformData/changeGenre';
import changeData from '../transformData/changeData';

function searchResultsMarkup(results) {
  changeGenre(results);
  changeData(results);

  const { newFilmsData } = setItemsPerPage(results);
  renderMarkup(newFilmsData, film, refs.moviesContainer);
}

function renderMarkup(data, templat, domElementLink) {
  const markup = templat(data);
  domElementLink.insertAdjacentHTML('beforeend', markup);
}

export { renderMarkup, searchResultsMarkup };
