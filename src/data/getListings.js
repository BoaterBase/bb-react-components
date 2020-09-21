import { firestore } from '../firebase';
import convertListing from './convertListing';
import { createResource } from './store';

async function getListingsSnapshot(limit = 6, after) {
  const snapshot = await firestore
    .collection('listings')
    .withConverter(convertListing())
    .where('listed', '==', true)
    .orderBy('created', 'desc')
    .limit(limit)
    .get();

  return Promise.all(snapshot.docs.map((doc) => Promise.resolve(doc.data())));
}
export default function getListings(limit, after) {
  return createResource(['listings', limit, after], getListingsSnapshot(limit, after));
}
