import firebase from './firebase';
import slugify from 'slugify';
import { withAsyncData } from './utils';

const firestore = firebase.firestore();

function normalizeMedia({ description, info }) {
  return {
    type: info.resource_type,
    id: info.public_id,
    description: description,
    format: info.format,
    width: info.width,
    height: info.height,
    duration: info.duration,
  };
}

function normalizeContent(content) {
  return content.map((item) => {
    switch (item.kind) {
      case 'media':
        return {
          ...item,
          items: item.items?.filter(({ info }) => ['image', 'video'].includes(info.resource_type)).map(normalizeMedia),
        };
      default:
        return item;
    }
  });
}

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
export async function getCurrencyRates() {
  console.info('getCurrencyRates()');
  //await wait(5000);
  //console.info('fetchCurrencyRates()');
  return await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,CAD,AUD,SGD').then((r) => r.json());
}

export async function getGroup(id) {
  console.info('getGroup()', id);

  return {
    id: id,
    title: 'J/Net',
    summary: 'J/Boats for Sale from Authorized J/Dealers',
    random: Math.random(),
  };
}

export async function getListing(slug) {
  console.info('getListing()', slug);
  if (!slug) return false;
  //Extract id from a slug-id type string
  const id = slug.split('-').pop();

  const listingDoc = await firestore.collection('listings').doc(id).get();
  if (!listingDoc.exists) return undefined;

  // Extract and normalize data
  const data = listingDoc.data();
  const listing = {
    id: listingDoc.id,
    slug: `${slugify(data.title)}-${listingDoc.id}`,
    title: data.title,
    summary: data.summary,
    specifications: data.specifications,
    created: data.created?.toDate(),
    updated: data.updated?.toDate(),
    availability: data.availability,
    geo: data.geo &&
      (data.geo.latitude || data.geo.longitude) && {
        latitude: data.geo.latitude || 0,
        longitude: data.geo.longitude || 0,
      },
    content: normalizeContent(data.content),
    location: data.location,
    currency: data.currency,
    kind: data.kind,
    label: data.label,
    message: data.message,
    price: data.price,
    rate: data.rate,
    media: data.media?.filter(({ info }) => ['image', 'video'].includes(info.resource_type)).map(normalizeMedia),
  };

  if (data.profile?.id) {
    const profileDoc = await firestore.collection('profiles').doc(data.profile?.id).get();

    if (profileDoc.exists) {
      const profileData = profileDoc.data();

      listing.profile = {
        id: profileDoc.id,
        handle: profileData.handle,
        name: profileData.name,
        summary: profileData.summary,
        email: profileData.email,
        telephone: profileData.telephone,
        website: profileData.website,
        avatar: profileData?.avatar?.info?.resource_type === 'image' && normalizeMedia(profileData.avatar),
      };
    }
  }
  if (data.contact?.id) {
    const contactDoc = await firestore.collection('profiles').doc(data.contact?.id).get();

    if (contactDoc.exists) {
      const contactData = contactDoc.data();

      listing.contact = {
        id: contactDoc.id,
        handle: contactData.handle,
        name: contactData.name,
        summary: contactData.summary,
        email: contactData.email,
        telephone: contactData.telephone,
        website: contactData.website,
        avatar: contactData?.avatar?.info?.resource_type === 'image' && normalizeMedia(contactData.avatar),
      };
    }
  }

  return listing;
}

export async function getListingUpdates(slug) {
  const id = slug.split('-').pop();

  const updateDocs = await firestore.collection('listings').doc(id).collection('updates').get();

  return {
    listing: {
      id: id,
      slug: id,
    },
    items: updateDocs.docs
      .filter((doc) => doc.get('listed') && doc.get('content'))
      .map((update) => {
        const data = update.data();
        return {
          id: update.id,
          slug: `${slugify(data.title)}-${update.id}`,
          title: data.title,
          created: data.created?.toDate(),
          content: normalizeContent(data.content),
        };
      }),
  };
}

export async function getListingUpdate(listingSlug, updateSlug) {
  const listingId = listingSlug.split('-').pop();
  const updateId = updateSlug.split('-').pop();

  const updateDoc = await firestore.collection('listings').doc(listingId).collection('updates').doc(updateId).get();

  const data = updateDoc.data();
  return {
    id: updateDoc.id,
    title: data.title,
    created: data.created?.toDate(),
    content: normalizeContent(data.content),
  };
}

/*
Get a profile by its unique id
*/
export async function getProfile(id) {
  if (!id) return false;

  const profileDoc = await firestore.collection('profiles').doc(id).get();

  if (!profileDoc.exists) return undefined;

  const profileData = profileDoc.data();

  const profile = {
    id: profileDoc.id,
    handle: profileData.handle,
    name: profileData.name,
    summary: profileData.summary,
    email: profileData.email,
    telephone: profileData.telephone,
    website: profileData.website,
  };

  if (data.teamProfile?.id) {
    const teamDoc = await firestore.collection('profiles').doc(data.teamProfile.id).get();
    if (teamDoc.exists) {
      const teamData = teamDoc.data();

      profile.team = {
        id: teamDoc.id,
        handle: teamData.handle,
        name: teamData.name,
        summary: teamData.summary,
        email: teamData.email,
        telephone: teamData.telephone,
        website: teamData.website,
      };
    }
  }

  return profile;
}
/*
Find a profile by its username
*/
export async function findProfile(username) {
  return;
}
