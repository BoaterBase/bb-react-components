import formatcoords from 'formatcoords';

export default function formatCoords(lat, lon) {
  return formatcoords(lat, lon).format();
}
