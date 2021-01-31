import film from '../templates/trendMovieTemplate.hbs';
import modalMovieTemplate from '../templates/fullDescriptionMovie.hbs';

import getMovieFromSaved from './getMovieFromSaved';
import addMovieToSaved from './addMovieToSaved';

import refs from './refs';

import { changeGenreData, changeNumberOfItem } from './commonFunction';

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
            const addToQueueBtnRef = document.querySelector('.js-add-to-queue');

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
            addMovieToSaved(movie, queueMoviesList, 'queue', addToQueueBtnRef);

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
