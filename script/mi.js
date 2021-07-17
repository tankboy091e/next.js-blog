/* eslint-disable no-restricted-syntax */
const fetch = require('node-fetch')

async function bootstrap() {
    const res = await fetch('http://localhost:3030/api/quotes')

    const data = await res.json()

    for await (const { isbn, page, annotation, paragraph } of data) {
        const ress = await fetch(`http://localhost:3001/library?isbn=${isbn}`)

        const datas = await ress.json()

        const payload = {
            library: datas.id,
            page,
            annotation,
            paragraph,
        }

        const dd = await fetch('http://localhost:3001/quote', {
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        console.log(dd.status)
    }
}

bootstrap()
