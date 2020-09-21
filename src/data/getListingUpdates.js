import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import { createResource } from './store';
import getId from '../utils/getId';

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
export default function getListingUpdates(slug, limit, after) {
  const id = getId(slug);

  return createResource(['listing', 'updates', id, limit, after], getListingUpdatesSnapshot(id, limit, after));
}
