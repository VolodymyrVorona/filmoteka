import localStorageService from './localStorage';

function getMovieFromSaved(key) {
  let moviesList = localStorageService.getOut(key);

  return !moviesList ? (moviesList = []) : moviesList;
}

export default getMovieFromSaved;
