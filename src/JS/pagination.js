// шаблон фильма
import film from '../templates/trendMovieTemplate.hbs';

// // ссылка из DOM
const movieRef = document.querySelector('.trend-movie');

// // массив жанров
import genreId from '../JS/genreID.js';
// // плагин пагинации
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

// плагин спинера

import { Spinner } from 'spin.js';
// опции спинера
var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#FF6B08', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

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
  var target = document.getElementById('spinner');
  var spinner = new Spinner(opts).spin(target);
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

      spinner.stop();
    });
});
