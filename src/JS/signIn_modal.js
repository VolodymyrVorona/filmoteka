const signInbtn = document.querySelector('.signIn');
const signUpbtn = document.querySelector('.signUp');
const sign_in_modal = document.querySelector('.container-sign_in');
const sign_up_modal = document.querySelector('.container-sign_up');
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
}
function signUpOpen() {
  sign_up_modal.classList.remove('is-unactive');
}
function submitUser() {
  sign_up_modal.classList.add('is-unactive');
}
function logInUser() {
  sign_in_modal.classList.add('is-unactive');
}
function closeSiModal() {
  sign_in_modal.classList.add('is-unactive');
}
function closeSuModal() {
  sign_up_modal.classList.add('is-unactive');
}
