import { firestore, collection, collectionGroup, doc, getDoc } from './firebase';

import QueryBuilder from './QueryBuilder';
import slugify from 'slugify';
import normalizeContent from './normalizeContent';

const updateConverter = {
  async fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const update = {
      id: snapshot.id,
      ref: new UpdateReference(snapshot.id),
      slug: data.title ? `${slugify(data.title)}-${snapshot.id}` : snapshot.id,
      title: data.title,
      created: data.created?.toDate(),
      content: normalizeContent(data.content),
    };

    return update;
  },
};

class UpdateReference {
  constructor(slug, collection) {
    this.id = slug.split('-').pop();
    if (!this.id) throw new Error('You must provide a valid slug id.');
    this.collection = (collection || collectionGroup(firestore, 'updates')).withConverter(updateConverter);
  }
  async get(options) {
    const docSnapshot = await getDoc(doc(this.collection, this.id));
    return await docSnapshot.data(options);
  }
}
// TODO -this needs to be split as we dont have doc(id) support in group collections so make its own class maybe?
//      - ListingUpdatesCollection
class UpdatesCollection extends QueryBuilder {
  constructor(query) {
    if (query) {
      super(query.withConverter(updateConverter));
    } else {
      super(collectionGroup(firestore, 'updates').withConverter(updateConverter));
    }
  }
  doc(slug) {
    return new UpdateReference(slug, this.query);
  }
}

// TODO - use UpdatesGroupCollection without doc access
// export function allUpdates() {
//   return new UpdatesCollection();
// }

export function listingUpdates(slug) {
  const id = slug.split('-').pop();
  if (!id) throw new Error('You must provide a valid slug id.');

  return new UpdatesCollection(doc(collection(firestore, 'listings'), id).collection('updates'));
}
