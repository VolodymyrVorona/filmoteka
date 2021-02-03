import film from '../templates/trendMovieTemplate.hbs';
import filmLibrary from '../templates/libraryMovieTemplate.hbs';
import refs from './refs';
import getMovieFromSaved from './getMovieFromSaved';
import { Spinner } from 'spin.js';
// // импорт опций спинеера
import opts from './spinner';

import {
  changeGenreData,
  changeNumberOfItem,
  storageModal,
  changeGenreDataLibrary,
} from './commonFunction';

refs.linkHome.addEventListener('click', onHome);
refs.linkLogo.addEventListener('click', onHome);
refs.linkMyLibrary.addEventListener('click', onLibrary);
refs.linkWatched.addEventListener('click', onLibrary);
refs.linkQueue.addEventListener('click', handlerQueue);

storageModal();
// вызывает сразу в разметку - получается вместе 18 штук (пока закоментила -нужно будет убрать)
// onHome();

function onHome(e) {
  e.preventDefault();
  var spinner = new Spinner(opts).spin(refs.targetSpinner);
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

      spinner.stop();
      storageModal();
    });
}

// callback при клику на my-library and Watched
function onLibrary(e) {
  e.preventDefault();
  // змінює кнопку на активну
  refs.linkWatched.classList.remove('noactive');
  refs.linkQueue.classList.add('noactive');
  hidenHome();

  // очищує сторінку від фільмів
  refs.movieRef.innerHTML = '';

  // записує дані з Localstoradge в перемінну
  const movies = getMovieFromSaved('watched');

  // змінює жанр і дату
  changeGenreDataLibrary(movies);

  // рендерить дані по шаблону і вставляє в html
  const markup = filmLibrary(movies);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);
  // викликає модалку
  storageModal();
}

// callback при клику на Queue
function handlerQueue() {
  // змінює кнопку на активну
  refs.linkWatched.classList.add('noactive');
  refs.linkQueue.classList.remove('noactive');

  // очищує сторінку від фільмів
  refs.movieRef.innerHTML = '';
  const movies = getMovieFromSaved('queue');

  // змінює жанр і дату
  changeGenreDataLibrary(movies);

  // рендерить дані по шаблону і вставляє в html
  const markup = filmLibrary(movies);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);

  // викликає модалку
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
