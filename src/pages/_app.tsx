import Header from "@/components/header";
import { StoryProvider } from "@/providers/StoryContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoryProvider>
        <Header />
        <Component {...pageProps} />
      </StoryProvider>
    </>
  );
}
