import normalizeMedia from './normalizeMedia';

export default function normalizeContent(content) {
  return content?.map((item) => {
    switch (item.kind) {
      case 'media':
        return {
          ...item,
          items: item.items?.filter(({ info }) => ['image', 'video'].includes(info.resource_type)).map(normalizeMedia),
        };
      default:
        return item;
    }
  });
}
