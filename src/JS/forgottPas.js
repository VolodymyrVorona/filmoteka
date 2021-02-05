import authFire from './firebase';

const forgotPass = document.querySelector('.forgotPass');

forgotPass.addEventListener('click', sendPasswordReset);

function sendPasswordReset() {
  const email = document.querySelector('.sign_email').value;
  authFire
    .sendPasswordResetEmail(email)
    .then(() => {
      notie.alert({
        type: 'success',
        text: 'Password reset email sent!',
        time: 2,
      });
    })
    .catch(error => {
      notie.alert({
        type: 'error',
        text: 'Ops, something went wrong',
        time: 2,
      });
    });
}
