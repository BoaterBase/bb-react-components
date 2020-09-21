import { firestore } from '../firebase';
import convertListing from './convertListing';
import getId from '../utils/getId';
import { createResource } from './store';

async function getListingSnapshot(slug) {
  const snapshot = await firestore.collection('listings').withConverter(convertListing()).doc(getId(slug)).get();
  return Promise.resolve(snapshot.data());
}

export default function getListing(slug) {
  return createResource(slug, getListingSnapshot(slug));
}
