import headerMarkup from '../templates/homeHeader.hbs';

const bodyRef = document.querySelector('body');

function renderHeaderMarkup() {
  const markup = headerMarkup();
  bodyRef.insertAdjacentHTML('afterbegin', markup);
}

renderHeaderMarkup();
