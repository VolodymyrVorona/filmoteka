import film from '../templates/trendMovieTemplate.hbs';
import filmLibrary from '../templates/libraryMovieTemplate.hbs';
import refs from './refs';
import getMovieFromSaved from './getMovieFromSaved';
import { Spinner } from 'spin.js';
import opts from './spinner'; // опції спінера
import setItemsPerPage from './setItemsPerPage';
import createPagination from './createPagination';

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
refs.linkQueue.addEventListener('click', onLibrary);

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
  hidenHome();

  let key;
  if (e.target === refs.linkMyLibrary || e.target === refs.linkWatched) {
    key = refs.linkWatched.innerHTML.toLowerCase();
    refs.linkWatched.classList.remove('noactive'); // робить кнопку активною
    refs.linkQueue.classList.add('noactive'); // робить кнопку неактивною
  } else {
    key = refs.linkQueue.innerHTML.toLowerCase();
    refs.linkWatched.classList.add('noactive'); // робить кнопку неактивною
    refs.linkQueue.classList.remove('noactive'); // робить кнопку активною
  }

  const movies = getMovieFromSaved(key); // записує дані з Localstoradge у змінну
  const { moviesPerPage, visiblePaginationPages } = setItemsPerPage();

  libraryPageRender(movies, 0, moviesPerPage);
  createPagination(
    movies.length,
    moviesPerPage,
    visiblePaginationPages,
    paginationHandler,
  );

  // callback при кліку на сторінки пагінації
  function paginationHandler(eventData) {
    const firstIndex = (eventData.page - 1) * moviesPerPage;
    const lastIndex = firstIndex + moviesPerPage;
    libraryPageRender(movies, firstIndex, lastIndex);
  }
}

// callback для рендеру сторінки бібліотеки
function libraryPageRender(movies, firstIndex, lastIndex) {
  refs.movieRef.innerHTML = ''; // очищує сторінку від фільмів

  const newList = movies.slice(firstIndex, lastIndex); // вирізає із масиву даних потрібну к-сть елементів
  changeGenreDataLibrary(newList); // вибирає назви жанрів та обрізає дату (залишає тільки рік)

  const markup = filmLibrary(newList); // рендерить розмітку по шаблону
  refs.movieRef.insertAdjacentHTML('beforeend', markup);
  storageModal();
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
