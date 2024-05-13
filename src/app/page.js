'use client'
import { useEffect } from "react";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <h1>Hello</h1>
}
export default MyApp;