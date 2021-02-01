import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDk7QuF0N971UQ7B7P7vr3TDlcSPjXDgOo',
  authDomain: 'filmoteka-92820.firebaseapp.com',
  projectId: 'filmoteka-92820',
  storageBucket: 'filmoteka-92820.appspot.com',
  messagingSenderId: '466516500538',
  appId: '1:466516500538:web:eb00eb8ab0589fee1cd503',
  measurementId: 'G-DHVDN5240J',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
