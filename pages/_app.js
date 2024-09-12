import React, { useState, useEffect } from "react";
import "../styles/globals.scss"; // Import your global styles
import { Layout, Preloader } from "../components"; // Import your components
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  // Set a timer for the preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader after 2 seconds
    }, 2000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // Render the preloader while loading is true
  if (loading) {
    return <Preloader />;
  }

  // Render the main content after loading
  return (
    <Layout>
      <Head>
        <title>Noyl</title>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <text x="2" y="20" font-size="12" font-family="Arial" fill="black">NOYL</text>
</svg>
`}
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
