import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import getId from '../utils/getId';
import { createResource } from './store';
import getProfileByHandle from './getProfileByHandle';

async function getProfileUpdateByHandleSnapshot(profileHandle, updateId) {
  const profile = await getProfileByHandle(profileHandle).get();
  if (profile) {
    const snapshot = await firestore.collection('profiles').doc(profile.id).collection('updates').withConverter(convertUpdate()).doc(getId(updateId)).get();
    return Promise.resolve(snapshot.data());
  } else {
    return Promise.resolve(undefined);
  }
}

export default function getProfileUpdateByHandle(profileHandle, updateSlug) {
  const updateId = getId(updateSlug);

  return createResource(['profile', 'update', profileHandle, updateId], getProfileUpdateByHandleSnapshot(profileHandle, updateId));
}
