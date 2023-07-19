import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAg9RBZnnfTkPYpPF_EFgL50RPqudKa8q8',
  authDomain: 'noteballs-5bdf8.firebaseapp.com',
  projectId: 'noteballs-5bdf8',
  storageBucket: 'noteballs-5bdf8.appspot.com',
  messagingSenderId: '804959924701',
  appId: '1:804959924701:web:5e92e85cf0ddc99f8c4634'
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {
  db,
  auth
};