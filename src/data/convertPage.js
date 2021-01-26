import normalizeContent from './normalizeContent';
import normalizeMedia from './normalizeMedia';

export default function convertPage() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      const response = {
        id: snapshot.id,
        path: snapshot.path,
        title: data.title,
        summary: data.summary,
        content: normalizeContent(data.content),
        header: data?.header?.info?.resource_type && normalizeMedia(data.header),
      };

      return response;
    },
  };
}
