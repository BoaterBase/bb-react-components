export default function normalizeMedia({ description, link, label, info }) {
  return {
    type: info.resource_type,
    id: info.public_id,

    format: info.format,
    width: info.width,
    height: info.height,
    duration: info.duration,
    original: info.secure_url,

    description: description,
    link: link,
    label: label,
  };
}
