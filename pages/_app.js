import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // ✅ Import hook
import "../styles/globals.scss";
import { Layout, Preloader } from "../components";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Initialize inside component

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Optional: use router for conditionally triggering tracking
  useEffect(() => {
    if (router && router.pathname === "/") {
      fetch("/api/views/total", { method: "POST" });
    }
  }, [router]);

  if (loading) return <Preloader />;

  return (
    <Layout>
      <Head>
        <title>Noyl</title>
        {/* ... */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
