import Header from "@/components/header";
import { StoryProvider } from "@/providers/StoryContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <StoryProvider>
          <Header />
          <Component {...pageProps} />
                <Analytics />
        </StoryProvider>
      </SessionProvider>
    </>
  );
}
