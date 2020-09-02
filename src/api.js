import firebase from './firebase';

const firestore = firebase.firestore();

function normalizeContent(content) {
  return content.map((item) => {
    switch (item.kind) {
      case 'media':
        return {
          ...item,
          items: item.items
            ?.filter(({ info }) => ['image', 'video'].includes(info.resource_type))
            .map(({ description, info }) => ({
              type: info.resource_type,
              id: info.public_id,
              description: description,
              format: info.format,
              width: info.width,
              height: info.height,
              duration: info.duration,
            })),
        };
      default:
        return item;
    }
  });
}
export async function getGroup(id) {
  return {
    id: id,
    title: 'J/Net',
    summary: 'J/Boats for Sale from Authorized J/Dealers',
    random: Math.random(),
  };
}

export async function getListing(id) {
  const listingDoc = await firestore.collection('listings').doc(id).get();
  if (!listingDoc.exists) return undefined;

  // Extract and normalize data
  const data = listingDoc.data();
  return {
    id: listingDoc.id,
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
    media: data.media
      ?.filter(({ info }) => ['image', 'video'].includes(info.resource_type))
      .map(({ description, info }) => ({
        type: info.resource_type,
        id: info.public_id,
        description: description,
        format: info.format,
        width: info.width,
        height: info.height,
        duration: info.duration,
      })),
  };
}

export async function getListingUpdates(id) {
  const updateDocs = await firestore.collection('listings').doc(id).collection('updates').get();

  return {
    items: updateDocs.docs
      .filter((doc) => doc.get('listed') && doc.get('content'))
      .map((update) => {
        const data = update.data();
        return {
          id: update.id,
          title: data.title,
          created: data.created?.toDate(),
          content: normalizeContent(data.content),
        };
      }),
  };
}

export async function getListingUpdate(listingId, updateId) {
  const updateDoc = await firestore.collection('listings').doc(listingId).collection('updates').doc(updateId).get();

  const data = updateDoc.data();
  return {
    id: updateDoc.id,
    title: data.title,
    created: data.created?.toDate(),
    content: normalizeContent(data.content),
  };
}
