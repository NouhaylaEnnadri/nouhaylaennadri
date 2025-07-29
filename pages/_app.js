import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.scss";
import { Layout, Preloader } from "../components";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next"

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <>
      <Layout>
        <Head>
          <title>Noyl</title>
          <link
            rel="icon"
            href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="2" y="20" font-size="12" font-family="Arial" fill="black">NOYL</text></svg>`}
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
      <Analytics /> {/* ✅ Automatic tracking */}
    </>
  );
}

export default MyApp;
