import normalizeMedia from './normalizeMedia';

export default function convertProfile() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const response = {
        id: snapshot.id,
        handle: data.handle,
        name: data.name,
        summary: data.summary,
        email: data.email,
        telephone: data.telephone,
        website: data.website,
        avatar: data?.avatar?.info?.resource_type === 'image' && normalizeMedia(data.avatar),
        header: data?.header?.info?.resource_type === 'image' && normalizeMedia(data.header),
      };

      return response;
    },
  };
}
