import { firestore, serverTimestamp } from '../firebase';
import getId from '../utils/getId';

export default async function createListingSubscriber(slug, data) {
  const ref = await firestore
    .collection('listings')
    .doc(getId(slug))
    .collection('subscribers')
    .add({ created: serverTimestamp(), ...data });
  // TODO - this should return the real document data?
  return {
    id: ref.id,
    ...data,
  };
}
