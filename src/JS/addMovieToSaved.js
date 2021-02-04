import localStorageService from './localStorage';

function addMovieToSaved(movie, array, key, btnRef) {
  const isInList = array.some(el => el.id === movie.id);

  if (!isInList) {
    btnRef.disabled = false;

    btnRef.addEventListener('click', () => {
      array.push(movie);
      localStorageService.saveIn(key, array);
      btnRef.disabled = true;
    });
  }
}

export default addMovieToSaved;
