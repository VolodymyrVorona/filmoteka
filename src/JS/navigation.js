const refs = {
  linkHeader: document.querySelector('.header'),
  linkHome: document.querySelector('.nav-home'),
  linkInput: document.querySelector('.input__wrapper'),
  linkButtons: document.querySelector('.buttons-wrapper'),
  linkWatched: document.querySelector('.watched'),
  linkQueue: document.querySelector('.queue'),
  linkMyLibrary: document.querySelector('.nav-library'),
  listMovie: document.querySelector('.trend-movie'),
};

refs.linkHome.addEventListener('click', onHome);
refs.linkHome.addEventListener('click', onHome);
refs.linkMyLibrary.addEventListener('click', onLibrary);
refs.linkWatched.addEventListener('click', handlerWatched);
refs.linkQueue.addEventListener('click', handlerQueue);

function onHome(e) {
  e.preventDefault();
  hidenLibrary();

  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3`,
  )
    .then(response => response.json())
    .then(movies => console.log(movies));
}

function onLibrary(e) {
  e.preventDefault();
  hidenHome();
}

function handlerWatched() {
  console.log('click');
}

function handlerQueue() {
  console.log('click');
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
