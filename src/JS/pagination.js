// шаблон фильма
import film from '../templates/trendMovieTemplate.hbs';
// плагин пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import refs from './refs';
// плагин спинера
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';
// импорт общих функций
import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
} from './commonFunction';

// // разметка пагинации
var container = document.getElementById('tui-pagination-container');

// // разметка кнопок для пагинации в зависимости от ширины дисплея.
let setVisiblePage = 0;
if (document.documentElement.clientWidth < 768) {
  setVisiblePage = 4;
} else {
  setVisiblePage = 8;
}
// // свойства
var pagination = new Pagination(container, {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: setVisiblePage,
});

// при клике на номер страницы - рендерится разметка
pagination.on('afterMove', function (eventData) {
  // запуск спиннера
  var spinner = new Spinner(opts).spin(refs.targetSpinner);
  const apiKey = 'bf08c0c07642287cbabe383c02818eb3';
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${eventData.page}`,
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(movies => {
      refs.movies.innerHTML = '';

      // изменяет  жанр  и дату
      changeGenreData(movies);

      // в зависимости от viewport оствляет необходимое количество элементов
      let newFilmCount = changeNumberOfItem(movies);

      const markup = film(newFilmCount);
      refs.movies.insertAdjacentHTML('beforeend', markup);

      spinner.stop();
      storageModal();
    });
});
