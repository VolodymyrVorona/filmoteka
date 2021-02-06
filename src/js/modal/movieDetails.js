import refs from '../refs';
import modalMovieTemplate from '../../templates/fullDescriptionMovie.hbs';
import getSavedItems from '../localStorage/getSavedItems';
import { saveItem, isInSaved } from '../localStorage/saveItem';
import getMovies from '../getMovies';
import { renderMarkup } from '../render/searchResultsMarkup';
const debounce = require('lodash.debounce');

refs.moviesContainer.addEventListener('click', debounce(onModal, 500));

function onModal(e) {
  e.preventDefault();
  const filmID = e.path[1].dataset.film;
  const url = `https://api.themoviedb.org/3/movie/${filmID}?api_key=bf08c0c07642287cbabe383c02818eb3`;

  getMovies(url).then(movie => {
    renderMarkup(movie, modalMovieTemplate, refs.filmCard);

    refs.movieModal.classList.remove('is-hidden');
    refs.body.classList.add('modal-overflow');

    // беремо посилання на кнопки у модальному вікні
    const addToWatchedBtnRef = document.querySelector('.js-add-to-watched');
    const addToQueueBtnRef = document.querySelector('.js-add-to-queue');

    // отримуємо масиви фільмів "Watched" та "Queue" із localStorage
    const watchedMoviesList = getSavedItems('watched');
    const queueMoviesList = getSavedItems('queue');

    // перевіряємо чи фільм є у бібліотеці
    isInSaved(movie, watchedMoviesList, 'watched', addToWatchedBtnRef);
    isInSaved(movie, queueMoviesList, 'queue', addToQueueBtnRef);

    saveItem(movie, 'watched', addToWatchedBtnRef);
    saveItem(movie, 'queue', addToQueueBtnRef);

    window.addEventListener('keydown', pressEscape);
    refs.closeModalBtn.addEventListener('click', closeModal);
    refs.backdrop.addEventListener('click', closeModal);
  });
}

function pressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  refs.movieModal.classList.add('is-hidden');
  refs.body.classList.remove('modal-overflow');
  window.removeEventListener('keydown', pressEscape);
  refs.filmCard.innerHTML = '';
}
