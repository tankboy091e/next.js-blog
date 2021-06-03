export default function getOrigin() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.ohjinsu.me:3000'
}
