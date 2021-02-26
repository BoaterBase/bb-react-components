import normalizeMedia from './normalizeMedia';
//import normalizeContent from './normalizeContent';

export default function convertWebsite() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const response = {
        id: snapshot.id,
        // TODO -remove these
        source: data.source, // profile || listing || group
        sourceId: data.sourceId,
        // END
        profileId: data.profileId, // profile id for default listings & contact
        collectionId: data.collectionId, // sub collection for custom listings query
        created: data.created?.toDate(),
        updated: data.updated?.toDate(),
        head: data.head,
        menu: data.menu,
        footer: data.footer,
        header: data.header,
        info: data.info,
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        pinterest: data.pinterest,
        linkedin: data.linkedin,
        youtube: data.youtube,
        message: data.message,
        copyright: data.copyright,
        icon: data?.icon?.info?.resource_type === 'image' && normalizeMedia(data.icon),
        logo: data?.logo?.info?.resource_type === 'image' && normalizeMedia(data.logo),
      };

      if (data.homepage?.id) {
        response.homepageId = data.homepage?.id;
      }

      return response;
    },
  };
}
