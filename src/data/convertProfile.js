import normalizeMedia from './normalizeMedia';
import normalizeContent from './normalizeContent';

export default function convertProfile() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      const response = {
        id: snapshot.id,
        business: data.business,
        handle: data.handle,
        name: data.name,
        summary: data.summary,
        content: normalizeContent(data.content),
        email: data.email,
        telephone: data.telephone,
        website: data.website,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
        avatar: data?.avatar?.info?.resource_type === 'image' && normalizeMedia(data.avatar),
        header: data?.header?.info?.resource_type === 'image' && normalizeMedia(data.header),
        locations: data.locations,
      };

      if (data.teamProfile?.id) {
        response.teamProfileId = data.teamProfile?.id;
      }

      return response;
    },
  };
}
