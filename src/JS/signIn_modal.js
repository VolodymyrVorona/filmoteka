const signInbtn = document.querySelector('.signIn');
const signUpbtn = document.querySelector('.signUp');
const sign_in_modal = document.querySelector('.container-sign_in');
const sign_up_modal = document.querySelector('.container-sign_up');

signInbtn.addEventListener('click', signInOpen);
signUpbtn.addEventListener('click', signUpOpen);

function signInOpen() {
  sign_in_modal.classList.remove('is-unactive');
}
function signUpOpen() {
  sign_up_modal.classList.remove('is-unactive');
}
