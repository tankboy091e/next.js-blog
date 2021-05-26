const fs = require('fs')
const prettier = require('prettier')
const fetch = require('node-fetch')

const date = new Date().toISOString()
const domain = 'https://www.ohjinsu.me'

const processFormat = (sitemap) => prettier.format(sitemap, { parser: 'html' })

const categoryList = ['sum', 'essais', 'dev']

const getStaticMap = async () => {
  console.log('generating static map ...')
  return `
    <url>
      <loc>${domain}/contact</loc>
      <lastmod>${date}</lastmod>
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
  console.log(categories)
  return categories.map((posts, categoryIndex) => posts.map(
    (_, postIndex) => `
    <url>
      <loc>${`${domain}/${categoryList[categoryIndex]}/${postIndex}`}</loc>
      <lastmod>${date}</lastmod>
      <priority>0.8</priority>
    </url>
    `,
  ))
}

const getLibraryMap = async () => {
  console.log('generating library map ...')
  const res = await fetch(`${domain}/api/books`)
  const data = await res.json()
  return data.map(({ id }) => `
    <url>
      <loc>${`${domain}/quotes/${id}`}</loc>
      <lastmod>${date}</lastmod>
      <priority>0.8</priority>
    </url>
  `)
}

const execute = async () => {
  const staticMap = await getStaticMap()
  const categoryMap = await getCategoryMap()
  const libraryMap = await getLibraryMap()

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${staticMap}
    ${categoryMap}
    ${libraryMap}
  </urlset>`

  const formattedSitemap = processFormat(generatedSitemap)

  fs.writeFileSync(
    '../public/sitemap/sitemap-common.xml',
    formattedSitemap,
    'utf8',
  )
}

execute()
