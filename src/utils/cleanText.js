export default function cleanText(text) {
  return text.replace(/[\n\r]+/g, ' ');
}
