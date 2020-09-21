import { firestore } from '../firebase';
import convertProfile from './convertProfile';
import { createResource } from './store';

async function getProfileSnapshot(id) {
  const snapshot = await firestore.collection('profiles').withConverter(convertProfile()).doc(id).get();
  return Promise.resolve(snapshot.data());
}

export default function getProfile(id) {
  return createResource(['profile', id], getProfileSnapshot(id));
}
