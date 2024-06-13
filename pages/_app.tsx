import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header/Header';
import Container from '@/components/layout/Container/Container';
import { useRouter } from 'next/router';
import '@/styles/global.css';
import '@/styles/reset.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const disableHeader = ['/login', '/signup'];
  const showHeader = !disableHeader.includes(router.pathname);
  return (
    <>
      {showHeader && <Header />}
      <Container>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Container>
    </>
  );
}
