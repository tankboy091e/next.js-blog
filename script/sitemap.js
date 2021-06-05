/* eslint-disable no-console */
const fs = require('fs')
const prettier = require('prettier')
const path = require('path')
const fetch = require('node-fetch')

const date = new Date().toISOString()
const domain = 'https://www.ohjinsu.me'

const processFormat = (sitemap) => prettier.format(sitemap, { parser: 'html' })

const categoryList = ['sum', 'essais', 'dev']

const getStaticMap = async () => {
  console.log('generating static map ...')
  return `
    <url>
      <loc>${domain}/sum</loc>
      <lastmod>${date}</lastmod>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${domain}/essais</loc>
      <lastmod>${date}</lastmod>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${domain}/library</loc>
      <lastmod>${date}</lastmod>
      <priority>0.3</priority>
    </url>
    <url>
      <loc>${domain}/dev</loc>
      <lastmod>${date}</lastmod>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>${domain}/contact</loc>
      <lastmod>${date}</lastmod>
      <priority>0.3</priority>
    </url>
  `
}

const getCategoryMap = async () => {
  console.log('generating category map ...')
  const promises = []
  // eslint-disable-next-line no-restricted-syntax
  for (const category of categoryList) {
    console.log(`fetching ${domain}/api/${category} ...`)
    promises.push(fetch(`${domain}/api/${category}`).then((res) => res.json()))
  }

  const categories = await Promise.all(promises)
  return categories.map((posts, categoryIndex) => posts.map(
    (value) => `
    <url>
      <loc>${`${domain}/${categoryList[categoryIndex]}/${value.doc}`}</loc>
      <lastmod>${date}</lastmod>
      <priority>0.8</priority>
    </url>`,
  ).join('')).join('')
}

// const getLibraryMap = async () => {
//   console.log('generating library map ...')
//   const res = await fetch(`${domain}/api/books`)
//   const data = await res.json()
//   return data.map(({ id }) => `
//     <url>
//       <loc>${`${domain}/quotes/${id}`}</loc>
//       <lastmod>${date}</lastmod>
//       <priority>0.8</priority>
//     </url>`).join('')
// }

const execute = async () => {
  const staticMap = await getStaticMap()
  const categoryMap = await getCategoryMap()

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticMap}
    ${categoryMap}
  </urlset>`

  const formattedSitemap = processFormat(generatedSitemap)

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    formattedSitemap,
    'utf8',
  )
  console.log('complete')
}

execute()
