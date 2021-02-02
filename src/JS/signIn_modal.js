const signInbtn = document.querySelector('.signIn');
const signUpbtn = document.querySelector('.signup');
const sign_in_modal = document.querySelector('.container-sign_in');
const sign_up_modal = document.querySelector('.container-sign_up');

signInbtn.addEventListener('click', signInOpen);
signUpbtn.addEventListener('click', signUpOpen);

function signInOpen() {
  sign_in_modal.classList.remove('is-hidden');
}
function signUpOpen() {
  sign_in_modal.classList.remove('is-hidden');
}
