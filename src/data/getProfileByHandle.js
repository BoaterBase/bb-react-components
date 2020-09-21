import { firestore } from '../firebase';
import convertProfile from './convertProfile';
import { createResource } from './store';

async function getProfileByHandleSnapshot(handle) {
  const snapshot = await firestore.collection('profiles').withConverter(convertProfile()).where('handles', 'array-contains', handle).get();
  return Promise.resolve(snapshot.docs[0].data());
}

export default function getProfileByHandle(handle) {
  return createResource(handle, getProfileByHandleSnapshot(handle));
}
