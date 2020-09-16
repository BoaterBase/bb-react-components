import slugify from 'slugify';
import normalizeContent from './normalizeContent';

const updateConverter = {
  async fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const update = {
      id: snapshot.id,
      slug: data.title ? `${slugify(data.title)}-${snapshot.id}` : snapshot.id,
      title: data.title,
      created: data.created?.toDate(),
      content: normalizeContent(data.content),
    };

    return update;
  },
};
