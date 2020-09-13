export default function normalizeMedia({ description, info }) {
  return {
    type: info.resource_type,
    id: info.public_id,
    description: description,
    format: info.format,
    width: info.width,
    height: info.height,
    duration: info.duration,
    original: info.secure_url,
  };
}
