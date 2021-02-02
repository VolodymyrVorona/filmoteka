import { auth } from './firebase';

const signUpbtn = document.querySelector('.signUpbtn');
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

signUpbtn.addEventListener('click', authenticateUser(email, password, false));

async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? await auth.signInWithEmailAndPassword(email, password)
      : await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}
