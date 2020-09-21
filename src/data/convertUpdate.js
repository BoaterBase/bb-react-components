import slugify from 'slugify';
import normalizeContent from './normalizeContent';

export default function convertUpdate() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      const response = {
        id: snapshot.id,
        slug: data.title ? `${slugify(data.title)}-${snapshot.id}` : snapshot.id,
        title: data.title,
        created: data.created?.toDate(),
        content: normalizeContent(data.content),
      };

      return response;
    },
  };
}
