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
        media: data.media?.filter(({ info }) => ['image', 'video'].includes(info.resource_type)).map(normalizeMedia),
        aspect: data.aspect,
        head: data.head,
        raw: data.raw,
        layout: data.layout,
      };

      return response;
    },
  };
}
