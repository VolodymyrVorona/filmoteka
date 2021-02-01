import film from '../templates/trendMovieTemplate.hbs';
import headerMarkup from '../templates/homeHeader.hbs';
import refs from './refs';

// --------выводим результат поиска  по ключевым словам------
const searchResultsMarkup = results => {
  let newMovieList = [];

  if (document.documentElement.clientWidth < 768) {
    newMovieList = results.slice(0, 4);
    // return  newMovieList
  }
  if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1024
  ) {
    newMovieList = results.slice(0, 8);
  }
  if (document.documentElement.clientWidth >= 1024) {
    newMovieList = results.slice(0, 9);
  }

  console.log(newMovieList);

  const markup = film(newMovieList);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);

  // еще не решена проблема с id жанрами , пока будет так:
  let genreRef = document.querySelectorAll('.trend-film-genre');

  genreRef.forEach(genre => {
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
  let dataRef = document.querySelectorAll('.trend-film-data');
  dataRef.forEach(data => {
    let newData = data.textContent.slice(0, 5);
    data.textContent = newData;
  });
};

export default searchResultsMarkup;
