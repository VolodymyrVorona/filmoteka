import film from '../templates/trendMovieTemplate.hbs';
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

function onHome() {
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
  const markup = film(getMovieFromSaved('watched'));
  // console.log(markup);
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
