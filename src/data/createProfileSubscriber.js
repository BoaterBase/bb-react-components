import { firestore, serverTimestamp } from '../firebase';
import getId from '../utils/getId';

export default async function createProfileSubscriber(slug, data) {
  const ref = await firestore
    .collection('profiles')
    .doc(getId(slug))
    .collection('subscribers')
    .add({ created: serverTimestamp(), ...data });
  // TODO - this should return the real document data?
  return {
    id: ref.id,
    ...data,
  };
}
