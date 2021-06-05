import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="오진수의 블로그입니다" />
          <meta property="og:url" content="https://www.ohjinsu.me" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="오진수의 홈페이지" />
          <meta property="og:description" content="오진수의 홈페이지입니다" />
          <meta property="og:image" content="https://www.ohjinsu.me/favicon.ico" />
          <meta name="google-site-verification" content="yq8emumq3mHnxwPf_3yMh7a7epKH8qtQ7YraIytEHkE" />
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
