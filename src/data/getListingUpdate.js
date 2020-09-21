import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import getId from '../utils/getId';
import { createResource } from './store';

async function getListingUpdateSnapshot(listingId, updateId) {
  const snapshot = await firestore.collection('listings').doc(listingId).collection('updates').withConverter(convertUpdate()).doc(getId(updateId)).get();
  return Promise.resolve(snapshot.data());
}

export default function getListingUpdate(listingSlug, updateSlug) {
  const listingId = getId(listingSlug);
  const updateId = getId(updateSlug);

  return createResource(['listing', 'update', listingId, updateId], getListingUpdateSnapshot(listingId, updateId));
}
