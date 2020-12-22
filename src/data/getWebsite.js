import { firestore } from '../firebase';
import convertWebsite from './convertWebsite';
import { createResource } from './store';

async function getWebsiteSnapshot(id) {
  const snapshot = await firestore.collection('websites').withConverter(convertWebsite()).doc(id).get();
  return Promise.resolve(snapshot.data());
}

export default function getWebsite(id) {
  return createResource(['website', id], getWebsiteSnapshot(id));
}
