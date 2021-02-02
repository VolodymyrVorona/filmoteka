import film from '../templates/trendMovieTemplate.hbs';
import refs from './refs';

import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
} from './commonFunction';

// --------выводим результат поиска  по ключевым словам------
const searchResultsMarkup = results => {
  // изменяет  жанр  и дату
  changeGenreData(results);

  // в зависимости от viewport оствляет необходимое количество элементов
  let newFilmCount = changeNumberOfItem(results);

  const markup = film(newFilmCount);
  refs.movies.insertAdjacentHTML('beforeend', markup);

  storageModal();
};

export default searchResultsMarkup;
