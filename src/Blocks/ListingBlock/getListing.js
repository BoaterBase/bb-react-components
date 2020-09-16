import { firestore } from '../../firebase';
import listingConverter from '../../firebase/listingConverter';
import getId from '../../utils/getId';
export default async function getListing(slug) {
  const id = getId(slug);
  const snapshot = await firestore.collection('listings').withConverter(listingConverter).doc(getId(slug)).get();
  return snapshot.data();
}
