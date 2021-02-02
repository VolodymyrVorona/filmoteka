// ------ фетч фильмов по ключевым словам ------
const fetchMovies = searchQuery => {
  const apiKey = 'bf08c0c07642287cbabe383c02818eb3';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(results => {
      if (results.errors) {
        return results;
      } else {
        ({ results } = results);
        return results;
      }
    })
    .catch(error => console.log(error)); // Не відловлює помилку 422
};

export default fetchMovies;
