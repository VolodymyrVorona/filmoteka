// шаблон фильма
import film from '../templates/trendMovieTemplate.hbs';
import modalMovieTemplate from '../templates/fullDescriptionMovie.hbs';

import getMovieFromSaved from './getMovieFromSaved';
import addMovieToSaved from './addMovieToSaved';
// плагин пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import refs from './refs';
// плагин спинера
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';
// импорт общих функций
import { changeGenreData, changeNumberOfItem } from './commonFunction';

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

      // вставила модалку !!!  потом будет оптимизация кода

      // берем элементы из DOM (доступны после вставки разметки )
      let filmItemRef = document.querySelectorAll('.trend-film-item');
      const filmCardRef = document.querySelector('.film-card');

      filmItemRef.forEach(data => {
        // берем id фильма
        let filmID = data.dataset.film;
        // Вешаем на картинку слушателя, чтобі открывалась модалка
        data.addEventListener('click', modalHandler);

        function modalHandler(event) {
          event.preventDefault();

          fetch(
            `https://api.themoviedb.org/3/movie/${filmID}?api_key=bf08c0c07642287cbabe383c02818eb3`,
          )
            .then(response => response.json())
            .then(movie => {
              const markup2 = modalMovieTemplate(movie);
              filmCardRef.insertAdjacentHTML('beforeend', markup2);

              refs.movieModal.classList.remove('is-hidden');

              // додаємо роботу із localStorage
              // беремо посилання на кнопки
              const addToWatchedBtnRef = document.querySelector(
                '.js-add-to-watched',
              );
              const addToQueueBtnRef = document.querySelector(
                '.js-add-to-queue',
              );

              // отримуємо масиви фільмів "Watched" та "Queue" із localStorage
              let watchedMoviesList = getMovieFromSaved('watched');
              let queueMoviesList = getMovieFromSaved('queue');

              // додаємо фільм у localStorage
              addMovieToSaved(
                movie,
                watchedMoviesList,
                'watched',
                addToWatchedBtnRef,
              );
              addMovieToSaved(
                movie,
                queueMoviesList,
                'queue',
                addToQueueBtnRef,
              );

              function closeModal() {
                refs.movieModal.classList.add('is-hidden');
                window.removeEventListener('keydown', pressEscape);
                filmCardRef.innerHTML = '';
              }

              const closeBtnRef = document.querySelector('.close-button');
              closeBtnRef.addEventListener('click', closeModal);
              const backdropRef = document.querySelector('.backdrop');
              backdropRef.addEventListener('click', closeModal);

              const pressEscape = event => {
                if (event.code === 'Escape') {
                  closeModal();
                }
              };
              window.addEventListener('keydown', pressEscape);
            });
        }
      });
    });
});
