import fs from 'fs'
import path from 'path'

const generatedSitemap = `
User-agent: *
Disallow: /admin/
Disallow: /sum/new/
Disallow: /essais/new/
Disallow: /dev/new/
`

fs.writeFileSync(path.join(__dirname, '/public/robots.txt'), generatedSitemap, 'utf8')
