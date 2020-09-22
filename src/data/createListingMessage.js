import { firestore } from '../firebase';
import getId from '../utils/getId';

export default async function createListingMessage(slug, data) {
  const ref = await firestore.collection('listings').doc(getId(slug)).collection('messages').add(data);
  // TODO - this should return the real document data?
  return {
    id: ref.id,
    ...data,
  };
}
