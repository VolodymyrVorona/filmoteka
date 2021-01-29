import localStorageService from './localStorage';

function getMovieFromSaved(key) {
  let moviesList = localStorageService.getOut(key);

  if (!moviesList) {
    moviesList = [];
  }

  return moviesList;
}

export default getMovieFromSaved;
