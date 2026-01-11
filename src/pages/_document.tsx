import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;500;600;700&display=swap"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;500;600;700&display=swap"
          />
        </noscript>

        <style
          dangerouslySetInnerHTML={{
            __html: `
                </style>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;500;600;700&display=swap"
                    media="print"
                    onload="this.media = 'all';"
                  />
                <style>
              `,
          }}
        ></style>
      </Head>
      <body className='bg-bodyBg lg:h-screen lg:overflow-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
