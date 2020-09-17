import { firestore } from '../firebase';
import listingConverter from '../firebase/listingConverter';
import getId from '../utils/getId';
import { createResource } from './store';

async function getListingSnapshot(slug) {
  const id = getId(slug);
  const snapshot = await firestore.collection('listings').withConverter(listingConverter).doc(getId(slug)).get();
  return Promise.resolve(snapshot.data());
}

export default function getListing(slug) {
  return createResource(slug, getListingSnapshot(slug));
}
