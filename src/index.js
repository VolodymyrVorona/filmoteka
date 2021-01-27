import './scss/main.scss';

const refs = {
  linkHome: document.querySelector('.home'),
  linkMyLibrary: document.querySelector('.library'),
  linkMyLibrary: document.querySelector('header .logo'),
};

refs.linkHome.addEventListener('click', onHome);
refs.linkHome.addEventListener('click', onHome);
// refs.linkMyLibrary.addEventListener('click', onLibrary);

function onHome() {
  return fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=bf08c0c07642287cbabe383c02818eb3',
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(movies => {
      const marcup = film(movies);
      movieRef.insertAdjacentHTML('beforeend', marcup);
      let filmItemRef = document.querySelectorAll('.film-item');
      let genreRef = document.querySelectorAll('.genre');
      filmItemRef.forEach(data => {
        let filmID = data.dataset.film;
        // console.log(filmID);
        // fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=bf08c0c07642287cbabe383c02818eb3`).then(response =>
        //     response.json())
      });
      genreRef.forEach(genre => {
        // console.log(genre.textContent);
        if (genre.textContent.includes(18)) {
          genre.textContent = 'Drama';
        }
        if (genre.textContent.includes(28)) {
          genre.textContent = 'Action';
        }
        if (genre.textContent.includes(10752)) {
          genre.textContent = 'War';
        }
      });
      // Обрезаем лишнее в дате, оставлем только год
      let dataRef = document.querySelectorAll('p.data');
      dataRef.forEach(data => {
        let newData = data.textContent.slice(0, 5);
        data.textContent = newData;
      });
    });
}
