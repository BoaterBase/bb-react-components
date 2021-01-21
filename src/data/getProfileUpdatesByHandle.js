import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import { createResource } from './store';
import getProfileByHandle from './getProfileByHandle';

async function getProfileUpdatesByHandleSnapshot(handle, limit = 6, after) {
  const profile = await getProfileByHandle(handle).get();
  if (profile) {
    const snapshot = await firestore
      .collection('profiles')
      .doc(profile.id)
      .collection('updates')
      .withConverter(convertUpdate())
      .where('listed', '==', true)
      .orderBy('created', 'desc')
      .limit(limit)
      .get();
    //return Promise.resolve(snapshot.data());
    const docs = await Promise.all(snapshot.docs.map((doc) => Promise.resolve(doc.data())));
    // Cleanup draft listings
    return docs.filter((data) => data.content && data.title && data.created);
  } else {
    return Promise.resolve(undefined);
  }
}
export default function getProfileUpdatesByHandle(handle, limit, after) {
  return createResource(['profileHandle', 'updates', handle, limit, after], getProfileUpdatesByHandleSnapshot(handle, limit, after));
}
