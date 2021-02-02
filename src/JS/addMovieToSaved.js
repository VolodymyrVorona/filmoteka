import localStorageService from './localStorage';

function addMovieToSaved(movie, array, key, btnRef) {
  const isInList = array.some(el => el.id === movie.id);

  if (isInList) {
    console.log(
      `%c Фільм вже є у ${key}`,
      'color: white; background-color: tomato; font-size: 16px',
    );

    return;
  } else {
    btnRef.disabled = false;

    btnRef.addEventListener('click', () => {
      array.push(movie);
      localStorageService.saveIn(key, array);
      btnRef.disabled = true;

      console.log(
        `%c ${key} in localStorage`,
        'color: white; background-color: teal; font-size: 16px',
        array,
      );
    });
  }
}

export default addMovieToSaved;
