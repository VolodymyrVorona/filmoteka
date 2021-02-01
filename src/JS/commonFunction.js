// масиив жанров
import genreID from '../JS/genreID';
import refs from './refs';
import modalMovieTemplate from '../templates/fullDescriptionMovie.hbs';
import getMovieFromSaved from './getMovieFromSaved';
import addMovieToSaved from './addMovieToSaved';

// изменяет  жанр  и дату
function changeGenreData(filmsData) {
  filmsData.map(item => {
    let newGenre = [];
    item.genre_ids.map(id => {
      const found = genreID.find(item => item.id === id);
      newGenre.push(found.name);
    });
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }
    if (newGenre.length >= 4) {
      const manyGenres = newGenre.slice(0, 3);
      item.genre_ids = manyGenres.join(', ');
    } else {
      item.genre_ids = newGenre.join(', ');
    }
    return item;
  });
}

// в зависимости от viewport оствляет необходимое количество элементов
function changeNumberOfItem(filmsData) {
  let newFilmsData = [];
  if (document.documentElement.clientWidth < 768) {
    newFilmsData = filmsData.slice(0, 4);
  }
  if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1024
  ) {
    newFilmsData = filmsData.slice(0, 8);
  }
  if (document.documentElement.clientWidth >= 1024) {
    newFilmsData = filmsData.slice(0, 9);
  }
  return newFilmsData;
}

function storageModal() {
  // берем элементы из DOM (доступны после вставки разметки )
  let filmItemRef = document.querySelectorAll('.trend-film-item');
  const filmCardRef = document.querySelector('.film-card');

  filmItemRef.forEach(data => {
    // берем id фильма
    let filmID = data.dataset.film;
    
    // Вешаем на картинку слушателя, чтобы открывалась модалка
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
          refs.body.classList.add('modal-overflow')

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
            refs.body.classList.remove('modal-overflow');
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
}

export { changeGenreData, changeNumberOfItem, storageModal };
