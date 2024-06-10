import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { useRouter } from "next/router";
import "@/styles/global.css";
import "@/styles/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const disableHeader = ["/login", "/signup"];
  const showHeader = !disableHeader.includes(router.pathname);
  return (
    <>
      {showHeader && <Header />}
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
