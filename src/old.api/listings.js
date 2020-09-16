import firestore from './firebase';
import listingConverter from './listingConverter';
import getId from './getId';

async function getListing(slug) {
  return await firestore.collection('listings').withConverter(listingConverter).doc(getId(slug)).get();
}

function getListingUpdates(slug, { listed = true, startAfterSlug }) {
  return await firestore.collection('listings').doc(getId(slug)).collection('updates').where('listed','==',listed).orderBy('created','desc').get();
}

function getListingUpdate(listingSlug, updateSlug) {}

function createListingMessage(slug, data) {}
