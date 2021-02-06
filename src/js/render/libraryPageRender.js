import filmLibrary from '../../templates/libraryMovieTemplate.hbs';
import refs from '../refs';
import changeGenre from '../transformData/changeGenre';
import changeData from '../transformData/changeData';
import { renderMarkup } from './searchResultsMarkup';

// callback для рендеру сторінки бібліотеки
function libraryPageRender(movies, firstIndex, lastIndex) {
  refs.moviesContainer.innerHTML = ''; // очищує сторінку від фільмів
  const newList = movies.slice(firstIndex, lastIndex); // вирізає із масиву даних потрібну к-сть елементів
  changeGenre(newList); // вибирає назви жанрів
  changeData(newList); // обрізає дату (залишає тільки рік)
  renderMarkup(newList, filmLibrary, refs.moviesContainer); // рендерить розмітку по шаблону
}

export default libraryPageRender;
