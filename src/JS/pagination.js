// шаблон фильма
import film from '../templates/trendMovieTemplate.hbs';

// // ссылка из DOM
const movieRef = document.querySelector('.trend-movie');

// // массив жанров
import genreId from '../JS/genreID.js';
// // плагин пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

// // разметка пагинации
var container = document.getElementById('tui-pagination-container');

// // свойства
var pagination = new Pagination(container, {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 8,
});

// при клике на номер страницы - рендерится разметка
pagination.on('afterMove', function (eventData) {
  //   alert('The current page is ' + eventData.page);
  const apiKey = 'bf08c0c07642287cbabe383c02818eb3';
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${eventData.page}`,
  )
    .then(response => response.json())
    .then(data => data.results)
    .then(movies => {
      movieRef.innerHTML = '';
      console.log(movies);
      // изменяет  жанр  и дату
      movies.map(item => {
        let newGenre = [];
        item.genre_ids.map(id => {
          const found = genreId.find(item => item.id === id);
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
        newMovieList = movies.slice(0, 4);
      }
      if (
        document.documentElement.clientWidth >= 768 &&
        document.documentElement.clientWidth < 1024
      ) {
        newMovieList = movies.slice(0, 8);
      }
      if (document.documentElement.clientWidth >= 1024) {
        newMovieList = movies.slice(0, 9);
      }

      const markup = film(newMovieList);
      movieRef.insertAdjacentHTML('beforeend', markup);
    });
});
