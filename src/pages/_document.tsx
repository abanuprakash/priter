import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-bodyBg lg:h-screen lg:overflow-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
