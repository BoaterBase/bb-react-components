// TODO - rename to db and abstract firebase away
import '@firebase/app';
import '@firebase/firestore';
import '@firebase/util';

import { initializeApp, getApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

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
export { firebase };
export const firestore = getFirestore(firebase);

export { collection, doc, getDoc, addDoc, collectionGroup } from '@firebase/firestore';

// Normalize firebase access for future updates
