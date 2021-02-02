import film from '../templates/trendMovieTemplate.hbs';
import filmLibrary from '../templates/libraryMovieTemplate.hbs';
import refs from './refs';
import getMovieFromSaved from './getMovieFromSaved';

import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
} from './commonFunction';

refs.linkHome.addEventListener('click', onHome);
refs.linkLogo.addEventListener('click', onHome);
refs.linkMyLibrary.addEventListener('click', onLibrary);
refs.linkWatched.addEventListener('click', handlerWatched);
refs.linkQueue.addEventListener('click', handlerQueue);

// вызывает сразу в разметку - получается вместе 18 штук (пока закоментила -нужно будет убрать)
// onHome();

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
      changeGenreData(movies);

      // в зависимости от viewport оствляет необходимое количество элементов
      let newFilmCount = changeNumberOfItem(movies);

      // делаем разметку (вставляем шаблон)
      const markup = film(newFilmCount);
      refs.movies.insertAdjacentHTML('beforeend', markup);

      storageModal();
    });
}

function onLibrary(e) {
  e.preventDefault();

  hidenHome();
  refs.movieRef.innerHTML = '';
  const markup = filmLibrary(getMovieFromSaved('watched'));
  // console.log(markup);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);
  storageModal();
}

function handlerWatched() {
  refs.linkWatched.classList.remove('noactive');
  refs.linkQueue.classList.add('noactive');

  refs.movieRef.innerHTML = '';
  console.log(getMovieFromSaved('watched'));

  const markup = filmLibrary(getMovieFromSaved('watched'));

  refs.movieRef.insertAdjacentHTML('beforeend', markup);
  storageModal();
}

function handlerQueue() {
  refs.linkWatched.classList.add('noactive');
  refs.linkQueue.classList.remove('noactive');

  refs.movieRef.innerHTML = '';
  console.log(getMovieFromSaved('queue'));
  const markup = film(getMovieFromSaved('queue'));

  refs.movieRef.insertAdjacentHTML('beforeend', markup);
  storageModal();
}

function hidenLibrary() {
  refs.linkMyLibrary.classList.remove('active');
  refs.linkHome.classList.add('active');
  refs.linkInput.classList.remove('is-hidden');
  refs.linkButtons.classList.add('is-hidden');
  refs.linkHeader.classList.remove('library');
  refs.divPagination.classList.remove('turnoff');
}

function hidenHome() {
  refs.linkMyLibrary.classList.add('active');
  refs.linkHome.classList.remove('active');
  refs.linkInput.classList.add('is-hidden');
  refs.linkButtons.classList.remove('is-hidden');
  refs.linkHeader.classList.add('library');
  refs.divPagination.classList.add('turnoff');
}
