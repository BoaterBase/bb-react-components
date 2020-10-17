import { firestore, serverTimestamp } from '../firebase';
import getId from '../utils/getId';

export default async function createProfileMessage(id, data) {
  const ref = await firestore
    .collection('profiles')
    .doc(getId(id))
    .collection('messages')
    .add({ created: serverTimestamp(), ...data });
  // TODO - this should return the real document data?
  return {
    id: ref.id,
    ...data,
  };
}
