//import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDkBS1qwcm0DT0vyMDea8DkLB-adsA8xzk',
  authDomain: 'boaterbase-v2.firebaseapp.com',
  databaseURL: 'https://boaterbase-v2.firebaseio.com',
  projectId: 'boaterbase-v2',
  storageBucket: 'boaterbase-v2.appspot.com',
  messagingSenderId: '790141979706',
  appId: '1:790141979706:web:3a818ed389e9773a45b903',
};
// Initialize Firebase once, check for app when hot reloading
let fb;
try {
  fb = firebase.app('BoaterBaseComponents');
} catch (e) {
  fb = firebase.initializeApp(firebaseConfig, 'BoaterBaseComponents');
  // Try and enable persistence on the browser
  if (typeof window !== 'undefined') {
    fb.firestore()
      .enablePersistence()
      .catch((e) => null);
  }
}
export default fb;
