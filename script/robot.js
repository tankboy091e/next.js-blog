const fs = require('fs')
const path = require('path')

const generatedSitemap = `
User-agent: *
Disallow: /admin/
`

fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), generatedSitemap, 'utf8')
