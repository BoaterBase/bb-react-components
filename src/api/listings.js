import { getFirestore, collection, doc, getDoc, addDoc } from '@firebase/firestore';
import QueryBuilder from './QueryBuilder';

import firebase from './firebase';
import slugify from 'slugify';
import normalizeMedia from './normalizeMedia';
import normalizeContent from './normalizeContent';

const fs = getFirestore(firebase);

const listingConverter = {
  async fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    const listing = {
      id: snapshot.id,
      ref: new ListingReference(snapshot.id),
      slug: data.title ? `${slugify(data.title)}-${snapshot.id}` : snapshot.id,
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
      const profileDoc = await getDoc(doc(collection(fs, 'profiles'), data.profile.id));

      if (profileDoc.exists()) {
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
      const contactDoc = await getDoc(doc(collection(fs, 'profiles'), data.contact.id));
      if (contactDoc.exists()) {
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
  },
};

class ListingReference {
  constructor(slug) {
    this.id = slug.split('-').pop();
    if (!this.id) throw new Error('You must provide a valid slug id.');
  }
  async get(options) {
    const _collection = collection(fs, 'listings').withConverter(listingConverter);
    const _docSnapshot = await getDoc(doc(_collection, this.id));
    return await _docSnapshot.data(options);
  }

  updates() {
    return undefined;
  }

  messages() {
    return {
      create: async (data) => {
        // TODO - use converter and validation
        const col = collection(fs, 'listings').doc(this.id).collection('messages');
        // TODO - return our message reference
        return await addDoc(col, { ...data, created: new Date() });
      },
    };
  }
}
class ListingsCollection extends QueryBuilder {
  constructor(query) {
    if (query) {
      super(query.withConverter(listingConverter));
    } else {
      super(collection(fs, 'listings').withConverter(listingConverter));
    }
  }

  doc(slug) {
    return new ListingReference(slug);
  }
}
export function allListings() {
  return new ListingsCollection();
}
