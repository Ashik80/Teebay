export default function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate().toString();
  let month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
}
