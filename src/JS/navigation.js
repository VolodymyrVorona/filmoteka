import genreID from '../JS/genreID';
import film from '../templates/trendMovieTemplate.hbs';
import refs from './refs';
import getMovieFromSaved from './getMovieFromSaved';

refs.linkHome.addEventListener('click', onHome);
refs.linkLogo.addEventListener('click', onHome);
refs.linkMyLibrary.addEventListener('click', onLibrary);
refs.linkWatched.addEventListener('click', handlerWatched);
refs.linkQueue.addEventListener('click', handlerQueue);

onHome();

function onHome(e) {
  e.preventDefault();
  hidenLibrary();
  refs.movieRef.innerHTML = '';

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
      refs.movieRef.insertAdjacentHTML('beforeend', markup);

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
}

function onLibrary(e) {
  e.preventDefault();

  hidenHome();
  refs.movieRef.innerHTML = '';
  const markup = film(getMovieFromSaved('watched'));
  console.log(markup);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);
}

function handlerWatched() {
  refs.movieRef.innerHTML = '';
  const markup = film(getMovieFromSaved('watched'));

  refs.movieRef.insertAdjacentHTML('beforeend', markup);
}

function handlerQueue() {
  refs.movieRef.innerHTML = '';
  const markup = film(getMovieFromSaved('queue'));

  refs.movieRef.insertAdjacentHTML('beforeend', markup);
}

function hidenLibrary() {
  refs.linkMyLibrary.classList.remove('active');
  refs.linkHome.classList.add('active');
  refs.linkInput.classList.remove('is-hidden');
  refs.linkButtons.classList.add('is-hidden');
  refs.linkHeader.classList.remove('library');
}

function hidenHome() {
  refs.linkMyLibrary.classList.add('active');
  refs.linkHome.classList.remove('active');
  refs.linkInput.classList.add('is-hidden');
  refs.linkButtons.classList.remove('is-hidden');
  refs.linkHeader.classList.add('library');
}
