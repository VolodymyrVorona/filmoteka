import film from '../templates/trendMovieTemplate.hbs';
import refs from './refs';
import genreID from '../JS/genreID';

// --------выводим результат поиска  по ключевым словам------
const searchResultsMarkup = results => {
  // изменяет  жанр  и дату
  results.map(item => {
    let newGenre = [];
    item.genre_ids.map(id => {
      const found = genreID.find(item => item.id === id);
      newGenre.push(found.name);
    });
    item.release_date = item.release_date.slice(0, 4);
    if (newGenre.length >= 4) {
      const manyGenres = newGenre.slice(0, 3);
      item.genre_ids = manyGenres.join(', ');
    } else {
      item.genre_ids = newGenre.join(', ');
    }
    return item;
  });

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

  // ------------условие для вывода предупреждения---------------
  if (results === []) {
    refs.warningString.classList.remove('is-hidden');
  }
  if (results !== []) {
    refs.warningString.classList.add('is-hidden');
  }
};

export default searchResultsMarkup;
