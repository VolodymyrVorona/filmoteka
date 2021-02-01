import film from '../templates/trendMovieTemplate.hbs';

import refs from './refs';

import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
} from './commonFunction';

// плагин спинера
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';

// запуск спиннера
var spinner = new Spinner(opts).spin(refs.targetSpinner);

// Запрос на тренды

fetch(
  'https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3',
)
  .then(response => response.json())
  .then(data => data.results)
  .then(movies => {
    // изменяет  жанр  и дату
    changeGenreData(movies);

    // в зависимости от viewport оствляет необходимое количество элементов
    let newFilmCount = changeNumberOfItem(movies);

    // делаем разметку (вставляем шаблон)
    const markup = film(newFilmCount);
    refs.movies.insertAdjacentHTML('beforeend', markup);

    // останавливает спиннер
    spinner.stop();

    storageModal();
  });
