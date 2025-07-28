import React, { useState, useEffect } from "react";
import "../styles/globals.scss"; // Global styles
import { Layout, Preloader } from "../components"; // Components
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  // ⏱ Preloader logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🌐 Track total website visit once
  useEffect(() => {
    fetch("/api/views/total", { method: "POST" });
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Layout>
      <Head>
        <title>Noyl</title>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <text x="2" y="20" font-size="12" font-family="Arial" fill="black">NOYL</text>
</svg>`}
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
