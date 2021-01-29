import headerMarkup from '../templates/homeHeader.hbs';

const bodyRef = document.querySelector('body');

function renderHeaderMarkup(сb) {
  const markup = сb();
  bodyRef.insertAdjacentHTML('afterbegin', markup);

  const refs = {
    linkheader: document.querySelector('.header'),
    linkHome: document.querySelector('.home'),
    linkMyLibrary: document.querySelector('.library'),
    listMovie: document.querySelector('.trend-movie'),
  };

  return refs;
}

const obj = renderHeaderMarkup(headerMarkup);

export { obj, renderHeaderMarkup };
