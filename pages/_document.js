import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ca">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16x16.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
