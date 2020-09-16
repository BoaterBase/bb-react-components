/** Get an id from a `title-slug` string */
export default function getId(slug) {
  const id = slug.split('-').pop();
  if (!id) throw new Error(`You must provide a valid 'slug-id' - '${slug}' is invalid!`);
  return id;
}
