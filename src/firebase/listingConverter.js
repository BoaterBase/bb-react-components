import slugify from 'slugify';
import normalizeMedia from './normalizeMedia';
import normalizeContent from './normalizeContent';

const listingConverter = {
  async fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    const listing = {
      id: snapshot.id,
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

    if (false && data.profile?.id) {
      const profileDoc = await getDoc(doc(collection(firestore, 'profiles'), data.profile.id));

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
    if (false && data.contact?.id) {
      const contactDoc = await getDoc(doc(collection(firestore, 'profiles'), data.contact.id));
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

export default listingConverter;
