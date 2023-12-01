// firebase/index.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, query, where, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBuec5h37-zilrPEvZLkAsK5_iQVLmUB5Q',
  authDomain: 'expi-track.firebaseapp.com',
  projectId: 'expi-track',
  storageBucket: 'expi-track.appspot.com',
  messagingSenderId: '159389289537',
  appId: '1:159389289537:web:cf870c427e377dc7b98ac0',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, setDoc, doc, query, where, deleteDoc };