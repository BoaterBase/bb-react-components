import { firestore } from '../firebase';
import convertPage from './convertPage';
import { createResource } from './store';

async function getWebsitePageByPathSnapshot(websiteId, pagePath) {
  const snapshot = await firestore.collection('websites').doc(websiteId).collection('pages').withConverter(convertPage()).where('path', '==', pagePath).get();
  if (snapshot.size > 0) {
    return Promise.resolve(snapshot.docs[0].data());
  } else {
    return Promise.resolve(undefined);
  }
}

export default function getWebsitePageByPath(websiteId, pagePath) {
  return createResource(['website', 'pagePath', websiteId, pagePath], getWebsitePageByPathSnapshot(websiteId, pagePath));
}
