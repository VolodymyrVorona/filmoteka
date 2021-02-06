const refs = {
  body: document.querySelector('body'),

  header: document.querySelector('.header'),
  homeLink: document.querySelector('.nav-home'),
  logo: document.querySelector('.logo'),
  form: document.querySelector('.input__wrapper'),
  buttonsWrapper: document.querySelector('.buttons-wrapper'),
  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),
  myLibrary: document.querySelector('.nav-library'),
  inputField: document.querySelector('.js-input'),
  warningString: document.querySelector('.js-warning'),

  filmCard: document.querySelector('.film-card'),
  movieModal: document.querySelector('.movie-modal'),
  backdrop: document.querySelector('.backdrop'),
  closeModalBtn: document.querySelector('.close-button'),

  moviesContainer: document.querySelector('.trend-movie'),
  divPagination: document.querySelector('.tui-pagination'),
  targetSpinner: document.getElementById('spinner'),

  footerModal: document.querySelector('.footer-modal'),
  modalTeamList: document.querySelector('.our-team'),
  closeMdlBtn: document.querySelector('.footer-close-button'),
  footerBackdrop: document.querySelector('.footer-backdrop'),
};

export default refs;
