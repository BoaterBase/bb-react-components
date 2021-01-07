import normalizeContent from './normalizeContent';
import normalizeMedia from './normalizeMedia';

export default function convertPage() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      const response = {
        id: snapshot.id,
        title: data.name,
        summary: data.summary,
        content: normalizeContent(data.content),
        header: data?.header?.info?.resource_type === 'image' && normalizeMedia(data.header),
      };

      return response;
    },
  };
}
