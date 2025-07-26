import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={jakarta.variable}>
      <Component {...pageProps} />
    </div>
  );
}
