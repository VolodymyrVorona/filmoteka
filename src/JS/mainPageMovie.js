import film from '../templates/trendMovieTemplate.hbs';
import modalMovieTemplate from '../templates/fullDescriptionMovie.hbs';

import genreID from '../JS/genreID';

import getMovieFromSaved from './getMovieFromSaved';
import addMovieToSaved from './addMovieToSaved';

const movieModalRef = document.querySelector('.movie-modal');
const movieRef = document.querySelector('.trend-movie');

// Запрос на тренды
fetch(
  'https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3',
)
  .then(response => response.json())
  .then(data => data.results)
  .then(movies => {
    // изменяет  жанр  и дату
    movies.map(item => {
      let newGenre = [];
      item.genre_ids.map(id => {
        const found = genreID.find(item => item.id === id);
        newGenre.push(found.name);
      });
      item.release_date = item.release_date.slice(0, 4);
      if (newGenre.length >= 4) {
        const manyGenres = newGenre.slice(0, 3);
        item.genre_ids = manyGenres.join(', ');
      } else {
        item.genre_ids = newGenre.join(', ');
      }
      return item;
    });

    let newMovieList = [];
    if (document.documentElement.clientWidth < 768) {
      newMovieList = movies.slice(0, 4);
      // return  newMovieList
    }
    if (
      document.documentElement.clientWidth >= 768 &&
      document.documentElement.clientWidth < 1024
    ) {
      newMovieList = movies.slice(0, 8);
    }
    if (document.documentElement.clientWidth >= 1024) {
      newMovieList = movies.slice(0, 9);
    }

    // делаем разметку (вставляем шаблон)
    const markup = film(newMovieList);
    movieRef.insertAdjacentHTML('beforeend', markup);

    let filmItemRef = document.querySelectorAll('.trend-film-item');
    const filmCardRef = document.querySelector('.film-card');
    // let genreRef = document.querySelectorAll('.trend-film-genre');

    filmItemRef.forEach(data => {
      let filmID = data.dataset.film;
      // Вешаем на картинку слушателя (должна открываться потом модалка, пока что рендерится разметка модалки внизу)
      data.addEventListener('click', modalHandler);

      function modalHandler(event) {
        event.preventDefault;

        fetch(
          `https://api.themoviedb.org/3/movie/${filmID}?api_key=bf08c0c07642287cbabe383c02818eb3`,
        )
          .then(response => response.json())
          .then(movie => {
            const markup2 = modalMovieTemplate(movie);
            filmCardRef.insertAdjacentHTML('beforeend', markup2);

            movieModalRef.classList.remove('is-hidden');
            // console.log("opening!");

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
              movieModalRef.classList.add('is-hidden');
              window.removeEventListener('keydown', pressEscape);
              // console.log("closed!");
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
