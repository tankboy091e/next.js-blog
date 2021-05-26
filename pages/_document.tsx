import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="오진수의 블로그입니다" />
          <meta name="naver-site-verification" content="43995adbe05824d8b385033f26cb35ee2df4dc7a" />
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
