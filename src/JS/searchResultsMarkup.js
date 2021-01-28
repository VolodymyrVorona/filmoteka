import film from '../templates/trendMovieTemplate.hbs';
import refs from './refs';

// --------выводим результат поиска  по ключевым словам------
const searchResultsMarkup = results => {
  const markup = film(results);
  refs.movieRef.insertAdjacentHTML('beforeend', markup);

  let genreRef = document.querySelectorAll('.trend-film-genre');

  // еще не решена проблема с id жанрами , пока будет так:
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
