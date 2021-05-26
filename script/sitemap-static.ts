import fs from 'fs'
import prettier from 'prettier'

const date = new Date().toISOString()
const domain = 'https://www.ohjinsu.me'

const processFormat = (sitemap : string) : string => prettier.format(sitemap, { parser: 'html' })

const generatedSitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${domain}/contact</loc>
    <lastmod>${date}</lastmod>
  </url>
</urlset>`

const formattedSitemap = processFormat(generatedSitemap)

fs.writeFileSync('../public/sitemap/sitemap-common.xml', formattedSitemap, 'utf8')
