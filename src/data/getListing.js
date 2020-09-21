import { firestore } from '../firebase';
import convertListing from './convertListing';
import getId from '../utils/getId';
import { createResource } from './store';

async function getListingSnapshot(id) {
  const snapshot = await firestore.collection('listings').withConverter(convertListing()).doc(id).get();
  return Promise.resolve(snapshot.data());
}

export default function getListing(slug) {
  const id = getId(slug);
  return createResource(['listing', id], getListingSnapshot(id));
}
