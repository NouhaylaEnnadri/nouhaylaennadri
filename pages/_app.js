import React, { useState, useEffect } from "react";
import "../styles/globals.scss"; // Import your global styles
import { Layout, Preloader } from "../components"; // Import your components

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
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
