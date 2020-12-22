//import normalizeMedia from './normalizeMedia';
//import normalizeContent from './normalizeContent';

export default function convertDomain() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const response = {
        id: snapshot.id,
        websiteId: data.websiteId,
      };

      return response;
    },
  };
}
