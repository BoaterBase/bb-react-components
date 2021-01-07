import { firestore } from '../firebase';
import convertPage from './convertPage';
import { createResource } from './store';

async function getWebsitePageSnapshot(websiteId, pageId) {
  const snapshot = await firestore.collection('websites').doc(websiteId).collection('pages').withConverter(convertPage()).doc(pageId).get();
  return Promise.resolve(snapshot.data());
}

export default function getWebsitePage(websiteId, pageId) {
  return createResource(['website', 'page', websiteId, pageId], getWebsitePageSnapshot(websiteId, pageId));
}
