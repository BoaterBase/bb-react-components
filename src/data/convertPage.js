import normalizeContent from './normalizeContent';

export default function convertPage() {
  return {
    async fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      const response = {
        id: snapshot.id,
        title: data.name,
        summary: data.summary,
        content: normalizeContent(data.content),
      };

      return response;
    },
  };
}
