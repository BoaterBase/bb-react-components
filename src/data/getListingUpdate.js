import { firestore } from '../firebase';
import convertUpdate from './convertUpdate';
import getId from '../utils/getId';
import { createResource } from './store';

async function getListingUpdateSnapshot(listingSlug, updateSlug) {
  const snapshot = await firestore
    .collection('listings')
    .doc(getId(listingSlug))
    .collection('updates')
    .withConverter(convertUpdate())
    .doc(getId(updateSlug))
    .get();
  return Promise.resolve(snapshot.data());
}

export default function getListing(listingSlug, updateSlug) {
  return createResource([listingSlug, updateSlug], getListingUpdateSnapshot(listingSlug, updateSlug));
}
