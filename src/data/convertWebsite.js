//import normalizeMedia from './normalizeMedia';
//import normalizeContent from './normalizeContent';

export default function convertListing() {
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
        header: data.header,
      };

      return response;
    },
  };
}
