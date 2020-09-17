import { firestore } from '../firebase';
import listingConverter from '../firebase/listingConverter';
import getId from '../utils/getId';
import {createResource} from './store';

async function getListingsSnapshot(limit = 6, after) {
  const id = getId(slug);
  const snapshot = await firestore.collection('listings').withConverter(listingConverter).where('listed','==',true).orderBy('created','desc').limit(limit).get();
  return await Promise.all(snapshot.docs().map(doc=>await Promise.resolve(doc.data())))
}
export default (limit, after)=>createResource([limit,after],()=>getListingsSnapshot(limit,after));