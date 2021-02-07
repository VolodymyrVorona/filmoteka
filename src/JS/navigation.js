import refs from './refs';
import getSavedItems from './localStorage/getSavedItems';
import { mainPageRender } from './render/mainPageRender';
import setItemsPerPage from './transformData/setItemsPerPage';
import createPagination from './pagination/createPagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import onPagination from './pagination/mainPagePagination';
import libraryPageRender from './render/libraryPageRender';

refs.homeLink.addEventListener('click', onHome);
refs.logo.addEventListener('click', onHome);
refs.myLibrary.addEventListener('click', onLibrary);
refs.watchedBtn.addEventListener('click', onLibrary);
refs.queueBtn.addEventListener('click', onLibrary);

// callback при кліку на Home і лого
function onHome(e) {
  e.preventDefault();
  hidenLibrary();

  refs.moviesContainer.classList.remove('show-message');
  refs.moviesContainer.innerHTML = '';

  mainPageRender();
  const { visiblePaginationPages } = setItemsPerPage();
  createPagination(20000, 20, visiblePaginationPages, onPagination);
}

// callback при кліку на кнопки бібліотеки
function onLibrary(e) {
  e.preventDefault();
  hidenHome();

  refs.moviesContainer.classList.remove('show-message');

  let key;
  if (e.target === refs.myLibrary || e.target === refs.watchedBtn) {
    key = refs.watchedBtn.innerHTML.toLowerCase();
    refs.watchedBtn.classList.remove('noactive'); // робить кнопку активною
    refs.queueBtn.classList.add('noactive'); // робить кнопку неактивною
  } else {
    key = refs.queueBtn.innerHTML.toLowerCase();
    refs.watchedBtn.classList.add('noactive'); // робить кнопку неактивною
    refs.queueBtn.classList.remove('noactive'); // робить кнопку активною
  }

  const movies = getSavedItems(key); // записує дані з Localstoradge у змінну

  if (movies.length === 0) {
    refs.moviesContainer.innerHTML = `<p class='info-message'>You don't have saved movies yet</p>`;
    refs.moviesContainer.classList.add('show-message');
    refs.divPagination.innerHTML = '';

    return;
  }

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

function hidenLibrary() {
  refs.myLibrary.classList.remove('active');
  refs.homeLink.classList.add('active');
  refs.form.classList.remove('is-hidden');
  refs.buttonsWrapper.classList.add('is-hidden');
  refs.header.classList.remove('library');
}

function hidenHome() {
  refs.myLibrary.classList.add('active');
  refs.homeLink.classList.remove('active');
  refs.form.classList.add('is-hidden');
  refs.buttonsWrapper.classList.remove('is-hidden');
  refs.header.classList.add('library');
}
