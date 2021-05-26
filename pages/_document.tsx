import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="오진수의 블로그입니다" />
          <meta name="naver-site-verification" content="4e98818e5c8c71fa168b9b1e97cc963fb411ad63" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
