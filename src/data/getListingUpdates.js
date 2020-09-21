import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import { createResource } from './store';

async function getListingUpdatesSnapshot(id, limit = 6, after) {
  const snapshot = await firestore
    .collection('listings')
    .doc(id)
    .collection('updates')
    .withConverter(convertUpdate())
    .where('listed', '==', true)
    .orderBy('created', 'desc')
    .limit(limit)
    .get();

  const docs = await Promise.all(snapshot.docs.map((doc) => Promise.resolve(doc.data())));

  // Cleanup draft listings
  return docs.filter((data) => data.content && data.title && data.created);
}
export default function getListingUpdates(id, limit, after) {
  return createResource([id, limit, after], getListingUpdatesSnapshot(id, limit, after));
}
