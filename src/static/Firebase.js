import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC7LjL7hd_fSmbxXCpy73w00aerbgLtHLA",
  authDomain: "timetable-cda28.firebaseapp.com",
  databaseURL: "https://timetable-cda28.firebaseio.com",
  storageBucket: "timetable-cda28.appspot.com",
  messagingSenderId: "490238416904"
};
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;
