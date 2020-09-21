import { firestore } from '../firebase';
import convertProfile from './convertProfile';
import { createResource } from './store';

async function getProfileByHandleSnapshot(handle) {
  const snapshot = await firestore.collection('profiles').withConverter(convertProfile()).where('handles', 'array-contains', handle).get();
  if (snapshot.size > 0) {
    return Promise.resolve(snapshot.docs[0].data());
  } else {
    return Promise.resolve(undefined);
  }
}

export default function getProfileByHandle(handle) {
  return createResource(['profile', 'handle', handle], getProfileByHandleSnapshot(handle));
}
