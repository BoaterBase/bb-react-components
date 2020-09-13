import { initializeApp, getApp } from '@firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyDkBS1qwcm0DT0vyMDea8DkLB-adsA8xzk',
  authDomain: 'boaterbase-v2.firebaseapp.com',
  databaseURL: 'https://boaterbase-v2.firebaseio.com',
  projectId: 'boaterbase-v2',
  storageBucket: 'boaterbase-v2.appspot.com',
  messagingSenderId: '790141979706',
  appId: '1:790141979706:web:3a818ed389e9773a45b903',
};

// Ensure we only have a single instance of firebase app
let firebase;
try {
  firebase = getApp('BoaterBaseComponents');
} catch (e) {
  firebase = initializeApp(firebaseConfig, 'BoaterBaseComponents');
}
export default firebase;
