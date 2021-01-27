import './scss/main.scss';
import trendMovieTemplate from './templates/trendMovieTemplate.hbs';

const refs = {
  linkHome: document.querySelector('.home'),
  linkMyLibrary: document.querySelector('.library'),
  listMovie: document.querySelector('.trend-movie'),
};

onHome();

refs.linkHome.addEventListener('click', onHome);
refs.linkHome.addEventListener('click', onHome);
refs.linkMyLibrary.addEventListener('click', onLibrary);

function onHome() {
  refs.linkHome.classList.add('active');
  refs.linkMyLibrary.classList.remove('active');
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3',
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(movies => {
      movies.forEach(movie => {
        const idMovie = movie.id;
        console.log(idMovie);
      });

      // fetch(
      //   'https://developers.themoviedb.org/3/movies/get-movie-details?api_key=bf08c0c07642287cbabe383c02818eb3',
      // );

      const marcup = trendMovieTemplate(movies);
      refs.listMovie.insertAdjacentHTML('afterbegin', marcup);
    });
}

function onLibrary(event) {
  refs.linkMyLibrary.classList.add('active');
  refs.linkHome.classList.remove('active');
  refs.listMovie.innerHTML = '';
}
