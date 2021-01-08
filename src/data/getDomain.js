import { firestore } from '../firebase';
import convertDomain from './convertDomain';
import { createResource } from './store';

async function getDomainSnapshot(id) {
  const snapshot = await firestore.collection('domains').withConverter(convertDomain()).doc(id).get();
  return Promise.resolve(snapshot.data());
}

export default function getDomain(id) {
  return createResource(['domain', id], getDomainSnapshot(id));
}
