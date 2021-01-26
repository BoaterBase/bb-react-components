import normalizeMedia from './normalizeMedia';
//import normalizeContent from './normalizeContent';

export default function convertWebsite() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const response = {
        id: snapshot.id,
        source: data.source, // profile || listing || group
        sourceId: data.sourceId,
        created: data.created?.toDate(),
        updated: data.updated?.toDate(),
        theme: data.theme,
        menu: data.menu,
        footer: data.footer,
        header: data?.header,
        contact: data.contact,
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
