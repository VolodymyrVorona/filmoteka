import refs from '../refs';

const signInbtn = document.querySelector('.signIn');
const signUpbtn = document.querySelector('.signUp');
const sign_in_modal = document.querySelector('.container-sign_in');
const sign_up_modal = document.querySelector('.backdrop-sign-up');
const submitInBtn = document.querySelector('.modalSIbtn');
const submitUpBtn = document.querySelector('.modalSUbtn');
const modalCloseSiBtn = document.querySelector('.siModalClose');
const modalCloseSuBtn = document.querySelector('.suModalClose');

signInbtn.addEventListener('click', signInOpen);
signUpbtn.addEventListener('click', signUpOpen);

submitInBtn.addEventListener('click', logInUser);
submitUpBtn.addEventListener('click', submitUser);

modalCloseSiBtn.addEventListener('click', closeSiModal);
modalCloseSuBtn.addEventListener('click', closeSuModal);

function signInOpen() {
  sign_in_modal.classList.remove('is-unactive');
  refs.body.classList.add('modal-overflow');
}

function signUpOpen() {
  sign_up_modal.classList.remove('is-unactive');
  refs.body.classList.add('modal-overflow');
}

function submitUser() {
  sign_up_modal.classList.add('is-unactive');
  refs.body.classList.remove('modal-overflow');
}

function logInUser() {
  sign_in_modal.classList.add('is-unactive');
  refs.body.classList.remove('modal-overflow');
}

function closeSiModal() {
  sign_in_modal.classList.add('is-unactive');
  refs.body.classList.remove('modal-overflow');
}

function closeSuModal() {
  sign_up_modal.classList.add('is-unactive');
  refs.body.classList.remove('modal-overflow');
}
